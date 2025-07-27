import { Injectable, Logger } from '@nestjs/common';
import { Consumer, Kafka, Partitioners, Producer } from 'kafkajs';
import { IKafkaMessageSend } from './interfaces';

@Injectable()
export class KafkaService {
  private logger: Logger;
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  constructor() {
    this.kafka = new Kafka({
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    });
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    this.consumer = this.kafka.consumer({ groupId: process.env.GROUP_ID });
    this.consumer.connect().then(async () => {
      // await this.subscribing();
      // await this.consumingMessages();
    });
    this.logger = new Logger(Kafka.name);
  }

  subscribing = async () => {
    await this.consumer.subscribe({
      topics: [],
      fromBeginning: true,
    });
  };

  async sendMessage(kafkaMessage: IKafkaMessageSend) {
    const { topic, messages } = kafkaMessage;
    await this.producer.connect();
    await this.producer
      .send({
        topic,
        messages,
      })
      .then((data) => this.logger.log(`Send Data ${JSON.stringify(data)}`))
      .catch((e) => this.logger.error(e.message, e));
    await this.producer.disconnect();
  }

  consumingMessages = async () => {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data: object = JSON.parse(message.value.toString());
      },
    });
  };
}
