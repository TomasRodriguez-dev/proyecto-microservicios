import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RpcError } from 'src/common/rpc-exception.helper';
import { toPublicUser } from 'src/common/mapper/user.mapper';

@Injectable()
export class UsersService {
    constructor(private repo: UsersRepository) {}

    async validate(email: string, password: string) {
        const user = await this.repo.findByEmail(email);
        if (!user || !user.isActive) throw RpcError.unauthorized('Credenciales inválidas');
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw RpcError.unauthorized('Credenciales inválidas');
        return toPublicUser(user);
    }

    async findById(id: number) {
        const u = await this.repo.findById(id);
        if (!u || !u.isActive) throw RpcError.notFound('Usuario no encontrado o inactivo');
        return toPublicUser(u);
    }

    async create(email: string, password: string, roles = 'USER') {
        const exists = await this.repo.findByEmail(email);
        if (exists) throw RpcError.badRequest('Email ya registrado');
        const hash = await bcrypt.hash(password, 10);
        return toPublicUser(await this.repo.create({ email, password: hash, roles }));
    }

    async findMany(params?: { q?: string }) {
        const where = {
            isActive: true,
            ...(params?.q ? { email: { contains: params.q, mode: 'insensitive' as const } } : {}),
        };
        return (await this.repo.findMany(where)).map(toPublicUser);
    }

    async update(id: number, dto: { email?: string; password?: string; roles?: string; isActive?: boolean }, isAdmin: boolean) {
        if (!isAdmin && (dto.roles !== undefined || dto.isActive !== undefined)) {
            throw RpcError.forbidden('Solo ADMIN puede modificar roles o isActive');
        }
        const data: any = {};
        if (dto.email) data.email = dto.email;
        if (dto.password) data.password = await bcrypt.hash(dto.password, 10);
        if (isAdmin && dto.roles !== undefined) data.roles = dto.roles;
        if (isAdmin && dto.isActive !== undefined) data.isActive = dto.isActive;

        try {
            return toPublicUser(await this.repo.update(id, data));
        } catch {
            throw RpcError.badRequest('No se pudo actualizar el usuario');
        }
    }
}
