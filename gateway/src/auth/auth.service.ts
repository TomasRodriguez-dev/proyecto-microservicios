import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { handleRpcError } from '../common/rpc-error.util';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USUARIOS_CLIENT') private readonly usersClient: ClientProxy,
        private readonly jwt: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await firstValueFrom(
                this.usersClient.send('users.validate', { email, password }),
            );
            if (!user) throw new handleRpcError('Credenciales inválidas');
            return user;
        } catch (err) {
            handleRpcError(err, 'Error al validar credenciales');
            throw err;
        }
    }

    async login(user: any): Promise<{ access_token: string; refresh_token: string; user: any }> {
        const payload = { sub: user.id, roles: user.roles };

        const access_token = this.jwt.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES || '30m',
        });

        const refresh_token = this.jwt.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
        });

        return { access_token, refresh_token, user };
    }

    async register(dto: { email: string; password: string }): Promise<{ access_token: string; refresh_token: string; user: any }> {
        try {
            const user = await firstValueFrom(
                this.usersClient.send('users.create', { ...dto, roles: 'USER' }),
            );
            const payload = { sub: user.id, roles: user.roles };

            const access_token = this.jwt.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES || '30m',
            });

            const refresh_token = this.jwt.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
            });

            return { access_token, refresh_token, user };
        } catch (err) {
            handleRpcError(err, 'Error al registrar usuario');
            throw err; 
        }
    }

    async getUserById(id: number): Promise<any> {
        try {
            return await firstValueFrom(this.usersClient.send('users.findById', { id }));
        } catch (err) {
            handleRpcError(err, 'Usuario no encontrado');
            throw err; 
        }
    }

    async refresh(refreshToken: string): Promise<{ access_token: string }> {
        try {
            const payload = this.jwt.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const newAccessToken = this.jwt.sign(
                { sub: payload.sub, roles: payload.roles },
                { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES || '30m' },
            );

            return { access_token: newAccessToken };
        } catch (err) {
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }
    }
}
