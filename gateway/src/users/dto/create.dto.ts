import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user2@demo.com' })
    @IsEmail() email: string;

    @ApiProperty({ example: 'secret123', minLength: 6 })
    @IsString() @MinLength(6) password: string;

    @ApiProperty({ example: 'USER,SELLER', required: false })
    @IsOptional() @IsString() roles?: string;
}
