import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TechnologyDocument = Technology & Document;

@Schema({ timestamps: true, collection: 'technologies' })
export class Technology {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: ['frontend', 'backend', 'database', 'devops', 'design', 'mobile'],
  })
  category: string;

  @Prop({ required: true })
  icon: string;

  @Prop({
    required: true,
    enum: ['básico', 'intermediário', 'avançado'],
  })
  level: string;

  @Prop()
  description?: string;

  @Prop()
  yearsOfExperience?: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TechnologySchema = SchemaFactory.createForClass(Technology);

// Índices para otimização
TechnologySchema.index({ category: 1 });
TechnologySchema.index({ level: 1 });
TechnologySchema.index({ isActive: 1 });
TechnologySchema.index({ order: 1 });
