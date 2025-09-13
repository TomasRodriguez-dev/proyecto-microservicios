import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';

@Module({
    imports: [
        ClientsModule.register([
            { name: 'USUARIOS_CLIENT', transport: Transport.TCP, options: { host: process.env.USUARIOS_HOST || 'localhost', port: +(process.env.USUARIOS_PORT || 3001) } },
            { name: 'PRODUCTS_CLIENT', transport: Transport.TCP, options: { host: process.env.PRODUCTS_HOST || 'localhost', port: +(process.env.PRODUCTS_PORT || 3002) } },
            { name: 'FACTURAS_CLIENT', transport: Transport.TCP, options: { host: process.env.FACTURAS_HOST || 'localhost', port: +(process.env.FACTURAS_PORT || 3003) } },
        ]),
    ],
    providers: [CheckoutService],
    controllers: [CheckoutController],
})
export class CheckoutModule {}
