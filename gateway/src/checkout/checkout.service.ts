import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { handleRpcError } from '../common/rpc-error.util';

@Injectable()
export class CheckoutService {
    constructor(
        @Inject('USUARIOS_CLIENT') private readonly usersClient: ClientProxy,
        @Inject('PRODUCTS_CLIENT') private readonly productsClient: ClientProxy,
        @Inject('FACTURAS_CLIENT') private readonly invoicesClient: ClientProxy,
    ) {}

    async checkout(iduser: number) {
        try {
            const cart = await firstValueFrom(
                this.usersClient.send('cart.get', { iduser })
            );

            if (!cart.items?.length) {
                throw { error: { statusCode: 400, message: 'Carrito vacío' } };
            }

            for (const it of cart.items) {
                await firstValueFrom(
                    this.productsClient.send('products.confirm', {
                        idreservation: it.idreservation,
                    }),
                );
            }

            const items: {
                idproduct: number;
                name: string;
                price: number;
                quantity: number;
            }[] = [];

            for (const it of cart.items) {
                const p = await firstValueFrom(
                    this.productsClient.send('products.findOne', { id: it.idproduct }),
                );

                items.push({
                    idproduct: p.id,
                    name: p.name,
                    price: +p.price,
                    quantity: it.quantity,
                });
            }

            const factura = await firstValueFrom(
                this.invoicesClient.send('facturas.create', { iduser, items }),
            );

            await firstValueFrom(this.usersClient.send('cart.clear', { iduser })).catch(
                () => null,
            );
            return factura;
        } catch (err) {
            handleRpcError(err, 'Error en checkout');
            throw err;
        }
    }

    async listInvoicesAdmin() {
        try {
            return await firstValueFrom(this.invoicesClient.send('facturas.findAll', {}));
        } catch (err) {
            handleRpcError(err, 'Error al listar facturas');
            throw err;
        }
    }

    async listInvoicesMine(iduser: number) {
        try {
            return await firstValueFrom(
                this.invoicesClient.send('facturas.findByUser', { iduser }),
            );
        } catch (err) {
            handleRpcError(err, 'Error al listar mis facturas');
            throw err;
        }
    }
}