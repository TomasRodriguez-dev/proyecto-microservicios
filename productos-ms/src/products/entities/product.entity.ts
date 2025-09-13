import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn() id: number;

    @Index({ unique: true })
    @Column({ length: 120 }) name: string;

    @Column('decimal', { precision: 12, scale: 2 }) price: number;

    @Column({ type: 'int', default: 0 }) stock: number;

    @Column({ default: true }) isActive: boolean;
}
