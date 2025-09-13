import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        ClientsModule.register([{
        name: 'USUARIOS_CLIENT',
            transport: Transport.TCP,
            options: { host: process.env.USUARIOS_HOST, port: +(process.env.USUARIOS_PORT ?? 3001) },
        }]),
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
