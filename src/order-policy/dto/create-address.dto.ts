import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: '01' })
  @IsString()
  @IsNotEmpty()
  houseNo: string;

  @ApiProperty({ example: '02' })
  @IsString()
  @IsNotEmpty()
  mooNo: string;

  @ApiProperty({ example: '03' })
  @IsString()
  @IsOptional()
  building: string;

  @ApiProperty({ example: '06' })
  @IsString()
  @IsOptional()
  soi: string;

  @ApiProperty({ example: '04' })
  @IsString()
  @IsNotEmpty()
  roomNo: string;

  @ApiProperty({ example: '05' })
  @IsString()
  @IsNotEmpty()
  floorNo: string;

  @ApiProperty({ example: '07' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '580405' })
  @IsString()
  @IsNotEmpty()
  subDistrictCode: string;

  @ApiProperty({ example: 'แม่ยวม' })
  @IsString()
  @IsNotEmpty()
  subDistrictNameTh: string;

  @ApiProperty({ example: '580405' })
  @IsString()
  @IsNotEmpty()
  districtCode: string;

  @ApiProperty({ example: 'แม่สะเรียง' })
  @IsString()
  @IsNotEmpty()
  districtNameTh: string;

  @ApiProperty({ example: '58' })
  @IsString()
  @IsNotEmpty()
  provinceCode: string;

  @ApiProperty({ example: 'แม่ฮ่องสอน' })
  @IsString()
  @IsNotEmpty()
  provinceNameTh: string;

  @ApiProperty({ example: '58110' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
