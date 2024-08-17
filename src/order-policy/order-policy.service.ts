import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderPolicyDto } from './dto/create-order-policy.dto';
import { OrderPolicyWithAddresses } from 'src/interface/order-policy-with-address';

@Injectable()
export class OrderPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createOrderPolicyDto: CreateOrderPolicyDto,
  ): Promise<OrderPolicyWithAddresses> {
    const orderPolicy = await this.prisma.orderPolicy.create({
      data: {
        user: {
          connect: {
            id: createOrderPolicyDto.userId,
          },
        },
        policyNo: createOrderPolicyDto.policyNo,
        productCode: createOrderPolicyDto.productCode,
        engineSize: createOrderPolicyDto.engineSize,
        carTankNo: createOrderPolicyDto.carTankNo,
        vehicleBrandCode: createOrderPolicyDto.vehicleBrandCode,
        vehicleModelCode: createOrderPolicyDto.vehicleModelCode,
        vehicleColorCode: createOrderPolicyDto.vehicleColorCode,
        licensePlateTypeCode: createOrderPolicyDto.licensePlateTypeCode,
        licensePlateLetter: createOrderPolicyDto.licensePlateLetter,
        licensePlateNumber: createOrderPolicyDto.licensePlateNumber,
        startPolicyAt: createOrderPolicyDto.startPolicyAt,
        endPolicyAt: createOrderPolicyDto.endPolicyAt,
        currentAddress: {
          create: createOrderPolicyDto.currentAddress,
        },
        idCardAddress: createOrderPolicyDto.idCardAddress
          ? {
              create: createOrderPolicyDto.idCardAddress,
            }
          : undefined,
      },
      include: {
        currentAddress: true,
        idCardAddress: true,
      },
    });

    return orderPolicy;
  }

  async getAll(): Promise<OrderPolicyWithAddresses[]> {
    return this.prisma.orderPolicy.findMany({
      include: {
        currentAddress: true,
        idCardAddress: true,
        // user: true,
      },
    });
  }
}
