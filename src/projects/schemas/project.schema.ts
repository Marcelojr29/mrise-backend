import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true, collection: 'projects' })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: [String], required: true })
  technologies: string[];

  @Prop()
  liveUrl?: string;

  @Prop()
  githubUrl?: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop()
  category?: string;

  @Prop()
  clientName?: string;

  @Prop()
  completedAt?: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Índices para otimização
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ isActive: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ order: 1 });
