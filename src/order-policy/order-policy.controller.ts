import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrderPolicyService } from './order-policy.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateOrderPolicyDto } from './dto/create-order-policy.dto';
import { OrderPolicyResponseDTO } from './dto/order-policy-response.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiExtraModels(OrderPolicyResponseDTO)
@ApiTags('order-policies')
@Controller('order-policy')
export class OrderPolicyController {
  constructor(private readonly orderPolicyService: OrderPolicyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create an Order Policy' })
  @ApiCreatedResponse({
    description:
      'Successfully created a new Order Policy and returned the created Order Policy details.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.CREATED },
        data: { $ref: getSchemaPath(OrderPolicyResponseDTO) },
      },
    },
  })
  async create(
    @Body() data: CreateOrderPolicyDto,
  ): Promise<OrderPolicyResponseDTO> {
    const createdOrder = await this.orderPolicyService.create(data);
    return new OrderPolicyResponseDTO(createdOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all Order Policies' })
  @ApiOkResponse({
    description: 'Successfully retrieved all Order Policies.',
    schema: {
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(OrderPolicyResponseDTO) },
        },
      },
    },
  })
  async getAll(): Promise<OrderPolicyResponseDTO[]> {
    const orderPolicies = await this.orderPolicyService.getAll();
    return orderPolicies.map(
      (orderPolicy) => new OrderPolicyResponseDTO(orderPolicy),
    );
  }
}
