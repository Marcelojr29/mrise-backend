import { IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty({
    example: 'lida',
    description: 'Status da mensagem',
    enum: ['nova', 'lida', 'respondida'],
    required: false,
  })
  @IsEnum(['nova', 'lida', 'respondida'], { 
    message: 'Status deve ser: nova, lida ou respondida' 
  })
  @IsOptional()
  status?: string;

  @ApiProperty({
    example: 'Cliente interessado em projeto de e-commerce',
    description: 'Notas internas sobre a mensagem',
    required: false,
  })
  @IsString({ message: 'Notas devem ser uma string' })
  @IsOptional()
  notes?: string;
}
