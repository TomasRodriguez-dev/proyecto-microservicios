import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponse {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'alice@demo.com' })
    email: string;

    @ApiProperty({ example: ['USER'], type: [String] })
    roles: string[];

    @ApiProperty({ example: true })
    isActive: boolean;

    // 👇 Datos nuevos
    @ApiPropertyOptional({ example: 'Alice' })
    firstName?: string;

    @ApiPropertyOptional({ example: 'Johnson' })
    lastName?: string;

    @ApiPropertyOptional({ example: '+54 9 351 0000000' })
    phone?: string;

    @ApiPropertyOptional({ example: 'Av. Siempre Viva 742' })
    addressLine?: string;

    @ApiPropertyOptional({ example: 'Córdoba' })
    city?: string;

    @ApiPropertyOptional({ example: 'Córdoba' })
    state?: string;

    @ApiPropertyOptional({ example: '5000' })
    postalCode?: string;

    @ApiPropertyOptional({ example: 'Argentina' })
    country?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.jpg' })
    avatarUrl?: string;

    @ApiPropertyOptional({ example: '1995-03-25' })
    birthDate?: string;

    @ApiProperty({ example: '2025-10-20T18:00:00Z' })
    createdAt: string;

    @ApiProperty({ example: '2025-10-20T18:30:00Z' })
    updatedAt: string;
}
