import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RpcError } from 'src/common/rpc-exception.helper';

type ReserveInput = { iduser: number; idproduct: number; quantity: number };
type ReserveResp  = { idreservation: number };

@Injectable()
export class ProductsStockClient {
    constructor(@Inject('PRODUCTS_CLIENT') private readonly client: ClientProxy) {}

    async reserve(input: ReserveInput): Promise<ReserveResp> {
        try {
            const resp = await firstValueFrom(this.client.send<ReserveResp>('products.reserve', input));
            return { idreservation: Number((resp as any).idreservation) };
        } catch {
            throw RpcError.badRequest('No se pudo reservar stock');
        }
    }

    async release(idreservation: number): Promise<void> {
        try {
            await firstValueFrom(this.client.send('products.release', { idreservation }));
        } catch {
            // tolerante a fallos
        }
    }
}
