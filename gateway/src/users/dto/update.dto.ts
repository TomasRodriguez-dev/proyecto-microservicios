import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'newmail@demo.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'newPass123', minLength: 6 })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @ApiPropertyOptional({ example: 'ADMIN,USER', description: 'Solo ADMIN' })
    @IsOptional()
    @IsString()
    roles?: string;

    @ApiPropertyOptional({ example: true, description: 'Solo ADMIN' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    // 👇 Nuevos campos
    @ApiPropertyOptional({ example: 'Juan' })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiPropertyOptional({ example: 'Pérez' })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiPropertyOptional({ example: '+54 9 351 1234567' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ example: 'Av. Siempre Viva 742' })
    @IsOptional()
    @IsString()
    addressLine?: string;

    @ApiPropertyOptional({ example: 'Córdoba' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ example: 'Córdoba' })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({ example: '5000' })
    @IsOptional()
    @IsString()
    postalCode?: string;

    @ApiPropertyOptional({ example: 'Argentina' })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.jpg' })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiPropertyOptional({ example: '1995-03-25' })
    @IsOptional()
    @IsDateString()
    birthDate?: string;
}
