import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserResponseDTO } from 'src/auth/dto/user-response.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';
import { UpdateUserByAdminDTO } from './dto/update-user-by-admin.dto';

@ApiExtraModels(UserResponseDTO) // ทำให้ Swagger รู้จัก UserResponseDTO
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminAuthGuard)
  @Get('')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of all users',
  //   type: UserResponseDTO,
  //   isArray: true,
  // })
  @ApiOkResponse({
    description: 'List of all users',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(UserResponseDTO) },
        },
      },
    },
  })
  async getAllUsers(@CurrentUser() curr: User): Promise<UserResponseDTO[]> {
    console.log(curr);
    const users = await this.userService.findAllUsers();
    return users.map((user) => new UserResponseDTO(user));
  }

  @UseGuards(AdminAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user by ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The user has been successfully retrieved.',
  //   type: UserResponseDTO,
  // })
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: { $ref: getSchemaPath(UserResponseDTO) },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.findUserById(id);
    return new UserResponseDTO(user);
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update user by ID (Admin)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The user has been successfully updated.',
  //   type: UserResponseDTO,
  // })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: { $ref: getSchemaPath(UserResponseDTO) },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserByAdminDTO: UpdateUserByAdminDTO,
  ): Promise<UserResponseDTO> {
    const updatedUser = await this.userService.updateUserById(
      id,
      updateUserByAdminDTO,
    );
    return new UserResponseDTO(updatedUser);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiNoContentResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    // @Param('id') id: string
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.userService.deleteUserById(id);
  }
}
