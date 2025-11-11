import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user2@demo.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'secret123', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ example: 'USER,SELLER' })
    @IsOptional()
    @IsString()
    roles?: string;

    // 👇 Datos personales
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

    // 👇 Dirección
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

    // 👇 Datos adicionales
    @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.jpg' })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiPropertyOptional({ example: '1995-03-25' })
    @IsOptional()
    @IsDateString()
    birthDate?: string;
}
