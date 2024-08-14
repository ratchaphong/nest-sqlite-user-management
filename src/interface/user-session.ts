import { LoggedUserResponseDTO } from '../auth/dto/logged-user-response.dto';

export interface UserSession {
  user: LoggedUserResponseDTO;
}
