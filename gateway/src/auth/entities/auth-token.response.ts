import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '../../users/entities/user.response';

export class AuthTokenResponse {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string;

    @ApiProperty({ type: UserResponse })
    user: UserResponse;
}
