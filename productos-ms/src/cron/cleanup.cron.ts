import * as cron from 'node-cron';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CleanupCron implements OnModuleInit {
    private readonly logger = new Logger(CleanupCron.name);
    constructor(private readonly srv: ProductsService) {}

    onModuleInit() {
        // corre a las 02:00 todos los días
        cron.schedule('0 2 * * *', async () => {
            const removed = await this.srv.releaseExpiredReservations();
            if (removed > 0) this.logger.log(`Liberadas ${removed} reservas expiradas`);
        });
    }
}
