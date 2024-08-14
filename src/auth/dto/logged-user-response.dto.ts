import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDTO } from './user-response.dto';
import { User } from '@prisma/client';

export class LoggedUserResponseDTO extends UserResponseDTO {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Access token for API authentication',
  })
  accessToken: string;

  constructor(user: User, accessToken: string) {
    super(user); // Initialize the base class properties
    this.accessToken = accessToken; // Initialize accessToken
  }
}
