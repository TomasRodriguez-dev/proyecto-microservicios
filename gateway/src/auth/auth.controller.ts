import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { UserResponse } from '../users/entities/user.response';
import { wrapOk } from '../common/envelope';
import { JwtAuthGuard, LocalAuthGuard } from './guard/guards';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@ApiExtraModels(UserResponse)
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @ApiOperation({ summary: 'Login con credenciales' })
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({
        description: 'Login correcto',
        schema: {
            type: 'object',
            properties: {
                error: { nullable: true },
                result: {
                    type: 'object',
                    properties: {
                        user: { $ref: getSchemaPath(UserResponse) },
                        refresh_token: { type: 'string', example: 'eyJhbGciOi...' }
                    }
                },
                mensaje: { type: 'string', example: 'Login OK' },
                success: { type: 'boolean', example: true },
                token: { type: 'string', example: 'eyJhbGciOi...' }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Credenciales inválidas' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() _dto: LoginDto, @Req() req: any) {
        const { access_token, refresh_token, user } = await this.auth.login(req.user);
        return wrapOk(
            { user, refresh_token },
            'Inicio Sesión con éxito',
            access_token
        );
    }

    @ApiOperation({ summary: 'Registro público (rol USER por defecto)' })
    @ApiBody({ type: RegisterDto })
    @ApiCreatedResponse({
        description: 'Usuario registrado',
        schema: {
            type: 'object',
            properties: {
                error: { nullable: true },
                result: {
                    type: 'object',
                    properties: {
                        user: { $ref: getSchemaPath(UserResponse) },
                        refresh_token: { type: 'string', example: 'eyJhbGciOi...' }
                    }
                },
                mensaje: { type: 'string', example: 'Registro OK' },
                success: { type: 'boolean', example: true },
                token: { type: 'string', example: 'eyJhbGciOi...' }
            }
        }
    })
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const { access_token, refresh_token, user } = await this.auth.register({
            email: dto.email,
            password: dto.password
        });
        return wrapOk(
            { user, refresh_token },
            'Cuenta registrada con éxito',
            access_token
        );
    }

    @ApiOperation({ summary: 'Perfil Usuario (refresca token)' })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Usuario actual con token renovado',
        schema: {
            type: 'object',
            properties: {
                error: { nullable: true },
                result: { $ref: getSchemaPath(UserResponse) },
                mensaje: { type: 'string', example: 'Perfil obtenido con éxito' },
                success: { type: 'boolean', example: true },
                token: { type: 'string', example: 'eyJhbGciOi...' }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    async perfil(@Req() req: any) {
        const user = req.user;
        const payload = { sub: user.id, roles: user.roles };
        const newToken = this.auth['jwt'].sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES || '30m'
        });
        return wrapOk(user, 'Perfil obtenido con éxito', newToken);
    }

    @ApiOperation({ summary: 'Refrescar token de acceso' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                refresh_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' }
            }
        }
    })
    @ApiOkResponse({
        description: 'Nuevo access token generado',
        schema: {
            type: 'object',
            properties: {
                error: { nullable: true },
                result: { type: 'string', example: 'Nuevo token' },
                mensaje: { type: 'string', example: 'Token refrescado con éxito' },
                success: { type: 'boolean', example: true },
                token: { type: 'string', example: 'eyJhbGciOi...' }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Refresh token inválido o expirado' })
    @Post('refresh')
    async refresh(@Body('refresh_token') refreshToken: string) {
        const { access_token } = await this.auth.refresh(refreshToken);
        return wrapOk(access_token, 'Token refrescado con éxito', access_token);
    }
}
