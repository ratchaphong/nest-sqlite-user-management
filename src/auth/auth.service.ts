import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, UserResponseDTO } from './dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new BadRequestException('Email is already in use.');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password');

    return user;
  }

  async login(user: UserResponseDTO): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async update(
    id: number,
    attrs: UpdateUserDTO,
    currentUser: User,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: attrs.email },
    });

    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException('Email is already in use by another user.');
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        name: attrs.name || currentUser.name,
        email: attrs.email || currentUser.email,
      },
    });
  }
}
