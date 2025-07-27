import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthorizePaymentDto {
  @IsNotEmpty()
  @IsString()
  merchantId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsOptional()
  @IsBoolean()
  capture?: boolean;

  @IsOptional()
  @IsString()
  orderId?: string;
}
