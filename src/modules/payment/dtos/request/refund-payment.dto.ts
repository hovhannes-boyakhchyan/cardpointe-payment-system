import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExternalPaymentEntity } from '../../../../common/services/forward/entities';

export class RefundPaymentDto {
  @IsNotEmpty()
  @IsString()
  merchid: string;

  @IsNotEmpty()
  @IsString()
  retref: string;

  @IsOptional()
  @IsString()
  amount?: string;

  @IsOptional()
  @IsString()
  orderid?: string;

  @IsOptional()
  @IsString()
  externalPayment?: ExternalPaymentEntity;
}
