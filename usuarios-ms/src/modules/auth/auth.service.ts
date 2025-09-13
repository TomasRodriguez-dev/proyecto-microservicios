import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
    constructor(private users: UsersService) {}
    validate(email: string, password: string) { return this.users.validate(email, password); }
}