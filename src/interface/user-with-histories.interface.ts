import { User, History } from '@prisma/client';

export interface UserWithHistories extends User {
  histories: History[];
}
