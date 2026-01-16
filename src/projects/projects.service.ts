import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    await project.save();
    return this.formatProject(project);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 20,
    featured?: boolean,
    isActive?: boolean,
    category?: string,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;
    const filter: any = {};

    if (featured !== undefined) {
      filter.featured = featured;
    }

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
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const [projects, totalItems] = await Promise.all([
      this.projectModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      this.projectModel.countDocuments(filter),
    ]);

    return {
      projects: projects.map((project) => this.formatProject(project)),
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  }

  async findById(id: string) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return this.formatProject(project);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    Object.assign(project, updateProjectDto);
    await project.save();

    return this.formatProject(project);
  }

  async delete(id: string) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    await this.projectModel.findByIdAndDelete(id);
    return { message: 'Projeto removido com sucesso' };
  }

  private formatProject(project: any) {
    const formatted = project.toObject ? project.toObject() : project;
    return {
      id: formatted._id.toString(),
      title: formatted.title,
      description: formatted.description,
      image: formatted.image,
      technologies: formatted.technologies,
      liveUrl: formatted.liveUrl,
      githubUrl: formatted.githubUrl,
      featured: formatted.featured,
      category: formatted.category,
      clientName: formatted.clientName,
      completedAt: formatted.completedAt,
      isActive: formatted.isActive,
      order: formatted.order,
      createdAt: formatted.createdAt,
      updatedAt: formatted.updatedAt,
    };
  }
}
