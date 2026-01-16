import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PricingDto {
  @ApiProperty({
    example: 'project',
    enum: ['fixed', 'hourly', 'project', 'custom'],
  })
  @IsEnum(['fixed', 'hourly', 'project', 'custom'], {
    message: 'Model deve ser: fixed, hourly, project ou custom',
  })
  model: string;

  @ApiProperty({
    example: 5000,
    required: false,
  })
  @IsNumber({}, { message: 'Starting price deve ser um número' })
  @IsOptional()
  startingPrice?: number;

  @ApiProperty({
    example: 'BRL',
  })
  @IsString({ message: 'Currency deve ser uma string' })
  currency: string;
}

export class CreateServiceDto {
  @ApiProperty({
    example: 'Desenvolvimento Web',
    description: 'Título do serviço',
  })
  @IsString({ message: 'Título deve ser uma string' })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MaxLength(200, { message: 'Título deve ter no máximo 200 caracteres' })
  title: string;

  @ApiProperty({
    example: 'Criação de sites e aplicações web modernas...',
    description: 'Descrição detalhada do serviço',
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @ApiProperty({
    example: 'Globe',
    description: 'Nome do ícone (Lucide Icons)',
  })
  @IsString({ message: 'Ícone deve ser uma string' })
  @IsNotEmpty({ message: 'Ícone é obrigatório' })
  icon: string;

  @ApiProperty({
    example: ['Sites institucionais', 'E-commerce', 'Landing pages'],
    description: 'Array de características/benefícios',
    type: [String],
  })
  @IsArray({ message: 'Features deve ser um array' })
  @IsString({ each: true, message: 'Cada feature deve ser uma string' })
  @IsNotEmpty({ message: 'Features são obrigatórias' })
  features: string[];

  @ApiProperty({
    description: 'Informações de preço',
    required: false,
    type: PricingDto,
  })
  @ValidateNested()
  @Type(() => PricingDto)
  @IsOptional()
  pricing?: PricingDto;

  @ApiProperty({
    example: 'development',
    description: 'Categoria do serviço',
  })
  @IsString({ message: 'Categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  category: string;

  @ApiProperty({
    example: true,
    description: 'Se está ativo/visível no site',
    default: true,
  })
  @IsBoolean({ message: 'isActive deve ser um boolean' })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Ordem de exibição',
    default: 0,
  })
  @IsNumber({}, { message: 'Order deve ser um número' })
  @IsOptional()
  order?: number;
}
