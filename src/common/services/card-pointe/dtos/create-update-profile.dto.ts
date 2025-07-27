import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AcctTypeEnum, YesNoEnum } from '../../../enums';

export class CreateUpdateProfileDto {
  @IsOptional()
  @IsString()
  profile?: string;

  @IsOptional()
  @IsEnum(YesNoEnum)
  defaultacct?: YesNoEnum;

  @IsOptional()
  @IsEnum(YesNoEnum)
  profileupdate?: YesNoEnum;

  @IsOptional()
  @IsEnum(YesNoEnum)
  cofpermission?: YesNoEnum;

  @IsOptional()
  @IsEnum(YesNoEnum)
  auoptout?: YesNoEnum;

  @IsOptional()
  @IsEnum(AcctTypeEnum)
  accttype?: AcctTypeEnum;

  @IsNotEmpty()
  @IsString()
  merchid: string;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsOptional()
  @IsString()
  bankaba?: string;

  @IsOptional()
  @IsString()
  expiry?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  postal?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
