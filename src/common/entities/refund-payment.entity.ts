import { ExternalRefundsEntity } from '../services/forward/entities';

export class RefundPaymentEntity {
  merchid: string;
  orderId: string;
  amount: number;
  currency: string;
  retref: string;
  authcode: string;
  respcode: string;
  respproc: string;
  respstat: string;
  resptext: string;
  receipt: string;
  declineCategory: string;
  declineCategoryText: string;
  externalRefunds?: ExternalRefundsEntity;
}
