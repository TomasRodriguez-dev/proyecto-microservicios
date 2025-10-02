// Error que puede devolver la API
export interface ApiError {
    name: string;
    statusCode: number;
    message: string;
    error: string;
}

// Respuesta genérica de la API
export interface ApiResponse<T = any> {
    error?: ApiError;   
    result: T;         
    mensaje: string;    
    success: boolean;  
    token?: string | null;
}
