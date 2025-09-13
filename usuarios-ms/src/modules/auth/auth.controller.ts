import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @MessagePattern('health')
    health() { return { ok: true, service: 'usuarios-ms' }; }

    @MessagePattern('users.validate')
    validate(@Payload() { email, password }: { email: string; password: string }) {
        return this.auth.validate(email, password);
    }
}