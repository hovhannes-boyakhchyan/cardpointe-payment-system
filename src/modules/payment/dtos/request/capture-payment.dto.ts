import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CapturePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  merchantId: string;

  @IsNotEmpty()
  @IsString()
  retRef: string;

  @IsOptional()
  @IsString()
  expiry?: string;
}
