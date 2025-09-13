import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvoicesEnricher {
    constructor(@Inject('USUARIOS_CLIENT') private readonly usersClient: ClientProxy) {}

    async enrichWithUsers(invoices: any[]) {
        const ids = [...new Set(invoices.map(f => f.iduser))];
        if (ids.length === 0) return invoices;
        const users = await firstValueFrom(this.usersClient.send('users.findManyByIds', { ids })) as any[];
        const map = new Map(users.map(u => [u.id, u]));
        return invoices.map(f => ({ ...f, user: map.get(f.iduser) || null }));
    }
}
