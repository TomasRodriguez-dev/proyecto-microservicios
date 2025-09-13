import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';

export class PaginatedUsersResponse {
    @ApiProperty({ type: [UserResponse] })
    data: UserResponse[];

    @ApiProperty({ example: 23 })
    total: number;

    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 10 })
    limit: number;
}
