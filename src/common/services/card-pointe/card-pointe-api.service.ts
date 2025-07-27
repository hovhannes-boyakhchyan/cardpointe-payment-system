import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import {
  AuthorizeDto,
  CapturePaymentDto,
  CreateUpdateProfileDto,
  RefundDto,
  VoidPaymentDto,
} from './dtos';
import {
  AuthorizePaymentEntity,
  CapturePaymentEntity,
  InquirePaymentEntity,
  ProfileEntity,
  RefundPaymentEntity,
  VoidPaymentEntity,
} from '../../entities';

@Injectable()
export class CardPointeApiService {
  private logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger(CardPointeApiService.name);
  }

  async createOrUpdateProfile(
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/profile`,
      method: 'PUT',
      data: createUpdateProfileDto,
    });
  }

  async getProfile(
    profileId: string,
    merchId: string,
    acctId = '1',
  ): Promise<ProfileEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/profile/${profileId}/${acctId}/${merchId}`,
      method: 'GET',
    });
  }

  async deleteProfile(
    profileId: string,
    merchId: string,
    acctId: string,
  ): Promise<any> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/profile/${profileId}/${acctId}/${merchId}`,
      method: 'DELETE',
    });
  }

  async authorizePayment(
    authorizeDto: AuthorizeDto,
  ): Promise<AuthorizePaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/auth`,
      method: 'PUT',
      data: authorizeDto,
    });
  }

  async capturePayment(
    capturePaymentDto: CapturePaymentDto,
  ): Promise<CapturePaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/capture`,
      method: 'PUT',
      data: capturePaymentDto,
    });
  }

  async voidPayment(
    voidPaymentDto: VoidPaymentDto,
  ): Promise<VoidPaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/void`,
      method: 'PUT',
      data: voidPaymentDto,
    });
  }

  async voidPaymentByOrderId(
    merchid: string,
    orderid: string,
  ): Promise<VoidPaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/voidByOrderId`,
      method: 'PUT',
      data: {
        merchid,
        orderid,
      },
    });
  }

  async refundPayment(refundDto: RefundDto): Promise<RefundPaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/refund`,
      method: 'PUT',
      data: refundDto,
    });
  }

  async inquirePayment(
    merchId: string,
    retRef: string,
  ): Promise<InquirePaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/inquire/${retRef}/${merchId}`,
      method: 'GET',
    });
  }

  async inquirePaymentByOrderId(
    merchId: string,
    orderId: string,
  ): Promise<InquirePaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/inquireByOrderid/${orderId}/${merchId}`,
      method: 'GET',
    });
  }

  async settlementPayment(
    merchId: string,
    date: string = null,
    batchId: string = null,
  ): Promise<InquirePaymentEntity> {
    return this.cardPointeRequest({
      url: `https://${process.env.CARD_POINTE_SERVER}/cardconnect/rest/settlestat?merchid=${merchId}&date=${date}&batchid=${batchId}`,
      method: 'GET',
    });
  }

  async cardPointeRequest(config: AxiosRequestConfig): Promise<any> {
    config.headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.CARD_POINTE_USERNAME}:${process.env.CARD_POINTE_PASSWORD}`,
        ).toString('base64'),
    };
    this.logger.log(`Request Config ${JSON.stringify(config)}`);

    const response = await firstValueFrom(
      this.httpService
        .request(config)
        .pipe(map((res) => res.data))
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data.message, e.response.status);
          }),
        ),
    );
    this.logger.log(`Response ${JSON.stringify(response)}`);
    return response;
  }
}
