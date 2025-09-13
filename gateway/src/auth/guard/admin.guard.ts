import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;
        const paramId = Number(req.params.id);
        if (!user) return false;
        if (user.roles?.includes('ADMIN')) return true;
        return user.id === paramId;
    }
}
