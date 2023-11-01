import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'user',
    example: 'sachindu',
  })
  username: string;

  @ApiProperty({
    description: 'password',
    example: '123',
  })
  password: string;
  confirmPassword: string;
}
