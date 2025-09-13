import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcError } from 'src/common/rpc-exception.helper';

@Injectable()
export class FacturasService {
    private prisma = new PrismaClient();

    async create(dto: { iduser: number; items: { idproduct: number; name: string; price: number; quantity: number }[] }) {
        if (!dto.items?.length) throw RpcError.badRequest('Factura sin items');

        const items = dto.items.map(i => ({
            idproduct: i.idproduct,
            name: i.name,
            price: i.price as any,           // Prisma Decimal
            quantity: i.quantity,
            subtotal: (i.price * i.quantity) as any,
        }));
        const total = items.reduce((acc, it) => acc + Number(it.subtotal), 0) as any;

        const f = await this.prisma.factura.create({
            data: { iduser: dto.iduser, items, total },
        });
        return f;
    }

    async findAll() {
        return this.prisma.factura.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async findByUser(iduser: number) {
        return this.prisma.factura.findMany({ where: { iduser }, orderBy: { createdAt: 'desc' } });
    }

    async findOne(id: string) {
        const f = await this.prisma.factura.findUnique({ where: { id } });
        if (!f) throw RpcError.notFound('Factura no encontrada');
        return f;
    }
}
