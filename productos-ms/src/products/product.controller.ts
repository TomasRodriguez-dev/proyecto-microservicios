import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
    constructor(private readonly srv: ProductsService) {}

    @MessagePattern('health')
    health() { return { ok: true, service: 'productos-ms' }; }

    // CRUD simple (sin delete)
    @MessagePattern('products.create')
    create(@Payload() dto: { name: string; price: number; stock: number }) {
        return this.srv.create(dto);
    }

    @MessagePattern('products.findAll')
    findAll() {
        return this.srv.findAll();
    }

    @MessagePattern('products.findOne')
    findOne(@Payload() { id }: { id: number }) {
        return this.srv.findOne(id);
    }

    @MessagePattern('products.update')
    update(@Payload() { id, data }: { id: number; data: { name?: string; price?: number; stock?: number; isActive?: boolean } }) {
        return this.srv.update(id, data);
    }

    // Reservas
    @MessagePattern('products.reserve')
    reserve(@Payload() dto: { iduser: number; idproduct: number; quantity: number }) {
        return this.srv.reserve(dto);
    }

    @MessagePattern('products.release')
    release(@Payload() { idreservation }: { idreservation: number }) {
        return this.srv.release(idreservation);
    }

    @MessagePattern('products.confirm')
    confirm(@Payload() { idreservation }: { idreservation: number }) {
        return this.srv.confirm(idreservation);
    }
}
