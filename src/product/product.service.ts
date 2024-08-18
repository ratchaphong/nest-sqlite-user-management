import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: {
        ...data,
      },
    });

    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    const produces = await this.prisma.product.findMany();

    return produces;
  }
}
