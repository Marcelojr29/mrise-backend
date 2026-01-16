import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsUrl,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyDto {
  @ApiProperty({
    example: 'React',
    description: 'Nome da tecnologia',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    example: 'frontend',
    description: 'Categoria da tecnologia',
    enum: ['frontend', 'backend', 'database', 'devops', 'design', 'mobile'],
  })
  @IsEnum(['frontend', 'backend', 'database', 'devops', 'design', 'mobile'], {
    message: 'Categoria deve ser: frontend, backend, database, devops, design ou mobile',
  })
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  category: string;

  @ApiProperty({
    example: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'URL do ícone/logo',
  })
  @IsUrl({}, { message: 'Ícone deve ser uma URL válida' })
  @IsNotEmpty({ message: 'Ícone é obrigatório' })
  icon: string;

  @ApiProperty({
    example: 'avançado',
    description: 'Nível de conhecimento',
    enum: ['básico', 'intermediário', 'avançado'],
  })
  @IsEnum(['básico', 'intermediário', 'avançado'], {
    message: 'Nível deve ser: básico, intermediário ou avançado',
  })
  @IsNotEmpty({ message: 'Nível é obrigatório' })
  level: string;

  @ApiProperty({
    example: 'Biblioteca JavaScript para construção de interfaces',
    description: 'Descrição breve da tecnologia',
    required: false,
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsOptional()
  @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
  description?: string;

  @ApiProperty({
    example: 5,
    description: 'Anos de experiência',
    required: false,
  })
  @IsNumber({}, { message: 'Anos de experiência deve ser um número' })
  @IsOptional()
  @Min(0, { message: 'Anos de experiência deve ser no mínimo 0' })
  @Max(50, { message: 'Anos de experiência deve ser no máximo 50' })
  yearsOfExperience?: number;

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
