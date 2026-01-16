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
import { StackService } from './stack.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Stack Tecnológica')
@Controller('api/stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova tecnologia (admin)' })
  @ApiResponse({ status: 201, description: 'Tecnologia criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createTechnologyDto: CreateTechnologyDto) {
    const technology = await this.stackService.create(createTechnologyDto);
    return {
      success: true,
      data: technology,
      message: 'Tecnologia criada com sucesso',
    };
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar tecnologias' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 50 })
  @ApiQuery({
    name: 'category',
    required: false,
    enum: ['frontend', 'backend', 'database', 'devops', 'design', 'mobile'],
  })
  @ApiQuery({
    name: 'level',
    required: false,
    enum: ['básico', 'intermediário', 'avançado'],
  })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Lista de tecnologias' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '50',
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('isActive') isActive?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.stackService.findAll(
      parseInt(page),
      parseInt(pageSize),
      category,
      level,
      isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      search,
    );
    return {
      success: true,
      data: result,
    };
  }

  @Public()
  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas de tecnologias' })
  @ApiResponse({ status: 200, description: 'Estatísticas de tecnologias' })
  async getStats() {
    const stats = await this.stackService.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obter tecnologia por ID' })
  @ApiResponse({ status: 200, description: 'Dados da tecnologia' })
  @ApiResponse({ status: 404, description: 'Tecnologia não encontrada' })
  async findById(@Param('id') id: string) {
    const technology = await this.stackService.findById(id);
    return {
      success: true,
      data: technology,
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar tecnologia (admin)' })
  @ApiResponse({ status: 200, description: 'Tecnologia atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tecnologia não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    const technology = await this.stackService.update(id, updateTechnologyDto);
    return {
      success: true,
      data: technology,
      message: 'Tecnologia atualizada com sucesso',
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover tecnologia (admin)' })
  @ApiResponse({ status: 200, description: 'Tecnologia removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Tecnologia não encontrada' })
  async delete(@Param('id') id: string) {
    await this.stackService.delete(id);
    return {
      success: true,
      message: 'Tecnologia removida com sucesso',
    };
  }
}
