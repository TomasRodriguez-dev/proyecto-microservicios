import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';

export class LocalAuthGuard extends AuthGuard('local') {}
export class JwtAuthGuard extends AuthGuard('jwt') {}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest();
        const handler = ctx.getHandler();
        const required: string[] = Reflect.getMetadata(ROLES_KEY, handler) || [];
        if (required.length === 0) return true;
        const user = req.user;
        if (!user?.roles) return false;
        return required.some(r => user.roles.includes(r));
    }
}
