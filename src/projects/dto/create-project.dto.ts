import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  IsUrl,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'E-commerce Platform',
    description: 'Título do projeto',
  })
  @IsString({ message: 'Título deve ser uma string' })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MaxLength(200, { message: 'Título deve ter no máximo 200 caracteres' })
  title: string;

  @ApiProperty({
    example: 'Plataforma completa de e-commerce...',
    description: 'Descrição detalhada do projeto',
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL da imagem de capa',
  })
  @IsUrl({}, { message: 'Imagem deve ser uma URL válida' })
  @IsNotEmpty({ message: 'Imagem é obrigatória' })
  image: string;

  @ApiProperty({
    example: ['Next.js', 'TypeScript', 'Stripe'],
    description: 'Array de tecnologias utilizadas',
    type: [String],
  })
  @IsArray({ message: 'Tecnologias deve ser um array' })
  @IsString({ each: true, message: 'Cada tecnologia deve ser uma string' })
  @IsNotEmpty({ message: 'Tecnologias são obrigatórias' })
  technologies: string[];

  @ApiProperty({
    example: 'https://example.com',
    description: 'URL do projeto em produção',
    required: false,
  })
  @IsUrl({}, { message: 'URL do projeto deve ser válida' })
  @IsOptional()
  liveUrl?: string;

  @ApiProperty({
    example: 'https://github.com/example/repo',
    description: 'URL do repositório GitHub',
    required: false,
  })
  @IsUrl({}, { message: 'URL do GitHub deve ser válida' })
  @IsOptional()
  githubUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Se é projeto em destaque',
    default: false,
  })
  @IsBoolean({ message: 'Featured deve ser um boolean' })
  @IsOptional()
  featured?: boolean;

  @ApiProperty({
    example: 'web',
    description: 'Categoria do projeto',
    required: false,
  })
  @IsString({ message: 'Categoria deve ser uma string' })
  @IsOptional()
  category?: string;

  @ApiProperty({
    example: 'Tech Corp',
    description: 'Nome do cliente',
    required: false,
  })
  @IsString({ message: 'Nome do cliente deve ser uma string' })
  @IsOptional()
  clientName?: string;

  @ApiProperty({
    example: '2025-12-01T00:00:00Z',
    description: 'Data de conclusão',
    required: false,
  })
  @IsOptional()
  completedAt?: Date;

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
