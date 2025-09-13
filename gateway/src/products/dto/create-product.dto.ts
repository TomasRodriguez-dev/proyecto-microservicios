import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Remera DryFit' }) @IsString() name: string;
    @ApiProperty({ example: 9999.99 }) @IsNumber() @IsPositive() price: number;
    @ApiProperty({ example: 50 }) @IsInt() @Min(0) stock: number;
}
