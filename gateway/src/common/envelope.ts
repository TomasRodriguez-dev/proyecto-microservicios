export interface Envelope<T = any> {
    error: any | null;
    result: T[];         
    mensaje: string;
    success: boolean;
    token: string | null;
}

export function wrapOk<T>(data: T | T[] = [], mensaje = 'OK', token: string | null = null): Envelope<T> {
    const arr = Array.isArray(data) ? data : (data !== undefined && data !== null ? [data] : []);
    return { error: null, result: arr, mensaje, success: true, token };
}