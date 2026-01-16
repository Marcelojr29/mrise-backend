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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Serviços')
@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo serviço (admin)' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createServiceDto: CreateServiceDto) {
    const service = await this.servicesService.create(createServiceDto);
    return {
      success: true,
      data: service,
      message: 'Serviço criado com sucesso',
    };
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar serviços' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Lista de serviços' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20',
    @Query('isActive') isActive?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.servicesService.findAll(
      parseInt(page),
      parseInt(pageSize),
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
  @ApiOperation({ summary: 'Obter serviço por ID' })
  @ApiResponse({ status: 200, description: 'Dados do serviço' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async findById(@Param('id') id: string) {
    const service = await this.servicesService.findById(id);
    return {
      success: true,
      data: service,
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar serviço (admin)' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const service = await this.servicesService.update(id, updateServiceDto);
    return {
      success: true,
      data: service,
      message: 'Serviço atualizado com sucesso',
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover serviço (admin)' })
  @ApiResponse({ status: 200, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async delete(@Param('id') id: string) {
    await this.servicesService.delete(id);
    return {
      success: true,
      message: 'Serviço removido com sucesso',
    };
  }
}
