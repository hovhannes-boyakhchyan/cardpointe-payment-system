import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AuthorizeDto,
  RefundDto,
} from '../../common/services/card-pointe/dtos';
import {
  AuthorizePaymentDto,
  RefundPaymentDto,
  CapturePaymentDto,
} from './dtos/request';
import { CardPointeApiService, ForwardApiService } from '../../common/services';
import {
  AuthorizePaymentEntity,
  RefundPaymentEntity,
} from '../../common/entities';
import { PaymentMetadata, PaymentMetadataDocument } from '../../common/schemas';
import { ResponseStatusEnum, YesNoEnum } from '../../common/enums';
import { FAILED_PAYMENT } from '../../common/constants';
import {
  CreateExternalPaymentIntentDto,
  RefundsExternalPaymentDto,
} from '../../common/services/forward/dtos';
import {
  AuthorizePaymentResponseDto,
  CapturePaymentResponseDto,
} from './dtos/response';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentMetadata.name)
    private readonly paymentMetadataModel: Model<PaymentMetadataDocument>,
    private readonly cardPointeApiService: CardPointeApiService,
    private readonly forwardApiService: ForwardApiService,
  ) {}

  async authorizePayment(
    authorizePaymentDto: AuthorizePaymentDto,
  ): Promise<AuthorizePaymentResponseDto> {
    const authorizeData = this.mapAuthorizeData(authorizePaymentDto);

    const authorizePayment = await this.cardPointeApiService.authorizePayment(
      authorizeData,
    );

    if (authorizePayment.respstat !== ResponseStatusEnum.A) {
      throw new BadRequestException(FAILED_PAYMENT);
    }

    return {
      amount: authorizePayment.amount,
      token: authorizePayment.token,
      retRef: authorizePayment.retref,
      orderId: authorizePayment.orderId,
      respText: authorizePayment.resptext,
      respStat: authorizePayment.respstat,
      expiry: authorizePayment.expiry,
    };
  }

  async refundPayment(
    refundPaymentDto: RefundPaymentDto,
  ): Promise<RefundPaymentEntity> {
    const mapRefundPaymentData = this.mapRefundPaymentData(refundPaymentDto);
    const refundPayment = await this.cardPointeApiService.refundPayment(
      mapRefundPaymentData,
    );
    if (refundPaymentDto.externalPayment) {
      const mapRefundExternalPaymentData =
        this.mapRefundExternalPaymentData(refundPaymentDto);
      refundPayment.externalRefunds =
        await this.forwardApiService.refundsExternalPayment(
          mapRefundExternalPaymentData,
        );
    }

    return refundPayment;
  }

  async capturePayment(
    capturePaymentDto: CapturePaymentDto,
  ): Promise<CapturePaymentResponseDto> {
    const capturePayment = await this.cardPointeApiService.capturePayment({
      merchid: capturePaymentDto.merchantId,
      account: capturePaymentDto.token,
      retref: capturePaymentDto.retRef,
      amount: capturePaymentDto.amount,
    });

    return {
      merchantId: capturePayment.merchid,
      orderId: capturePayment.orderId,
      amount: capturePayment.amount,
      retRef: capturePayment.retref,
      setlStat: capturePayment.setlstat,
    };
  }

  mapAuthorizeData(authorizePaymentDto: AuthorizePaymentDto): AuthorizeDto {
    const authorizeData: AuthorizeDto = {
      amount: authorizePaymentDto.amount,
      merchid: authorizePaymentDto.merchantId,
      account: authorizePaymentDto.token,
      capture:
        authorizePaymentDto.capture === false ? YesNoEnum.no : YesNoEnum.yes, // As default
      orderid: authorizePaymentDto.orderId,
    };
    Object.keys(authorizeData).forEach(
      (key) => authorizeData[key] === undefined && delete authorizeData[key],
    );

    return authorizeData;
  }

  mapExternalPaymentData(
    authorizePaymentDto: AuthorizePaymentDto,
    authorizePayment: AuthorizePaymentEntity,
  ): CreateExternalPaymentIntentDto {
    return {
      payment_intent: {
        amount: authorizePaymentDto.amount,
        // payment_splits: [
        // {
        //   account_id: authorizePaymentDto.ordersCoAccountId,
        //   amount: authorizePaymentDto.applicationFeeAmount,
        //   description: '',
        // },
        // ],
      },
      payment_method: {
        payment_method_type: 'card',
        source_type: 'cardpointe',
        card: {
          token: 'external',
          last_four_digits: '2311',
          first_six_digits: '424223',
          brand: 'visa',
          exp_month: '1',
          exp_year: '2024',
        },
      },
      gateway_response: {
        auth_code: authorizePayment.authcode,
        retrieval_reference: authorizePayment.retref,
        created_at: new Date().toISOString(),
        response_raw: JSON.stringify(authorizePayment),
      },
    };
  }

  mapRefundPaymentData(refundPaymentDto: RefundPaymentDto): RefundDto {
    const refundData: RefundDto = {
      merchid: refundPaymentDto.merchid,
      retref: refundPaymentDto.retref,
      amount: refundPaymentDto.amount,
      orderid: refundPaymentDto.orderid,
    };
    Object.keys(refundData).forEach(
      (key) => refundData[key] === undefined && delete refundData[key],
    );

    return refundData;
  }

  mapRefundExternalPaymentData(
    refundPaymentDto: RefundPaymentDto,
  ): RefundsExternalPaymentDto {
    return {
      payment_intent_id: refundPaymentDto.externalPayment.id,
      gateway_response: {
        created_at: refundPaymentDto.externalPayment.created_at,
        retrieval_reference: refundPaymentDto.retref,
      },
    };
  }
}
