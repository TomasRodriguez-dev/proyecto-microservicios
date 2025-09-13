import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { handleRpcError } from '../common/rpc-error.util';

@Injectable()
export class CartService {
    constructor(@Inject('USUARIOS_CLIENT') private readonly usersClient: ClientProxy) {}

    async add(userId: number, productId: number, quantity: number) {
        try {
            return await firstValueFrom(
                this.usersClient.send('cart.add', { iduser: userId, idproduct: productId, quantity })
            );
        } catch (err) { handleRpcError(err, 'No se pudo agregar al carrito'); throw err; }
    }

    async get(userId: number) {
        try {
            return await firstValueFrom(this.usersClient.send('cart.get', { iduser: userId }));
        } catch (err) { handleRpcError(err, 'No se pudo obtener el carrito'); throw err; }
    }

    async updateItem(userId: number, itemId: number, quantity: number) {
        try {
            return await firstValueFrom(
                this.usersClient.send('cart.updateItem', { iduser: userId, iditem: itemId, quantity })
            );
        } catch (err) { handleRpcError(err, 'No se pudo actualizar el item'); throw err; }
    }

    async removeItem(userId: number, itemId: number) {
        try {
            return await firstValueFrom(
                this.usersClient.send('cart.removeItem', { iduser: userId, iditem: itemId })
            );
        } catch (err) { handleRpcError(err, 'No se pudo eliminar el item'); throw err; }
    }

    async clear(userId: number) {
        try {
            return await firstValueFrom(this.usersClient.send('cart.clear', { iduser: userId }));
        } catch (err) { handleRpcError(err, 'No se pudo vaciar el carrito'); throw err; }
    }
}
