import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProductResponseDTO } from './dto/product-response.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiExtraModels(ProductResponseDTO)
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a Product' })
  @ApiCreatedResponse({
    description:
      'Successfully created a new Product and returned the created Product details.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.CREATED },
        data: { $ref: getSchemaPath(ProductResponseDTO) },
      },
    },
  })
  async create(@Body() data: CreateProductDTO): Promise<ProductResponseDTO> {
    const createProduct = await this.productService.create(data);
    return new ProductResponseDTO(createProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all Products' })
  @ApiOkResponse({
    description: 'Successfully retrieved all Order Policies.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ProductResponseDTO) },
        },
      },
    },
  })
  async findAll(): Promise<ProductResponseDTO[]> {
    const products = await this.productService.findAll();
    return products.map((product) => new ProductResponseDTO(product));
  }
}
