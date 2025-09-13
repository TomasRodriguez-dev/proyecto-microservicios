// usuarios-ms/src/cleanup.cron.ts
import * as cron from 'node-cron';
import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CleanupCron implements OnModuleInit {
  private readonly logger = new Logger(CleanupCron.name);
  private readonly ttlDays = +(process.env.CART_TTL_DAYS ?? 3);
  private readonly batchSize = 200; // evita cargar todo en memoria

  constructor(
    private readonly prisma: PrismaService,
    @Inject('PRODUCTS_CLIENT') private readonly productsClient: ClientProxy,
  ) {}

  onModuleInit() {
    // 02:10 todos los días (productos-ms corre a las 02:00)
    cron.schedule('10 2 * * *', async () => {
      this.logger.log(`Iniciando limpieza de carritos (> ${this.ttlDays} días)`);
      const threshold = new Date(Date.now() - this.ttlDays * 24 * 60 * 60 * 1000);

      let lastId = 0;
      let totalCarritos = 0;
      let totalItems = 0;

      // paginate por id para no bloquear
      while (true) {
        const carts = await this.prisma.cart.findMany({
          where: { updatedAt: { lt: threshold }, id: { gt: lastId } },
          orderBy: { id: 'asc' },
          take: this.batchSize,
        });
        if (carts.length === 0) break;

        for (const cart of carts) {
          const items = await this.prisma.cartItem.findMany({ where: { idcart: cart.id } });

          // liberar reservas (si ya no existen, no pasa nada)
          await Promise.all(
            items.map(i =>
              firstValueFrom(
                this.productsClient.send('products.release', { idreservation: i.idreservation })
              ).catch(() => null)
            )
          );

          // borrar items
          const delRes = await this.prisma.cartItem.deleteMany({ where: { idcart: cart.id } });
          totalItems += delRes.count;
          totalCarritos += 1;
          lastId = cart.id;
        }
      }

      this.logger.log(`Limpieza finalizada: ${totalCarritos} carritos vaciados, ${totalItems} items removidos`);
    });
  }
}
