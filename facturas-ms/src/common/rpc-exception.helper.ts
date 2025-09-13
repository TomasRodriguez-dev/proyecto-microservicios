import { RpcException } from '@nestjs/microservices';

export class RpcError {
    static badRequest(message: string)   { return new RpcException({ statusCode: 400, message }); }
    static unauthorized(message: string) { return new RpcException({ statusCode: 401, message }); }
    static forbidden(message: string)    { return new RpcException({ statusCode: 403, message }); }
    static notFound(message: string)     { return new RpcException({ statusCode: 404, message }); }
    static internal(message = 'Error interno') { return new RpcException({ statusCode: 500, message }); }
}