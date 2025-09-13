import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionEnvelopeFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx    = host.switchToHttp();
        const res    = ctx.getResponse<Response>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const payload = {
            error: this.toErrorBody(exception),
            result: [],
            mensaje: this.getMessage(exception),
            success: false,
            token: null,
        };

        res.status(status).json(payload);
    }

    private getMessage(ex: any) {
        if (ex instanceof HttpException) {
            const r = ex.getResponse();
            if (typeof r === 'string') return r;
            if (r && typeof r === 'object' && (r as any).message) return (r as any).message;
            return ex.message ?? 'Error';
        }
        return ex?.message ?? 'Error';
    }

    private toErrorBody(ex: any) {
        if (ex instanceof HttpException) {
            const r = ex.getResponse();
            const base = { name: ex.name, statusCode: ex.getStatus(), message: ex.message };
            return typeof r === 'object' ? { ...base, ...r } : base;
        }
        return { name: ex?.name ?? 'Error', statusCode: 500, message: ex?.message ?? 'Error' };
    }
}