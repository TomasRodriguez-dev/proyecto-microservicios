import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/guards';
import { CheckoutService } from './checkout.service';
import { wrapOk } from '../common/envelope';

@ApiTags('Confirmar Carrito')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkout: CheckoutService) {}

    @ApiOperation({ summary: 'Confirmar carrito → crear factura → limpiar carrito' })
    @ApiOkResponse({ description: 'Factura creada' })
    @Post()
    async doCheckout(@Req() req: any) {
        const factura = await this.checkout.checkout(req.user.id);
        return wrapOk(factura, 'Compra confirmada');
    }
}
