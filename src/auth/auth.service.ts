import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuário
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Verificar se está ativo
    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Atualizar último login
    user.lastLogin = new Date();
    await user.save();

    // Gerar token
    const token = await this.generateToken(user);

    return {
      success: true,
      data: {
        user: this.sanitizeUser(user),
        token,
      },
      message: 'Login realizado com sucesso',
    };
  }

  async logout(userId: string) {
    // Apenas retorna sucesso (token será removido no frontend)
    return {
      success: true,
      message: 'Logout realizado com sucesso',
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      success: true,
      data: this.sanitizeUser(user),
    };
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Se estiver atualizando a senha, fazer hash
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Atualizar dados
    Object.assign(user, updateUserDto);
    await user.save();

    return {
      success: true,
      data: this.sanitizeUser(user),
      message: 'Perfil atualizado com sucesso',
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    // Buscar usuário
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar senha atual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Senha atual incorreta');
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha
    user.password = hashedPassword;
    await user.save();

    return {
      success: true,
      data: null,
      message: 'Senha alterada com sucesso',
    };
  }

  private async generateToken(user: UserDocument) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET') || 'your_jwt_secret_key',
      expiresIn: '8h',
    });

    return {
      accessToken,
      expiresIn: 28800, // 8 horas em segundos
      tokenType: 'Bearer',
    };
  }

  private sanitizeUser(user: any) {
    const sanitized = user.toObject ? user.toObject() : user;
    delete sanitized.password;
    delete sanitized.refreshToken;
    
    return {
      id: sanitized._id.toString(),
      name: sanitized.name,
      email: sanitized.email,
      role: sanitized.role,
      avatar: sanitized.avatar,
      isActive: sanitized.isActive,
      lastLogin: sanitized.lastLogin,
      createdAt: sanitized.createdAt,
      updatedAt: sanitized.updatedAt,
    };
  }
}
