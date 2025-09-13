import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    findByEmail(email: string) { return this.prisma.user.findUnique({ where: { email } }); }
    findById(id: number) { return this.prisma.user.findUnique({ where: { id } }); }
    create(data: { email: string; password: string; roles: string }) { return this.prisma.user.create({ data }); }
    update(id: number, data: any) { return this.prisma.user.update({ where: { id }, data }); }
    findMany(where: any) { return this.prisma.user.findMany({ where, orderBy: { createdAt: 'desc' } }); }
}
