import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CardPointeApiService, ForwardApiService } from '../../common/services';
import { PaymentMetadata, PaymentMetadataSchema } from '../../common/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentMetadata.name, schema: PaymentMetadataSchema },
    ]),
    HttpModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, CardPointeApiService, ForwardApiService],
})
export class PaymentModule {}
