import { Controller, Get, Req, UseGuards, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guard/guards';
import { wrapOk } from '../common/envelope';
import { InvoicesEnricher } from './invoices.enricher';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@ApiTags('Facturas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
    constructor(
        private readonly enricher: InvoicesEnricher,
        @Inject('FACTURAS_CLIENT') private readonly invoicesClient: ClientProxy,
    ) {}

    @ApiOperation({ summary: 'Listado de facturas (ADMIN, enriquecido con usuario)' })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @ApiOkResponse({ description: 'Listado de facturas' })
    @Get()
    async listAll() {
        const list = await firstValueFrom(this.invoicesClient.send('facturas.findAll', {}));
        const enriched = await this.enricher.enrichWithUsers(list);
        return wrapOk(enriched, 'OK');
    }

    @ApiOperation({ summary: 'Mis facturas' })
    @ApiOkResponse({ description: 'Listado de facturas del usuario' })
    @Get('mis-facturas')
    async mine(@Req() req: any) {
        const list = await firstValueFrom(this.invoicesClient.send('facturas.findByUser', { iduser: req.user.id }));
        return wrapOk(list, 'OK');
    }
}
