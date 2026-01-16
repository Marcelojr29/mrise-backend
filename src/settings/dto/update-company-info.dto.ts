import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyInfoDto {
  @ApiProperty({
    example: 'MRISE TECH',
    description: 'Nome da empresa',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    example: 'contato@mrisetech.com',
    description: 'Email de contato da empresa',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone de contato',
  })
  @IsString({ message: 'Telefone deve ser uma string' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  phone: string;

  @ApiProperty({
    example: 'São Paulo, SP - Brasil',
    description: 'Endereço da empresa',
  })
  @IsString({ message: 'Endereço deve ser uma string' })
  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  address: string;

  @ApiProperty({
    example: 'Transformando ideias em soluções tecnológicas inovadoras',
    description: 'Descrição da empresa',
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MinLength(10, { message: 'Descrição deve ter no mínimo 10 caracteres' })
  description: string;
}
