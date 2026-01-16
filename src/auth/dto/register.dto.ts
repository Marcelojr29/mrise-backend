import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty({
    example: 'joao@mrisetech.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário',
    minLength: 6,
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Nível de acesso do usuário',
    enum: ['admin', 'super_admin'],
    default: 'admin',
  })
  @IsEnum(['admin', 'super_admin'], { message: 'Role deve ser admin ou super_admin' })
  @IsOptional()
  role?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL da foto de perfil',
    required: false,
  })
  @IsString({ message: 'Avatar deve ser uma string' })
  @IsOptional()
  avatar?: string;
}
