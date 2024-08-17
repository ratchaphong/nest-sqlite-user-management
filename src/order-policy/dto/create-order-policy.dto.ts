import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreateOrderPolicyDto {
  @ApiProperty({ example: '1a2b3c4d-5678-9e0f-1234-56789abcdef0' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'P123456789' })
  @IsString()
  @IsNotEmpty()
  policyNo: string;

  @ApiProperty({ example: '1.30A' })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({ example: 1500 })
  @IsInt()
  @IsNotEmpty()
  engineSize: number;

  @ApiProperty({ example: '123ABC456' })
  @IsString()
  @IsNotEmpty()
  carTankNo: string;

  @ApiProperty({ example: 'B0197' })
  @IsString()
  @IsNotEmpty()
  vehicleBrandCode: string;

  @ApiProperty({ example: 'B01970000' })
  @IsString()
  @IsNotEmpty()
  vehicleModelCode: string;

  @ApiProperty({ example: 'CL001' })
  @IsString()
  @IsNotEmpty()
  vehicleColorCode: string;

  @ApiProperty({ example: '4' })
  @IsString()
  @IsNotEmpty()
  licensePlateTypeCode: string;

  @ApiProperty({ example: 'A', required: false })
  @IsString()
  @IsOptional()
  licensePlateLetter?: string;

  @ApiProperty({ example: '55555', required: false })
  @IsString()
  @IsOptional()
  licensePlateNumber?: string;

  @ApiProperty({ example: '2024-03-19T17:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // แปลง string เป็น Date
  startPolicyAt: Date;

  @ApiProperty({ example: '2025-03-20T09:30:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // แปลง string เป็น Date
  endPolicyAt: Date;

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  currentAddress: CreateAddressDto;

  @ApiProperty({ type: CreateAddressDto, required: false })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsOptional()
  idCardAddress?: CreateAddressDto;
}
