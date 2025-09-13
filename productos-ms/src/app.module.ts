import { Module } from '@nestjs/common';
import { ProductsController } from './products/product.controller';
import { ProductsService } from './products/products.service';
import { CleanupCron } from './cron/cleanup.cron';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CleanupCron],
})
export class AppModule {}
