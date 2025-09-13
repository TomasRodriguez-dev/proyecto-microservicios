import 'dotenv/config';        
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { Reservation } from './products/entities/reservation.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT ?? 3306),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    entities: [Product, Reservation],
    synchronize: true,              
    logging: false,
});
