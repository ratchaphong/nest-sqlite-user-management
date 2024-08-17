import { OrderPolicy } from '@prisma/client';
import { CreateAddressDto } from 'src/order-policy/dto/create-address.dto';

export interface OrderPolicyWithAddresses extends OrderPolicy {
  currentAddress: CreateAddressDto;
  idCardAddress?: CreateAddressDto;
}
