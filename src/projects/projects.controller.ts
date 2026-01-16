import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Projetos')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo projeto (admin)' })
  @ApiResponse({ status: 201, description: 'Projeto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectsService.create(createProjectDto);
    return {
      success: true,
      data: project,
      message: 'Projeto criado com sucesso',
    };
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar projetos' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Lista de projetos' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20',
    @Query('featured') featured?: string,
    @Query('isActive') isActive?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.projectsService.findAll(
      parseInt(page),
      parseInt(pageSize),
      featured === 'true' ? true : featured === 'false' ? false : undefined,
      isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      category,
      search,
    );
    return {
      success: true,
      data: result,
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obter projeto por ID' })
  @ApiResponse({ status: 200, description: 'Dados do projeto' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  async findById(@Param('id') id: string) {
    const project = await this.projectsService.findById(id);
    return {
      success: true,
      data: project,
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar projeto (admin)' })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update(id, updateProjectDto);
    return {
      success: true,
      data: project,
      message: 'Projeto atualizado com sucesso',
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover projeto (admin)' })
  @ApiResponse({ status: 200, description: 'Projeto removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  async delete(@Param('id') id: string) {
    await this.projectsService.delete(id);
    return {
      success: true,
      message: 'Projeto removido com sucesso',
    };
  }
}
