import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'PRODUCTS_CLIENT',
            transport: Transport.TCP,
            options: { host: process.env.PRODUCTS_HOST || 'localhost', port: +(process.env.PRODUCTS_PORT || 3002) },
        }]),
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
