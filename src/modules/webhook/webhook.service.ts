import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../../common/services/kafka/kafka.service';

@Injectable()
export class WebhookService {
  private logger: Logger;
  constructor(private readonly kafkaService: KafkaService) {
    this.logger = new Logger(WebhookService.name);
  }

  async eventProcess(event) {
    this.logger.log('------------------1');
    switch (
      event
      // case EventsEnum.PAYMENT_INTENT_SUCCEEDED:
      //   this.log(LogsEnum.PAYMENT_INTENT_SUCCEEDED);
      //   await this.LOGS_REPO.addLog(event);
      //   let topic = this.configService.get(
      //     TopicsEnum.PAYMENT_INTENT_SUCCEEDED,
      //   );
      //   const metadata = event?.data?.object?.metadata;
      //   if (metadata.provider === 'marketplace') {
      //     topic = `${metadata.alias}_${topic}`;
      //   }
      //   this.client.emit(topic, event);
      //   break;
    ) {
    }

    await this.kafkaService.sendMessage({
      topic: 'my_test_topic',
      messages: [
        {
          value: JSON.stringify({ t: 't', b: 'b' }),
        },
      ],
    });
  }
}
