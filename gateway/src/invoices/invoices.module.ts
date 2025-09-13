import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoicesController } from './invoices.controller';
import { InvoicesEnricher } from './invoices.enricher';

@Module({
    imports: [
        ClientsModule.register([
            { name: 'USUARIOS_CLIENT', transport: Transport.TCP, options: { host: process.env.USUARIOS_HOST || 'localhost', port: +(process.env.USUARIOS_PORT || 3001) } },
            { name: 'FACTURAS_CLIENT', transport: Transport.TCP, options: { host: process.env.FACTURAS_HOST || 'localhost', port: +(process.env.FACTURAS_PORT || 3003) } },
        ]),
    ],
    controllers: [InvoicesController],
    providers: [InvoicesEnricher],
})
export class InvoicesModule {}
