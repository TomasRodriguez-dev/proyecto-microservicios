import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FacturasService } from './facturas.service';

@Controller()
export class FacturasController {
    constructor(private readonly srv: FacturasService) {}

    @MessagePattern('health')
    health() { return { ok: true, service: 'facturas-ms' }; }

    @MessagePattern('facturas.create')
    create(@Payload() dto: { iduser: number; items: any[] }) { return this.srv.create(dto); }

    @MessagePattern('facturas.findAll')
    all() { return this.srv.findAll(); }

    @MessagePattern('facturas.findByUser')
    byUser(@Payload() { iduser }: { iduser: number }) { return this.srv.findByUser(iduser); }

    @MessagePattern('facturas.findOne')
    one(@Payload() { id }: { id: string }) { return this.srv.findOne(id); }
}
