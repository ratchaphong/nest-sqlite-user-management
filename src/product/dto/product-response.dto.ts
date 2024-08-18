import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductResponseDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the product',
  })
  id: string;

  @ApiProperty({ example: 'P001', description: 'Unique code for the product' })
  code: string;

  @ApiProperty({
    example: 'ผลิตภัณฑ์ A',
    description: 'Thai name of the product',
  })
  nameTh: string;

  @ApiProperty({
    example: 'Product A',
    description: 'English name of the product',
  })
  nameEn: string;

  @ApiProperty({ example: 1000, description: 'Minimum engine size in cc' })
  minEnginSize: number;

  @ApiProperty({ example: 2000, description: 'Maximum engine size in cc' })
  maxEnginSize: number;

  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    description: 'Base64 encoded image data for the product',
  })
  imageBase64: string;

  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    description: 'Base64 encoded English image data for the product',
  })
  imageBase64En: string;

  @ApiProperty({
    example: '2024-08-18T00:00:00.000Z',
    description: 'Effective start date and time for the product',
  })
  effectiveStartAt: Date;

  @ApiProperty({
    example: '2025-08-18T00:00:00.000Z',
    description: 'Effective end date and time for the product',
  })
  effectiveEndAt: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.code = product.code;
    this.nameTh = product.nameTh;
    this.nameEn = product.nameEn;
    this.minEnginSize = product.minEnginSize;
    this.maxEnginSize = product.maxEnginSize;
    this.imageBase64 = product.imageBase64;
    this.imageBase64En = product.imageBase64En;
    this.effectiveStartAt = product.effectiveStartAt;
    this.effectiveEndAt = product.effectiveEndAt;
  }
}
