import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'USUARIOS_CLIENT',
            transport: Transport.TCP,
            options: { host: process.env.USUARIOS_HOST || 'localhost', port: +(process.env.USUARIOS_PORT || 3001) },
        }]),
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
