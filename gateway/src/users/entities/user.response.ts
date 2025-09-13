import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'alice@demo.com' })
    email: string;

    @ApiProperty({ example: ['USER'], type: [String] })
    roles: string[];

    @ApiProperty({ example: true })
    isActive: boolean;
}
