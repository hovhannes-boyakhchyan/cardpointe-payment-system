import { ResponseStatusEnum } from '../../../../common/enums';

export class AuthorizePaymentResponseDto {
  amount: string;
  token: string;
  retRef: string;
  orderId: string;
  respText: string;
  expiry: string;
  respStat: ResponseStatusEnum;
}
