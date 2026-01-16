import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true, collection: 'services' })
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: [String], required: true })
  features: string[];

  @Prop({
    type: {
      model: { type: String, enum: ['fixed', 'hourly', 'project', 'custom'] },
      startingPrice: Number,
      currency: String,
    },
  })
  pricing?: {
    model: string;
    startingPrice?: number;
    currency: string;
  };

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

// Índices para otimização
ServiceSchema.index({ isActive: 1 });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ order: 1 });
