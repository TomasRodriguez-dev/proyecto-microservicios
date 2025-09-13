import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
    @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
    @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() price?: number;
    @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) stock?: number;
    @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}
