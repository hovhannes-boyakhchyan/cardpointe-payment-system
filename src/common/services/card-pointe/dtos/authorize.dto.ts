import { YesNoEnum } from '../../../enums';

export class AuthorizeDto {
  merchid: string;
  amount: number;
  account: string;
  name?: string;
  profile?: string;
  expiry?: string;
  postal?: string;
  cvv2?: string;
  ecomind?: string;
  cof?: string;
  cofpermission?: string;
  cofscheduled?: string;
  currency?: string;
  bankaba?: string;
  track?: string;
  receipt?: string;
  bin?: string;
  auoptout?: string;
  capture?: YesNoEnum;
  tokenize?: string;
  signature?: string;
  address?: string;
  address2?: string;
  city?: string;
  region?: string;
  country?: string;
  phone?: string;
  company?: string;
  email?: string;
  orderid?: string;
  authcode?: string;
  taxexempt?: string;
  taxamnt?: string;
  termid?: string;
  accttype?: string;
}
