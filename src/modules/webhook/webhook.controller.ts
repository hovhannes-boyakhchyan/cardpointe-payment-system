import { Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('card-pointe/webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  webhook() {
    // return this.webhookService.eventProcess();
  }
}
