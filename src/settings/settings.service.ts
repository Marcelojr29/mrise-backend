import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { UpdateSocialLinksDto } from './dto/update-social-links.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private settingsModel: Model<SettingsDocument>,
  ) {}

  /**
   * Obtém as configurações do sistema (singleton)
   * Se não existir, cria com valores padrão
   */
  async getSettings(): Promise<any> {
    let settings = await this.settingsModel.findOne();

    if (!settings) {
      // Criar configurações padrão na primeira execução
      settings = await this.settingsModel.create({
        companyInfo: {
          name: 'MRISE TECH',
          email: 'contato@mrisetech.com',
          phone: '(11) 99999-9999',
          address: 'São Paulo, SP - Brasil',
          description: 'Transformando ideias em soluções tecnológicas inovadoras',
        },
        socialLinks: {
          linkedin: '',
          github: '',
          instagram: '',
          twitter: '',
        },
      });
    }

    return settings;
  }

  /**
   * Atualiza as informações da empresa
   */
  async updateCompanyInfo(
    updateCompanyInfoDto: UpdateCompanyInfoDto,
  ): Promise<any> {
    const settings = await this.settingsModel.findOne();

    if (!settings) {
      // Se não existir, criar primeiro com os dados fornecidos
      return await this.settingsModel.create({
        companyInfo: {
          name: updateCompanyInfoDto.name,
          email: updateCompanyInfoDto.email,
          phone: updateCompanyInfoDto.phone,
          address: updateCompanyInfoDto.address,
          description: updateCompanyInfoDto.description,
        },
        socialLinks: {},
      });
    }

    settings.companyInfo = {
      name: updateCompanyInfoDto.name,
      email: updateCompanyInfoDto.email,
      phone: updateCompanyInfoDto.phone,
      address: updateCompanyInfoDto.address,
      description: updateCompanyInfoDto.description,
    };

    await settings.save();
    return settings;
  }

  /**
   * Atualiza os links das redes sociais
   */
  async updateSocialLinks(
    updateSocialLinksDto: UpdateSocialLinksDto,
  ): Promise<any> {
    const settings = await this.settingsModel.findOne();

    if (!settings) {
      // Se não existir, criar primeiro com os dados fornecidos
      return await this.settingsModel.create({
        companyInfo: {
          name: 'MRISE TECH',
          email: 'contato@mrisetech.com',
          phone: '(11) 99999-9999',
          address: 'São Paulo, SP - Brasil',
          description: 'Transformando ideias em soluções tecnológicas inovadoras',
        },
        socialLinks: {
          linkedin: updateSocialLinksDto.linkedin ?? '',
          github: updateSocialLinksDto.github ?? '',
          instagram: updateSocialLinksDto.instagram ?? '',
          twitter: updateSocialLinksDto.twitter ?? '',
        },
      });
    }

    // Atualizar apenas os campos fornecidos
    settings.socialLinks = {
      linkedin: updateSocialLinksDto.linkedin ?? settings.socialLinks.linkedin ?? '',
      github: updateSocialLinksDto.github ?? settings.socialLinks.github ?? '',
      instagram: updateSocialLinksDto.instagram ?? settings.socialLinks.instagram ?? '',
      twitter: updateSocialLinksDto.twitter ?? settings.socialLinks.twitter ?? '',
    };

    await settings.save();
    return settings;
  }
}
