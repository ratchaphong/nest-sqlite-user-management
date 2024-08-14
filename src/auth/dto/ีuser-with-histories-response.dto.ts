import { ApiProperty } from '@nestjs/swagger';
import { User, History } from '@prisma/client';
import { UserResponseDTO } from './user-response.dto';
import { UserHistoryDTO } from './user-history.dto';

export class UserWithHistoriesResponseDTO extends UserResponseDTO {
  @ApiProperty({
    type: [UserHistoryDTO],
    description: 'A list of history records associated with the user',
  })
  histories: UserHistoryDTO[];

  constructor(user: User & { histories: History[] }) {
    super(user);
    this.histories = user.histories.map(
      (history) => new UserHistoryDTO(history),
    );
  }
}
