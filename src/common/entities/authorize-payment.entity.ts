import { ResponseStatusEnum } from '../enums';
import { ExternalPaymentEntity } from '../services/forward/entities';

export class AuthorizePaymentEntity {
  respstat: ResponseStatusEnum;
  retref: string;
  account: string;
  expiry: string;
  token: string;
  amount: string;
  orderId: string;
  merchid: string;
  respcode: string;
  resptext: string;
  respproc: string;
  cof: string;
  avsresp: string;
  cvvresp: string;
  binInfo: string;
  bintype: string;
  entrymode: string;
  fee_amount: string;
  fee_authcode: string;
  fee_format: string;
  fee_merchid: string;
  fee_retref: string;
  fee_type: string;
  fee_value: string;
  declineCategory: string;
  declineCategoryText: string;
  authcode: string;
  signature: string;
  commcard: string;
  emv: string;
  emvTagData: string;
  receipt: string;
  receiptObj: string;
  externalPayment?: ExternalPaymentEntity;
}
