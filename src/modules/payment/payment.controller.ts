import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  AuthorizePaymentDto,
  RefundPaymentDto,
  CapturePaymentDto,
} from './dtos/request';

@Controller('payment')
export class PaymentController {
  private logger: Logger;
  constructor(private readonly authPaymentService: PaymentService) {
    this.logger = new Logger(PaymentController.name);
  }

  @Post('/authorize')
  async authorizePayment(@Body() authorizePaymentDto: AuthorizePaymentDto) {
    this.logger.log(
      `authorizePaymentDto ${JSON.stringify(authorizePaymentDto)}`,
    );
    return this.authPaymentService.authorizePayment(authorizePaymentDto);
  }

  @Post('/refund')
  async refundPayment(@Body() refundPaymentDto: RefundPaymentDto) {
    this.logger.log(`refundPaymentDto ${JSON.stringify(refundPaymentDto)}`);
    return this.authPaymentService.refundPayment(refundPaymentDto);
  }

  @Post('/capture')
  async capturePayment(@Body() capturePaymentDto: CapturePaymentDto) {
    this.logger.log(`capturePaymentDto ${JSON.stringify(capturePaymentDto)}`);
    return this.authPaymentService.capturePayment(capturePaymentDto);
  }
}
