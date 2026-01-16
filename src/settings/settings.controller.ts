import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { UpdateSocialLinksDto } from './dto/update-social-links.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Configurações')
@Controller('api/settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter configurações da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Configurações obtidas com sucesso',
  })
  async getSettings() {
    const data = await this.settingsService.getSettings();
    return {
      success: true,
      data,
      message: 'Configurações obtidas com sucesso',
    };
  }

  @Put('company')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar informações da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Informações da empresa atualizadas com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  async updateCompanyInfo(@Body() updateCompanyInfoDto: UpdateCompanyInfoDto) {
    const data = await this.settingsService.updateCompanyInfo(
      updateCompanyInfoDto,
    );
    return {
      success: true,
      data,
      message: 'Informações da empresa atualizadas com sucesso',
    };
  }

  @Put('social')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar links das redes sociais' })
  @ApiResponse({
    status: 200,
    description: 'Redes sociais atualizadas com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'URLs inválidas',
  })
  async updateSocialLinks(@Body() updateSocialLinksDto: UpdateSocialLinksDto) {
    const data = await this.settingsService.updateSocialLinks(
      updateSocialLinksDto,
    );
    return {
      success: true,
      data,
      message: 'Redes sociais atualizadas com sucesso',
    };
  }
}
