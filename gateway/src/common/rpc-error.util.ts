import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';

export function handleRpcError(error: any, defaultMessage = 'Error en microservicio') {
    // RpcException suele envolver en .error
    const data = error?.error || error;
    const msg = data?.message || defaultMessage;
    const status = data?.statusCode || 500;

    switch (status) {
        case 400: throw new BadRequestException(msg);
        case 401: throw new UnauthorizedException(msg);
        case 403: throw new ForbiddenException(msg);
        case 404: throw new NotFoundException(msg);
        default: throw new InternalServerErrorException(msg);
    }
}
