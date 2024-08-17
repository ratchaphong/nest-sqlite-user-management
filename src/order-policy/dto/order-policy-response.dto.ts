import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { OrderPolicyWithAddresses } from 'src/interface/order-policy-with-address';

export class OrderPolicyResponseDTO {
  @ApiProperty({ example: '1a2b3c4d-5678-9e0f-1234-56789abcdef0' })
  id: string;

  @ApiProperty({ example: '1a2b3c4d-5678-9e0f-1234-56789abcdef0' })
  userId: string;

  @ApiProperty({ example: 'P123456789' })
  policyNo: string;

  @ApiProperty({ example: '1.30A' })
  productCode: string;

  @ApiProperty({ example: 1500 })
  engineSize: number;

  @ApiProperty({ example: '123ABC456' })
  carTankNo: string;

  @ApiProperty({ example: 'B0197' })
  vehicleBrandCode: string;

  @ApiProperty({ example: 'B01970000' })
  vehicleModelCode: string;

  @ApiProperty({ example: 'CL001' })
  vehicleColorCode: string;

  @ApiProperty({ example: '4' })
  licensePlateTypeCode: string;

  @ApiProperty({ example: 'A', required: false })
  licensePlateLetter?: string;

  @ApiProperty({ example: '55555', required: false })
  licensePlateNumber?: string;

  @ApiProperty({ example: '2024-03-19T17:00:00.000Z' })
  startPolicyAt: Date;

  @ApiProperty({ example: '2025-03-20T09:30:00.000Z' })
  endPolicyAt: Date;

  @ApiProperty({ type: CreateAddressDto })
  currentAddress: CreateAddressDto;

  @ApiProperty({ type: CreateAddressDto, required: false })
  idCardAddress?: CreateAddressDto;

  constructor(orderPolicy: OrderPolicyWithAddresses) {
    this.id = orderPolicy.id;
    this.userId = orderPolicy.userId;
    this.policyNo = orderPolicy.policyNo;
    this.productCode = orderPolicy.productCode;
    this.engineSize = orderPolicy.engineSize;
    this.carTankNo = orderPolicy.carTankNo;
    this.vehicleBrandCode = orderPolicy.vehicleBrandCode;
    this.vehicleModelCode = orderPolicy.vehicleModelCode;
    this.vehicleColorCode = orderPolicy.vehicleColorCode;
    this.licensePlateTypeCode = orderPolicy.licensePlateTypeCode;
    this.licensePlateLetter = orderPolicy.licensePlateLetter;
    this.licensePlateNumber = orderPolicy.licensePlateNumber;
    this.startPolicyAt = orderPolicy.startPolicyAt;
    this.endPolicyAt = orderPolicy.endPolicyAt;
    this.currentAddress = orderPolicy.currentAddress;
    this.idCardAddress = orderPolicy.idCardAddress;
  }
}
