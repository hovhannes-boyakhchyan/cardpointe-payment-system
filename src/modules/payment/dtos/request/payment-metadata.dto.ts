import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentMetadataDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  cartId: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  alias: string;
}
