import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { wrapOk } from '../common/envelope';
import { JwtAuthGuard } from '../auth/guard/guards';

@ApiTags('Carrito')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
    constructor(private readonly cart: CartService) {}

    @ApiOperation({ summary: 'Obtener mi carrito' })
    @ApiOkResponse({ description: 'Carrito actual' })
    @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
    @Get()
    async get(@Req() req: any) {
        const data = await this.cart.get(req.user.id);
        return wrapOk(data, 'Carrito obtenido con éxito');
    }

    @ApiOperation({ summary: 'Agregar item al carrito (reserva stock)' })
    @ApiOkResponse({ description: 'Item agregado y reservado' })
    @Post('add')
    async add(@Req() req: any, @Body() dto: AddItemDto) {
        const data = await this.cart.add(req.user.id, dto.idproduct, dto.quantity);
        return wrapOk(data, 'Item agregado con éxito');
    }

    @ApiOperation({ summary: 'Actualizar cantidad de un item (renueva reserva)' })
    @ApiOkResponse({ description: 'Item actualizado' })
    @Patch('item/:id')
    async updateItem(
        @Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateItemDto,
    ) {
        const data = await this.cart.updateItem(req.user.id, id, dto.quantity);
        return wrapOk(data, 'Item actualizado con éxito');
    }

    @ApiOperation({ summary: 'Eliminar item del carrito (libera reserva)' })
    @ApiOkResponse({ description: 'Item eliminado' })
    @Delete('item/:id')
    async removeItem(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        const data = await this.cart.removeItem(req.user.id, id);
        return wrapOk(data, 'Item eliminado con éxito');
    }

    @ApiOperation({ summary: 'Vaciar carrito (libera reservas)' })
    @ApiOkResponse({ description: 'Carrito vaciado' })
    @Delete()
    async clear(@Req() req: any) {
        const data = await this.cart.clear(req.user.id);
        return wrapOk(data, 'Carrito vaciado con éxito');
    }
}
