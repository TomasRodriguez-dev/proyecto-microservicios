import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { handleRpcError } from '../common/rpc-error.util';

@Injectable()
export class UsersService {
    constructor(@Inject('USUARIOS_CLIENT') private client: ClientProxy) {}

    async create(dto: { email: string; password: string; roles?: string }) {
        try {
            return await firstValueFrom(this.client.send('users.create', dto));
        } catch (err) {
            handleRpcError(err, 'Error al crear usuario');
        }
    }

    async findMany(query: any = {}) {
        try {
            return await firstValueFrom(this.client.send('users.findMany', query));
        } catch (err) {
            handleRpcError(err, 'Error al listar usuarios');
        }
    }

    async findById(id: number) {
        try {
            return await firstValueFrom(this.client.send('users.findById', { id }));
        } catch (err) {
            handleRpcError(err, 'Usuario no encontrado');
        }
    }

    async update(id: number, data: any, isAdmin: boolean) {
        try {
            return await firstValueFrom(this.client.send('users.update', { id, data, isAdmin }));
        } catch (err) {
            handleRpcError(err, 'Error al actualizar usuario');
        }
    }
}
