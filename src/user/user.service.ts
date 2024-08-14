import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserByAdminDTO } from './dto/update-user-by-admin.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUserById(
    id: number,
    updateUserByAdminDTO: UpdateUserByAdminDTO,
  ): Promise<User> {
    const user = await this.findUserById(id);

    return await this.prisma.user.update({
      where: { id },
      data: { ...user, ...updateUserByAdminDTO }, // Merge the existing user data with the updated data
    });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.findUserById(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
