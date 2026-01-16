import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSocialLinksDto {
  @ApiProperty({
    example: 'https://linkedin.com/company/mrisetech',
    description: 'Link do LinkedIn',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'LinkedIn deve ser uma URL válida' })
  linkedin?: string;

  @ApiProperty({
    example: 'https://github.com/mrisetech',
    description: 'Link do GitHub',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'GitHub deve ser uma URL válida' })
  github?: string;

  @ApiProperty({
    example: 'https://instagram.com/mrisetech',
    description: 'Link do Instagram',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Instagram deve ser uma URL válida' })
  instagram?: string;

  @ApiProperty({
    example: 'https://twitter.com/mrisetech',
    description: 'Link do Twitter',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Twitter deve ser uma URL válida' })
  twitter?: string;
}
