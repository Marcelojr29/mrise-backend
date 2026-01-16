import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './auth/schemas/user.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<User>>(getModelToken(User.name));

  // Dados do usuário admin (Marcelo)
  const adminData = {
    name: 'Marcelo',
    email: 'marcelo@mrisetech.com',
    password: await bcrypt.hash('senha123', 10), // Alterar para uma senha segura
    role: 'super_admin',
    isActive: true,
  };

  // Verificar se já existe
  const existingUser = await userModel.findOne({ email: adminData.email });

  if (existingUser) {
    console.log('✅ Usuário admin já existe:', existingUser.email);
  } else {
    const user = await userModel.create(adminData);
    console.log('✅ Usuário admin criado com sucesso!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Senha: senha123 (altere depois do primeiro login)');
  }

  await app.close();
}

bootstrap();