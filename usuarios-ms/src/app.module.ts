import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

// auth
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';

// users
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersRepository } from './modules/users/users.repository';

// cart
import { CartController } from './modules/cart/cart.controller';
import { CartService } from './modules/cart/cart.service';
import { CartRepository } from './modules/cart/cart.repository';

// integrations
import { ProductsStockClient } from './modules/integrations/products-stock.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_CLIENT',
        transport: Transport.TCP, 
        options: { host: process.env.PRODUCTS_HOST, port: Number(process.env.PRODUCTS_PORT) },
      },
    ]),
  ],
  controllers: [AuthController, UsersController, CartController],
  providers: [
    PrismaService,
    UsersService, UsersRepository,
    CartService, CartRepository,
    ProductsStockClient,
    AuthService,
  ],
})
export class AppModule {}
