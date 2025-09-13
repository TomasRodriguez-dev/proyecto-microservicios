import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Reservation } from './entities/reservation.entity';
import { AppDataSource } from 'src/typeorm.config';
import { RpcError } from 'src/common/rpc-exception.helper';

@Injectable()
export class ProductsService {
    private productRepo: Repository<Product>;
    private reservationRepo: Repository<Reservation>;
    private ttlHours = +(process.env.RESERVATION_TTL_HOURS ?? 72);

    constructor() {
        this.productRepo = AppDataSource.getRepository(Product);
        this.reservationRepo = AppDataSource.getRepository(Reservation);
    }

    // -------- CRUD (sin delete) --------
    async create(dto: { name: string; price: number; stock: number }) {
        const exists = await this.productRepo.findOne({ where: { name: dto.name } });
        if (exists) throw RpcError.badRequest('Nombre de producto ya existe');
        const p = this.productRepo.create(dto);
        return await this.productRepo.save(p);
    }

    async findAll() {
        return await this.productRepo.find({ where: { isActive: true } });
    }

    async findOne(id: number) {
        const p = await this.productRepo.findOne({ where: { id, isActive: true } });
        if (!p) throw RpcError.notFound('Producto no encontrado');
        return p;
    }

    async update(id: number, dto: Partial<Pick<Product, 'name' | 'price' | 'stock' | 'isActive'>>) {
        const p = await this.productRepo.findOne({ where: { id } });
        if (!p) throw RpcError.notFound('Producto no encontrado');
        Object.assign(p, dto);
        return await this.productRepo.save(p);
    }

    // -------- Reservas --------
    private async getAvailableStock(idproduct: number): Promise<number> {
        const product = await this.productRepo.findOne({ where: { id: idproduct, isActive: true } });
        if (!product) throw RpcError.notFound('Producto no encontrado');

        const now = new Date();
        const activeReservations = await this.reservationRepo
            .createQueryBuilder('r')
            .select('IFNULL(SUM(r.quantity),0)', 'sum')
            .where('r.idproduct = :pid', { pid: idproduct })
            .andWhere('r.confirmed = 0')
            .andWhere('r.expiresAt > :now', { now })
            .getRawOne<{ sum: string }>();

        const reserved = Number(activeReservations?.sum ?? 0);
        return product.stock - reserved;
    }


    async reserve(dto: { iduser: number; idproduct: number; quantity: number }) {
        if (dto.quantity <= 0) throw RpcError.badRequest('Cantidad inválida');
        const available = await this.getAvailableStock(dto.idproduct);
        if (available < dto.quantity) throw RpcError.badRequest('Stock insuficiente para reservar');

        const expiresAt = new Date(Date.now() + this.ttlHours * 60 * 60 * 1000);
        const r = this.reservationRepo.create({ ...dto, expiresAt, confirmed: false });
        const saved = await this.reservationRepo.save(r);
        return { idreservation: saved.id, expiresAt }; 
    }

    async release(idreservation: number) {
        const r = await this.reservationRepo.findOne({ where: { id: +idreservation } });
        if (!r) return { released: false };
        if (r.confirmed) throw RpcError.badRequest('La reserva ya fue confirmada');
        await this.reservationRepo.delete(r.id);
        return { released: true };
    }

    async confirm(idreservation: number) {
        const runner = AppDataSource.createQueryRunner();
        await runner.connect();
        await runner.startTransaction();
        try {
            const r = await runner.manager.findOne(Reservation, { where: { id: +idreservation } });
            if (!r) throw RpcError.notFound('Reserva no encontrada');
            if (r.confirmed) throw RpcError.badRequest('La reserva ya fue confirmada');
            if (r.expiresAt <= new Date()) throw RpcError.badRequest('La reserva está expirada');

            const p = await runner.manager.findOne(Product, { where: { id: r.idproduct, isActive: true } });
            if (!p) throw RpcError.notFound('Producto no encontrado');

            const available = await this.getAvailableStock(r.idproduct);
            if (available < r.quantity) throw RpcError.badRequest('Stock insuficiente al confirmar');

            p.stock = p.stock - r.quantity;
            await runner.manager.save(p);

            r.confirmed = true;
            await runner.manager.save(r);

            await runner.commitTransaction();
            return { confirmed: true };
        } catch (e) {
            await runner.rollbackTransaction();
            throw e;
        } finally {
            await runner.release();
        }
    }

    async releaseExpiredReservations(): Promise<number> {
        const now = new Date();
        const result = await this.reservationRepo
            .createQueryBuilder()
            .delete()
            .from(Reservation)
            .where('confirmed = 0')
            .andWhere('expiresAt <= :now', { now })
            .execute();

        return result.affected ?? 0;
    }
}
