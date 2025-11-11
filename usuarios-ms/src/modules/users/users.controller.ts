import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @MessagePattern('users.findById')
    findById(@Payload() { id }: { id: number }) {
        return this.users.findById(id);
    }

    @MessagePattern('users.create')
    create(@Payload() dto: any) {
        return this.users.create(dto);
    }

    @MessagePattern('users.findMany')
    findMany(@Payload() query: any) {
        return this.users.findMany(query);
    }

    @MessagePattern('users.findManyByIds')
    findManyByIds(@Payload() { ids }: { ids: number[] }) {
        return this.users.findMany({});
    }

    @MessagePattern('users.update')
    update(
        @Payload()
        { id, data, isAdmin }: { id: number; data: any; isAdmin?: boolean },
    ) {
        return this.users.update(id, data, !!isAdmin);
    }
}
