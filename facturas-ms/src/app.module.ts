import { Module } from '@nestjs/common';
import { FacturasController } from './facturas/facturas.controller';
import { FacturasService } from './facturas/facturas.service';

@Module({
  imports: [],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class AppModule {}
