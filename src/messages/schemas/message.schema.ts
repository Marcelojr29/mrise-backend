import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true, collection: 'messages' })
export class Message {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  company?: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['nova', 'lida', 'respondida'], default: 'nova' })
  status: string;

  @Prop()
  respondedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  respondedBy?: Types.ObjectId;

  @Prop()
  notes?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Índices para otimização
MessageSchema.index({ status: 1 });
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ email: 1 });
