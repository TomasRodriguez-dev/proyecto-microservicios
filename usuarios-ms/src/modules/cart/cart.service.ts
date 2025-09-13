import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { ProductsStockClient } from '../integrations/products-stock.client';
import { RpcError } from 'src/common/rpc-exception.helper';

@Injectable()
export class CartService {
    constructor(private repo: CartRepository, private products: ProductsStockClient) {}

    private async getOrCreateCart(iduser: number) {
        return (await this.repo.findCartByUser(iduser)) ?? (await this.repo.createCart(iduser));
    }

    async add(dto: { iduser: number; idproduct: number; quantity: number }) {
        if (dto.quantity <= 0) throw RpcError.badRequest('Cantidad inválida');
        const { idreservation } = await this.products.reserve(dto);
        const cart = await this.getOrCreateCart(dto.iduser);
        try {
            const item = await this.repo.createItem({ idcart: cart.id, idproduct: dto.idproduct, quantity: dto.quantity, idreservation });
            await this.repo.touchCart(cart.id);
            return { idcart: cart.id, iditem: item.id, idreservation: item.idreservation };
        } catch (e) {
            await this.products.release(idreservation);
            throw e;
        }
    }

    async get(iduser: number) {
        const cart = await this.getOrCreateCart(iduser);
        const items = await this.repo.findItems(cart.id);
        return { id: cart.id, iduser, items };
    }

    async updateItem(dto: { iduser: number; iditem: number; quantity: number }) {
        if (dto.quantity <= 0) throw RpcError.badRequest('Cantidad inválida');
        const item = await this.repo.findItem(dto.iditem);
        if (!item) throw RpcError.notFound('Item no encontrado');
        const cart = await this.repo.getCart(item.idcart);
        if (!cart || cart.iduser !== dto.iduser) throw RpcError.forbidden('No autorizado');

        await this.products.release(item.idreservation); 
        const { idreservation } = await this.products.reserve({ iduser: dto.iduser, idproduct: item.idproduct, quantity: dto.quantity });

        try {
            const updated = await this.repo.updateItem(item.id, { quantity: dto.quantity, idreservation });
            await this.repo.touchCart(cart.id);
            return updated;
        } catch (e) {
            await this.products.release(idreservation);
            throw e;
        }
    }

    async removeItem(dto: { iduser: number; iditem: number }) {
        const item = await this.repo.findItem(dto.iditem);
        if (!item) return { removed: false };
        const cart = await this.repo.getCart(item.idcart);
        if (!cart || cart.iduser !== dto.iduser) throw RpcError.forbidden('No autorizado');

        await this.products.release(item.idreservation);
        await this.repo.deleteItem(item.id);
        await this.repo.touchCart(cart.id);
        return { removed: true };
    }

    async clear(iduser: number) {
        const cart = await this.getOrCreateCart(iduser);
        const items = await this.repo.findItems(cart.id);
        await Promise.all(items.map(i => this.products.release(i.idreservation)));
        await this.repo.clearCart(cart.id);
        await this.repo.touchCart(cart.id);
        return { cleared: true };
    }
}