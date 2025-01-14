import { ApiProperty } from '@nestjs/swagger';
import { History } from '@prisma/client';

export class UserHistoryDTO {
  @ApiProperty({
    example: '1a2b3c4d-5678-9e0f-1234-56789abcdef0', // ตัวอย่าง UUID
    description: 'The unique identifier of the history record',
  })
  id: string;

  @ApiProperty({
    example: 'Updated email from john.old@example.com to john.doe@example.com',
    description: 'The action that was taken',
  })
  action: string;

  @ApiProperty({
    example: '2023-08-13T12:34:56.000Z',
    description: 'The date and time when the action was performed',
  })
  createdAt: Date;

  constructor(history: History) {
    this.id = history.id;
    this.action = history.action;
    this.createdAt = history.createdAt;
  }
}
