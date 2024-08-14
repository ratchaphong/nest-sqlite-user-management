import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { RegisterDTO } from './register.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO extends PartialType(
  OmitType(RegisterDTO, ['password'] as const),
) {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
