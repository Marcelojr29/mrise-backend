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
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Mensagens')
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova mensagem (público)' })
  @ApiResponse({ status: 201, description: 'Mensagem criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createMessageDto: CreateMessageDto) {
    const result = await this.messagesService.create(createMessageDto);
    return {
      success: true,
      data: result,
      message: 'Obrigado pelo contato! Retornaremos em breve.',
    };
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar mensagens (admin)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 20 })
  @ApiQuery({ name: 'status', required: false, enum: ['nova', 'lida', 'respondida'] })
  @ApiQuery({ name: 'search', required: false, description: 'Busca por nome, email, empresa ou mensagem' })
  @ApiResponse({ status: 200, description: 'Lista de mensagens' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20',
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.messagesService.findAll(
      parseInt(page),
      parseInt(pageSize),
      status,
      search,
    );
    return {
      success: true,
      data: result,
    };
  }

  @Get('stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas de mensagens (admin)' })
  @ApiResponse({ status: 200, description: 'Estatísticas de mensagens' })
  async getStats() {
    const stats = await this.messagesService.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter mensagem por ID (admin)' })
  @ApiResponse({ status: 200, description: 'Dados da mensagem' })
  @ApiResponse({ status: 404, description: 'Mensagem não encontrada' })
  async findById(@Param('id') id: string) {
    const message = await this.messagesService.findById(id);
    return {
      success: true,
      data: message,
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar mensagem (admin)' })
  @ApiResponse({ status: 200, description: 'Mensagem atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Mensagem não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @CurrentUser('userId') userId: string,
  ) {
    const message = await this.messagesService.update(id, updateMessageDto, userId);
    return {
      success: true,
      data: message,
      message: 'Mensagem atualizada com sucesso',
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover mensagem (admin)' })
  @ApiResponse({ status: 200, description: 'Mensagem removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Mensagem não encontrada' })
  async delete(@Param('id') id: string) {
    await this.messagesService.delete(id);
    return {
      success: true,
      message: 'Mensagem removida com sucesso',
    };
  }
}
