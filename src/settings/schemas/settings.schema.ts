import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class CompanyInfo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  description: string;
}

@Schema()
export class SocialLinks {
  @Prop()
  linkedin?: string;

  @Prop()
  github?: string;

  @Prop()
  instagram?: string;

  @Prop()
  twitter?: string;
}

@Schema({ timestamps: true })
export class Settings {
  @Prop({ type: CompanyInfo, required: true })
  companyInfo: CompanyInfo;

  @Prop({ type: SocialLinks, default: {} })
  socialLinks: SocialLinks;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
