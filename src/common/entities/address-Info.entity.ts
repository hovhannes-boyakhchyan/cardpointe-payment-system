import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GeoLocation {
  lng: number;
  lat: number;
  debug: object;
}

export class AddressInfo {
  @IsNotEmpty()
  @IsString()
  fullAddress: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  county: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  geoLocation: GeoLocation;
}
