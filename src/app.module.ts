import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './modules/profile/profile.module';
import { PaymentModule } from './modules/payment/payment.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV ? `.env.${process.env.NODE_ENV.trim()}` : '.env',
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_CONNECTION_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ProfileModule,
    PaymentModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
