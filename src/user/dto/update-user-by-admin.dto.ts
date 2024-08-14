import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDTO } from '../../auth/dto/update-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserByAdminDTO extends UpdateUserDTO {
  @ApiProperty({
    example: true,
    description: 'Flag indicating whether the user is an administrator',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
