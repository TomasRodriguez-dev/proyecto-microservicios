import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartRepository {
    constructor(private prisma: PrismaService) {}

    findCartByUser(iduser: number) {
        return this.prisma.cart.findFirst({ where: { iduser } });
    }
    createCart(iduser: number) {
        return this.prisma.cart.create({ data: { iduser } });
    }
    touchCart(idcart: number) {
        return this.prisma.cart.update({ where: { id: idcart }, data: { updatedAt: new Date() } });
    }
    findItems(idcart: number) {
        return this.prisma.cartItem.findMany({ where: { idcart } });
    }
    findItem(iditem: number) {
        return this.prisma.cartItem.findUnique({ where: { id: iditem } });
    }
    getCart(id: number) {
        return this.prisma.cart.findUnique({ where: { id } });
    }

    createItem(data: { idcart: number; idproduct: number; quantity: number; idreservation: number }) {
        return this.prisma.cartItem.create({ data });
    }

    updateItem(id: number, data: Partial<{ quantity: number; idreservation: number }>) {
        return this.prisma.cartItem.update({ where: { id }, data });
    }

    deleteItem(id: number) {
        return this.prisma.cartItem.delete({ where: { id } });
    }
    clearCart(idcart: number) {
        return this.prisma.cartItem.deleteMany({ where: { idcart } });
    }
}
