import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'newmail@demo.com' })
    @IsOptional() @IsEmail() email?: string;

    @ApiPropertyOptional({ example: 'newPass123', minLength: 6 })
    @IsOptional() @IsString() @MinLength(6) password?: string;

    @ApiPropertyOptional({ example: 'ADMIN,USER', description: 'Solo ADMIN' })
    @IsOptional() @IsString() roles?: string;

    @ApiPropertyOptional({ example: true, description: 'Solo ADMIN' })
    @IsOptional() @IsBoolean() isActive?: boolean;
}
