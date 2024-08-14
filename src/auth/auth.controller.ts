import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Session,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { User, UserResponseDTO } from './dto/user-response.dto';
import { LoggedUserResponseDTO } from './dto/logged-user-response.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSession } from './dto/user-session.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginAuthGuard } from 'src/guards/login-auth.guard';

@ApiExtraModels(UserResponseDTO, LoggedUserResponseDTO)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User successfully registered.',
  //   type: UserResponseDTO,
  // })
  @ApiCreatedResponse({
    description: 'User successfully registered.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.CREATED },
        data: { $ref: getSchemaPath(UserResponseDTO) },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO): Promise<UserResponseDTO> {
    return this.authService.register(body.email, body.password, body.name);
  }

  @UseGuards(LoginAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User logged in successfully.',
  //   type: LoggedUserResponseDTO,
  // })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: { $ref: getSchemaPath(LoggedUserResponseDTO) },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  async login(
    @CurrentUser() curr: User,
    @Body() _body: LoginDTO,
    @Session() session: Partial<UserSession>,
  ): Promise<LoggedUserResponseDTO> {
    const user = new UserResponseDTO(curr);
    const accessToken = await this.authService.login(user);
    console.log(accessToken);

    const loggedUser = new LoggedUserResponseDTO(
      {
        id: curr.id,
        name: curr.name,
        email: curr.email,
        password: curr.password,
        isAdmin: curr.isAdmin,
      },
      accessToken,
    );
    session.user = loggedUser;

    return loggedUser;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out a user' })
  @ApiNoContentResponse({
    description: 'User logged out successfully.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Session() session: Partial<UserSession>): Promise<void> {
    session.user = null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user profile' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Profile retrieved successfully',
  //   type: UserResponseDTO,
  // })
  @ApiOkResponse({
    description: 'Profile retrieved successfully',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: { $ref: getSchemaPath(UserResponseDTO) },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@CurrentUser() curr: User): Promise<UserResponseDTO> {
    return new UserResponseDTO(curr);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiNoContentResponse({
    description: 'Profile updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. Invalid data received.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid credentials or token.',
  })
  @HttpCode(HttpStatus.NO_CONTENT) // Explicitly set the HTTP status code to 204
  async updateUser(
    @Body() credentials: UpdateUserDTO,
    @Session() session: Partial<UserSession>,
    @CurrentUser() curr: User,
  ): Promise<void> {
    await this.authService.update(curr.id, credentials, curr);

    if (session.user) {
      session.user.name = credentials.name;
      session.user.email = credentials.email;
    }
  }
}
