import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderPolicyDto } from './dto/create-order-policy.dto';
import { OrderPolicyWithAddresses } from 'src/interface/order-policy-with-address';

@Injectable()
export class OrderPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderPolicyDto): Promise<OrderPolicyWithAddresses> {
    const orderPolicy = await this.prisma.orderPolicy.create({
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
        policyNo: data.policyNo,
        // productCode: data.productCode,
        product: {
          connect: {
            code: data.productCode,
          },
        },
        engineSize: data.engineSize,
        carTankNo: data.carTankNo,
        vehicleBrandCode: data.vehicleBrandCode,
        vehicleModelCode: data.vehicleModelCode,
        vehicleColorCode: data.vehicleColorCode,
        licensePlateTypeCode: data.licensePlateTypeCode,
        licensePlateLetter: data.licensePlateLetter,
        licensePlateNumber: data.licensePlateNumber,
        startPolicyAt: data.startPolicyAt,
        endPolicyAt: data.endPolicyAt,
        currentAddress: {
          create: data.currentAddress,
        },
        idCardAddress: data.idCardAddress
          ? {
              create: data.idCardAddress,
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
