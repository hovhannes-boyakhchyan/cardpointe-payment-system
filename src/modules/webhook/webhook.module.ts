import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { KafkaService } from '../../common/services/kafka/kafka.service';

@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [WebhookService, KafkaService],
})
export class WebhookModule {}
