import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class Reservation {
    @PrimaryGeneratedColumn() id: number;

    @Index() @Column() iduser: number;
    @Index() @Column() idproduct: number;

    @Column({ type: 'int' }) quantity: number;

    @Index() @Column({ type: 'datetime' }) expiresAt: Date;

    @Index() @Column({ default: false }) confirmed: boolean;
}
