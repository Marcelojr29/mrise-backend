import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'João Silva Atualizado',
    description: 'Nome completo do usuário',
    required: false,
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'nova_senha_segura',
    description: 'Nova senha do usuário',
    required: false,
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: 'https://example.com/new-avatar.jpg',
    description: 'URL da foto de perfil',
    required: false,
  })
  @IsString({ message: 'Avatar deve ser uma string' })
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    example: 'super_admin',
    description: 'Nível de acesso do usuário',
    enum: ['admin', 'super_admin'],
    required: false,
  })
  @IsEnum(['admin', 'super_admin'], { message: 'Role deve ser admin ou super_admin' })
  @IsOptional()
  role?: string;

  @ApiProperty({
    example: true,
    description: 'Status da conta',
    required: false,
  })
  @IsBoolean({ message: 'isActive deve ser um boolean' })
  @IsOptional()
  isActive?: boolean;
}
