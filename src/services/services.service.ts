import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = new this.serviceModel(createServiceDto);
    await service.save();
    return this.formatService(service);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 20,
    isActive?: boolean,
    category?: string,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;
    const filter: any = {};

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const [services, totalItems] = await Promise.all([
      this.serviceModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      this.serviceModel.countDocuments(filter),
    ]);

    return {
      services: services.map((service) => this.formatService(service)),
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  }

  async findById(id: string) {
    const service = await this.serviceModel.findById(id);

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.formatService(service);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceModel.findById(id);

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    Object.assign(service, updateServiceDto);
    await service.save();

    return this.formatService(service);
  }

  async delete(id: string) {
    const service = await this.serviceModel.findById(id);

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    await this.serviceModel.findByIdAndDelete(id);
    return { message: 'Serviço removido com sucesso' };
  }

  private formatService(service: any) {
    const formatted = service.toObject ? service.toObject() : service;
    return {
      id: formatted._id.toString(),
      title: formatted.title,
      description: formatted.description,
      icon: formatted.icon,
      features: formatted.features,
      pricing: formatted.pricing,
      category: formatted.category,
      isActive: formatted.isActive,
      order: formatted.order,
      createdAt: formatted.createdAt,
      updatedAt: formatted.updatedAt,
    };
  }
}
