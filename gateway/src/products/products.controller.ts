import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { wrapOk } from '../common/envelope';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/auth/guard/guards';

@ApiTags('Productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly products: ProductsService) {}

    @ApiOperation({ summary: 'Crear producto (ADMIN)' })
    @ApiCreatedResponse({ description: 'Producto creado' })
    @ApiUnauthorizedResponse({ description: 'Sin token' })
    @ApiForbiddenResponse({ description: 'Requiere rol ADMIN' })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post()
    async create(@Body() dto: CreateProductDto) {
        const product = await this.products.create(dto);
        return wrapOk(product, 'Producto creado con éxito');
    }

    @ApiOperation({ summary: 'Listar productos (activos)' })
    @ApiOkResponse({ description: 'Listado de productos' })
    @Get()
    async findAll() {
        const product_list = await this.products.findAll();
        return wrapOk(product_list, 'Productos obtenido con éxito');
    }

    @ApiOperation({ summary: 'Obtener producto por id' })
    @ApiOkResponse({ description: 'Producto' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const product = await this.products.findOne(+id);
        return wrapOk(product, 'Producto obtenido con éxito');
    }

    @ApiOperation({ summary: 'Actualizar producto (ADMIN)' })
    @ApiOkResponse({ description: 'Actualizado' })
    @ApiForbiddenResponse({ description: 'Requiere rol ADMIN' })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        const product = await this.products.update(+id, dto);
        return wrapOk(product, 'Producto actualizado con éxito');
    }
}
