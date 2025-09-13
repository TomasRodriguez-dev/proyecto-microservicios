import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { handleRpcError } from '../common/rpc-error.util';

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCTS_CLIENT') private client: ClientProxy) {}

    async create(dto: { name: string; price: number; stock: number }) {
        try { return await firstValueFrom(this.client.send('products.create', dto)); }
        catch (err) { handleRpcError(err, 'Error al crear producto'); throw err; }
    }

    async findAll() {
        try { return await firstValueFrom(this.client.send('products.findAll', {})); }
        catch (err) { handleRpcError(err, 'Error al listar productos'); throw err; }
    }

    async findOne(id: number) {
        try { return await firstValueFrom(this.client.send('products.findOne', { id })); }
        catch (err) { handleRpcError(err, 'Producto no encontrado'); throw err; }
    }

    async update(id: number, data: any) {
        try { return await firstValueFrom(this.client.send('products.update', { id, data })); }
        catch (err) { handleRpcError(err, 'Error al actualizar producto'); throw err; }
    }
}
