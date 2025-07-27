import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import {
  CreateExternalPaymentIntentDto,
  RefundsExternalPaymentDto,
} from './dtos';
import { ExternalPaymentEntity, ExternalRefundsEntity } from './entities';

@Injectable()
export class ForwardApiService {
  constructor(private readonly httpService: HttpService) {}

  async createExternalPayment(
    createPaymentIntentData: CreateExternalPaymentIntentDto,
  ): Promise<ExternalPaymentEntity> {
    return this.forwardRequest({
      url: `https://${process.env.FORWARD_URL}/external_payments`,
      method: 'POST',
      data: createPaymentIntentData,
    });
  }

  async refundsExternalPayment(
    refundsExternalPaymentData: RefundsExternalPaymentDto,
  ): Promise<ExternalRefundsEntity> {
    return this.forwardRequest({
      url: `https://${process.env.FORWARD_URL}/external_refunds`,
      method: 'POST',
      data: refundsExternalPaymentData,
    });
  }

  async forwardRequest(config: AxiosRequestConfig): Promise<any> {
    config.headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'x-account-id': process.env.ACCOUNT_ID,
      'x-api-key': process.env.PUBLIC_KEY,
    };
    console.log('------Forward Request Config------', JSON.stringify(config));

    const response = await firstValueFrom(
      this.httpService
        .request(config)
        .pipe(map((res) => res.data))
        .pipe(
          catchError((e) => {
            console.error('-------Forward ERROR-------', e.response.status);
            throw new HttpException(e.response.data.message, e.response.status);
          }),
        ),
    );
    console.log('----------------Response----------------', response);
    return response;
  }
}
