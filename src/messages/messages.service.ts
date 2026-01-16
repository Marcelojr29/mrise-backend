import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel({
      ...createMessageDto,
      status: 'nova',
    });

    await message.save();

    return {
      id: message._id.toString(),
      message: 'Mensagem enviada com sucesso',
    };
  }

  async findAll(
    page: number = 1,
    pageSize: number = 20,
    status?: string,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const [messages, totalItems] = await Promise.all([
      this.messageModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .populate('respondedBy', 'name email'),
      this.messageModel.countDocuments(filter),
    ]);

    return {
      messages: messages.map((msg) => this.formatMessage(msg)),
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  }

  async findById(id: string) {
    const message = await this.messageModel
      .findById(id)
      .populate('respondedBy', 'name email');

    if (!message) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    return this.formatMessage(message);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto, userId?: string) {
    const message = await this.messageModel.findById(id);

    if (!message) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    if (updateMessageDto.status === 'respondida' && !message.respondedAt) {
      message.respondedAt = new Date();
      if (userId) {
        message.respondedBy = userId as any;
      }
    }

    Object.assign(message, updateMessageDto);
    await message.save();

    return this.formatMessage(message);
  }

  async delete(id: string) {
    const message = await this.messageModel.findById(id);

    if (!message) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    await this.messageModel.findByIdAndDelete(id);
    return { message: 'Mensagem removida com sucesso' };
  }

  async getStats() {
    const [total, novas, lidas, respondidas, thisMonth, lastMonth] = await Promise.all([
      this.messageModel.countDocuments(),
      this.messageModel.countDocuments({ status: 'nova' }),
      this.messageModel.countDocuments({ status: 'lida' }),
      this.messageModel.countDocuments({ status: 'respondida' }),
      this.messageModel.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }),
      this.messageModel.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }),
    ]);

    return {
      total,
      novas,
      lidas,
      respondidas,
      thisMonth,
      lastMonth,
    };
  }

  private formatMessage(message: any) {
    const formatted = message.toObject ? message.toObject() : message;
    return {
      id: formatted._id.toString(),
      name: formatted.name,
      email: formatted.email,
      phone: formatted.phone,
      company: formatted.company,
      message: formatted.message,
      status: formatted.status,
      respondedAt: formatted.respondedAt,
      respondedBy: formatted.respondedBy,
      notes: formatted.notes,
      createdAt: formatted.createdAt,
      updatedAt: formatted.updatedAt,
    };
  }
}
