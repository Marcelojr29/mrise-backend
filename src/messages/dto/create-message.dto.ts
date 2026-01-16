import { IsEmail, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do remetente',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    example: 'joao@example.com',
    description: 'Email do remetente',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    example: '(11) 98765-4321',
    description: 'Telefone (opcional)',
    required: false,
  })
  @IsString({ message: 'Telefone deve ser uma string' })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'Tech Solutions',
    description: 'Nome da empresa (opcional)',
    required: false,
  })
  @IsString({ message: 'Empresa deve ser uma string' })
  @IsOptional()
  @MaxLength(100, { message: 'Nome da empresa deve ter no máximo 100 caracteres' })
  company?: string;

  @ApiProperty({
    example: 'Gostaria de saber mais sobre os serviços de desenvolvimento web.',
    description: 'Conteúdo da mensagem',
  })
  @IsString({ message: 'Mensagem deve ser uma string' })
  @IsNotEmpty({ message: 'Mensagem é obrigatória' })
  @MaxLength(2000, { message: 'Mensagem deve ter no máximo 2000 caracteres' })
  message: string;
}
