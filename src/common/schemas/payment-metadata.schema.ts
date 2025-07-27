import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PaymentMetadataDocument = PaymentMetadata & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  collection: PaymentMetadata.name,
})
export class PaymentMetadata {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  orderId: string;

  @Prop({ type: String })
  cartId: string;

  @Prop({ type: String })
  provider: string;

  @Prop({ type: String })
  alias: string;
}

export const PaymentMetadataSchema =
  SchemaFactory.createForClass(PaymentMetadata);
