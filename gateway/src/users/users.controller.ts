import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserResponse } from './entities/user.response';
import { PaginatedUsersResponse } from './entities/paginated-users.response';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/auth/guard/guards';
import { CreateUserDto } from './dto/create.dto';
import { SelfOrAdminGuard } from 'src/auth/guard/admin.guard';
import { UpdateUserDto } from './dto/update.dto';
import { wrapOk } from 'src/common/envelope';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @ApiOperation({ summary: 'Crear usuario (solo ADMIN)' })
    @ApiCreatedResponse({ description: 'Usuario creado', type: UserResponse })
    @ApiBadRequestResponse({ description: 'Email ya registrado o datos inválidos' })
    @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
    @ApiForbiddenResponse({ description: 'Requiere rol ADMIN' })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.users.create(dto);
    }

    @ApiOperation({ summary: 'Listar todos los usuarios (solo ADMIN, sin paginado)' })
    @ApiOkResponse({
        description: 'Listado de usuarios',
        type: [UserResponse], 
    })
    @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
    @ApiForbiddenResponse({ description: 'Requiere rol ADMIN' })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get()
    @Get()
    async list() {
        const users = await this.users.findMany({});
        return wrapOk(users, 'Usuarios obtenidos con éxito');
    }


    @ApiOperation({ summary: 'Obtener un usuario (Usuario Autenticado o ADMIN)' })
    @ApiOkResponse({ description: 'Usuario', type: UserResponse })
    @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
    @ApiForbiddenResponse({ description: 'Ni self ni ADMIN' })
    @UseGuards(SelfOrAdminGuard)
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.users.findById(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar usuario (Usuario Autenticado o ADMIN)' })
    @ApiOkResponse({ description: 'Usuario actualizado', type: UserResponse })
    @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
    @ApiForbiddenResponse({ description: 'Solo ADMIN puede roles/isActive' })
    @UseGuards(SelfOrAdminGuard)
    update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: any
    ) {
        const isAdmin = req.user?.roles?.includes('ADMIN');
        const triesAdminOnly = dto.roles !== undefined || dto.isActive !== undefined;

        if (!isAdmin && triesAdminOnly) {
            throw new ForbiddenException('Solo ADMIN puede modificar roles o estado');
        }

        return this.users.update(+id, dto, isAdmin);
    }
}
