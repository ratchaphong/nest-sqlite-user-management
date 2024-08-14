import { ApiProperty } from '@nestjs/swagger';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Include password if it's still necessary for the context before filtering it out in DTO
  isAdmin: boolean;
}

export class UserResponseDTO {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: true,
    description: 'Flag indicating whether the user is an administrator',
  })
  isAdmin: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
  }
}
