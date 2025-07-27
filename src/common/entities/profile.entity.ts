import { AcctTypeEnum, ResponseStatusEnum, YesNoEnum } from '../enums';

export class ProfileEntity {
  profileid: string;
  acctid: string;
  respstat?: ResponseStatusEnum;
  token: string;
  respcode: string;
  resptext: string;
  respproc: string;
  accttype: AcctTypeEnum;
  expiry: string;
  name: string;
  address: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  postal: string;
  company: string;
  email: string;
  defaultacct: YesNoEnum;
  gsacard: string;
  auoptout: YesNoEnum;
  cofpermission: YesNoEnum;
}
