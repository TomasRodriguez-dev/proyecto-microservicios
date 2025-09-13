import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller()
export class CartController {
    constructor(private readonly cart: CartService) {}

    @MessagePattern('cart.add')        add(@Payload() dto: { iduser: number; idproduct: number; quantity: number }) { return this.cart.add(dto); }
    @MessagePattern('cart.get')        get(@Payload() { iduser }: { iduser: number }) { return this.cart.get(iduser); }
    @MessagePattern('cart.updateItem') updateItem(@Payload() dto: { iduser: number; iditem: number; quantity: number }) { return this.cart.updateItem(dto); }
    @MessagePattern('cart.removeItem') removeItem(@Payload() dto: { iduser: number; iditem: number }) { return this.cart.removeItem(dto); }
    @MessagePattern('cart.clear')      clear(@Payload() { iduser }: { iduser: number }) { return this.cart.clear(iduser); }
}