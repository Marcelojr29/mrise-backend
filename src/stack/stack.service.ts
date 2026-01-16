import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Technology, TechnologyDocument } from './schemas/technology.schema';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Injectable()
export class StackService {
  constructor(
    @InjectModel(Technology.name)
    private technologyModel: Model<TechnologyDocument>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto) {
    const technology = new this.technologyModel(createTechnologyDto);
    await technology.save();
    return this.formatTechnology(technology);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 50,
    category?: string,
    level?: string,
    isActive?: boolean,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (level) {
      filter.level = level;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [technologies, totalItems] = await Promise.all([
      this.technologyModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      this.technologyModel.countDocuments(filter),
    ]);

    return {
      technologies: technologies.map((tech) => this.formatTechnology(tech)),
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  }

  async findById(id: string) {
    const technology = await this.technologyModel.findById(id);

    if (!technology) {
      throw new NotFoundException('Tecnologia não encontrada');
    }

    return this.formatTechnology(technology);
  }

  async update(id: string, updateTechnologyDto: UpdateTechnologyDto) {
    const technology = await this.technologyModel.findById(id);

    if (!technology) {
      throw new NotFoundException('Tecnologia não encontrada');
    }

    Object.assign(technology, updateTechnologyDto);
    await technology.save();

    return this.formatTechnology(technology);
  }

  async delete(id: string) {
    const technology = await this.technologyModel.findById(id);

    if (!technology) {
      throw new NotFoundException('Tecnologia não encontrada');
    }

    await this.technologyModel.findByIdAndDelete(id);
    return { message: 'Tecnologia removida com sucesso' };
  }

  async getStats() {
    const [
      totalTechnologies,
      frontend,
      backend,
      database,
      devops,
      design,
      mobile,
      basico,
      intermediario,
      avancado,
    ] = await Promise.all([
      this.technologyModel.countDocuments(),
      this.technologyModel.countDocuments({ category: 'frontend' }),
      this.technologyModel.countDocuments({ category: 'backend' }),
      this.technologyModel.countDocuments({ category: 'database' }),
      this.technologyModel.countDocuments({ category: 'devops' }),
      this.technologyModel.countDocuments({ category: 'design' }),
      this.technologyModel.countDocuments({ category: 'mobile' }),
      this.technologyModel.countDocuments({ level: 'básico' }),
      this.technologyModel.countDocuments({ level: 'intermediário' }),
      this.technologyModel.countDocuments({ level: 'avançado' }),
    ]);

    return {
      totalTechnologies,
      byCategory: {
        frontend,
        backend,
        database,
        devops,
        design,
        mobile,
      },
      byLevel: {
        básico: basico,
        intermediário: intermediario,
        avançado: avancado,
      },
    };
  }

  private formatTechnology(technology: any) {
    const formatted = technology.toObject ? technology.toObject() : technology;
    return {
      id: formatted._id.toString(),
      name: formatted.name,
      category: formatted.category,
      icon: formatted.icon,
      level: formatted.level,
      description: formatted.description,
      yearsOfExperience: formatted.yearsOfExperience,
      isActive: formatted.isActive,
      order: formatted.order,
      createdAt: formatted.createdAt,
      updatedAt: formatted.updatedAt,
    };
  }
}
