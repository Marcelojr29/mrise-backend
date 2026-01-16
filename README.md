# 🚀 MRISE TECH - Backend API

Backend do portfólio profissional desenvolvido com Node.js, Nest.js, MongoDB e TypeScript.

## 📋 Descrição

API RESTful completa para gerenciamento de portfólio profissional com autenticação JWT, incluindo:
- 🔐 Sistema de autenticação single-user (apenas Marcelo)
- 💼 Gerenciamento de projetos do portfólio
- 🛠️ Gerenciamento de serviços oferecidos
- 💻 Stack de tecnologias
- 📧 Sistema de mensagens/contato
- 📚 Documentação Swagger automática

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Nest.js** v11.0.1 - Framework backend
- **MongoDB Atlas** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **Swagger** - Documentação da API
- **TypeScript** - Tipagem estática
- **bcryptjs** - Criptografia de senhas

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
├── auth/                    # Módulo de autenticação
│   ├── dto/                # Data Transfer Objects (validação)
│   ├── guards/             # Guards JWT para rotas protegidas
│   ├── schemas/            # Schema Mongoose (User)
│   ├── strategies/         # Estratégia Passport JWT
│   ├── auth.controller.ts  # Endpoints de autenticação
│   ├── auth.service.ts     # Lógica de negócio
│   └── auth.module.ts      # Configuração do módulo
│
├── messages/               # Módulo de mensagens/contato
│   ├── dto/               # DTOs de validação
│   ├── schemas/           # Schema Mongoose (Message)
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   └── messages.module.ts
│
├── projects/              # Módulo de projetos do portfólio
│   ├── dto/              # DTOs de validação
│   ├── schemas/          # Schema Mongoose (Project)
│   ├── projects.controller.ts
│   ├── projects.service.ts
│   └── projects.module.ts
│
├── services/             # Módulo de serviços oferecidos
│   ├── dto/             # DTOs de validação
│   ├── schemas/         # Schema Mongoose (Service)
│   ├── services.controller.ts
│   ├── services.service.ts
│   └── services.module.ts
│
├── stack/               # Módulo de tecnologias/stack
│   ├── dto/            # DTOs de validação
│   ├── schemas/        # Schema Mongoose (Technology)
│   ├── stack.controller.ts
│   ├── stack.service.ts
│   └── stack.module.ts
│
├── settings/           # Módulo de configurações da empresa
│   ├── dto/           # DTOs de validação
│   ├── schemas/       # Schema Mongoose (Settings)
│   ├── settings.controller.ts
│   ├── settings.service.ts
│   └── settings.module.ts
│
├── app.module.ts      # Módulo raiz (importa todos os módulos)
└── main.ts           # Entry point da aplicação
```

### Fluxo Arquitetural

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Frontend)                       │
│                    React/Next.js/Angular                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP Request
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEST.JS APPLICATION                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    MIDDLEWARE LAYER                         │ │
│  │  • CORS (permite requisições do frontend)                  │ │
│  │  • Helmet (segurança HTTP headers)                         │ │
│  │  • Rate Limiting (100 req/min)                             │ │
│  │  • Global Validation Pipe (class-validator)                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│                           ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    ROUTES (Controllers)                     │ │
│  │                                                              │ │
│  │  /api/auth      → AuthController                           │ │
│  │  /api/messages  → MessagesController                       │ │
│  │  /api/projects  → ProjectsController                       │ │
│  │  /api/services  → ServicesController                       │ │
│  │  /api/stack     → StackController                          │ │
│  │  /api/settings  → SettingsController                       │ │
│  │                                                              │ │
│  │  [Decorators: @Get, @Post, @Put, @Patch, @Delete]         │ │
│  │  [Guards: JwtAuthGuard para rotas protegidas]             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│                           ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   VALIDATION (DTOs)                         │ │
│  │                                                              │ │
│  │  • class-validator: valida tipos e formatos               │ │
│  │  • class-transformer: transforma dados                     │ │
│  │  • Retorna erro 400 se validação falhar                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│                           ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │               BUSINESS LOGIC (Services)                     │ │
│  │                                                              │ │
│  │  • AuthService: login, JWT, hash senhas                   │ │
│  │  • MessagesService: CRUD mensagens                         │ │
│  │  • ProjectsService: CRUD projetos                          │ │
│  │  • ServicesService: CRUD serviços                          │ │
│  │  • StackService: CRUD tecnologias                          │ │
│  │  • SettingsService: CRUD configurações (singleton)        │ │
│  │                                                              │ │
│  │  [Injeção de Dependências via @Injectable()]              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│                           ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  DATA ACCESS (Mongoose)                     │ │
│  │                                                              │ │
│  │  • Schemas: User, Message, Project, Service, Technology,   │ │
│  │    Settings                                                 │ │
│  │  • Model<Document>: métodos find, create, update, delete  │ │
│  │  • Validações no schema level                              │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │ MongoDB Driver
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MONGODB ATLAS                              │
│                                                                   │
│  Collections:                                                    │
│  • users (autenticação single-user)                            │
│  • messages (formulário de contato)                            │
│  • projects (portfólio de projetos)                            │
│  • services (serviços oferecidos)                              │
│  • technologies (stack tecnológica)                            │
│  • settings (configurações da empresa - singleton)             │
└─────────────────────────────────────────────────────────────────┘
```

### Camadas da Aplicação

#### 1️⃣ **Controllers** (Camada de Apresentação)
- Recebem requisições HTTP
- Aplicam decorators (@Get, @Post, etc)
- Validam autenticação com Guards (@UseGuards(JwtAuthGuard))
- Retornam respostas padronizadas
```typescript
@Controller('api/projects')
@ApiTags('Projetos')
export class ProjectsController {
  @Get()
  async findAll() { ... }
}
```

#### 2️⃣ **DTOs** (Data Transfer Objects)
- Definem estrutura de dados esperada
- Validação automática com decorators
- Documentação Swagger automática
```typescript
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
```

#### 3️⃣ **Services** (Camada de Negócio)
- Contém lógica de negócio
- Interage com banco de dados
- Reutilizável entre controllers
```typescript
@Injectable()
export class ProjectsService {
  async create(dto: CreateProjectDto) {
    return this.projectModel.create(dto);
  }
}
```

#### 4️⃣ **Schemas** (Camada de Dados)
- Define estrutura do documento MongoDB
- Validações no nível do banco
- Relacionamentos entre coleções
```typescript
@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;
}
```

#### 5️⃣ **Modules** (Organização)
- Agrupa controller, service e schemas
- Gerencia dependências
- Exporta para uso em outros módulos
```typescript
@Module({
  imports: [MongooseModule.forFeature([...])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
```

### Fluxo de Autenticação JWT

```
1. Login (POST /api/auth/login)
   ↓
2. AuthController recebe email e senha
   ↓
3. AuthService valida credenciais
   ↓
4. Se válido: gera JWT token (8h expiração)
   ↓
5. Retorna { user, token } para cliente
   ↓
6. Cliente armazena token (localStorage)
   ↓
7. Requisições futuras incluem: Authorization: Bearer {token}
   ↓
8. JwtAuthGuard verifica token antes de acessar rota
   ↓
9. Se válido: req.user = payload decodificado
   ↓
10. Controller acessa dados do usuário via req.user
```

### Padrão de Resposta

Todas as rotas seguem um padrão consistente:

**Sucesso:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

**Erro:**
```json
{
  "statusCode": 400,
  "message": "Descrição do erro",
  "error": "Bad Request"
}
```

### Principais Design Patterns Utilizados

1. **Dependency Injection** - Nest.js injeta dependências automaticamente
2. **Repository Pattern** - Services abstraem acesso ao banco
3. **DTO Pattern** - Validação e transformação de dados
4. **Guard Pattern** - Proteção de rotas com JwtAuthGuard
5. **Module Pattern** - Organização modular do código
6. **Singleton Pattern** - Settings (apenas 1 documento)

## 📦 Instalação

```bash
# Clonar repositório
git clone <repository-url>

# Instalar dependências
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=3001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRES_IN=8h

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🗄️ Seed do Banco de Dados

Para criar o usuário admin inicial (Marcelo):

```bash
npm run seed
```

**Credenciais padrão:**
- Email: `marcelo@mrisetech.com`
- Senha: `senha123` (altere após o primeiro login)

## 🚀 Executar o Projeto

```bash
# Desenvolvimento (watch mode)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

O servidor estará rodando em: `http://localhost:3001`

## 📚 Documentação

### Swagger UI
Acesse a documentação interativa da API:
```
http://localhost:3001/api/docs
```

### Documentação de Integração
Consulte os arquivos em `/docs`:
- [README_INTEGRACAO.md](./docs/README_INTEGRACAO.md) - Guia completo
- [INTEGRACAO_Autenticacao.md](./docs/INTEGRACAO_Autenticacao.md) - Autenticação
- [INTEGRACAO_Projetos.md](./docs/INTEGRACAO_Projetos.md) - Projetos
- [INTEGRACAO_Servicos.md](./docs/INTEGRACAO_Servicos.md) - Serviços
- [INTEGRACAO_Stack.md](./docs/INTEGRACAO_Stack.md) - Tecnologias
- [INTEGRACAO_Mensagens.md](./docs/INTEGRACAO_Mensagens.md) - Mensagens

## 🔐 Autenticação

Sistema single-user com JWT:

```bash
# Login
POST /api/auth/login
{
  "email": "marcelo@mrisetech.com",
  "password": "senha123"
}

# Resposta
{
  "success": true,
  "data": {
    "user": { ... },
    "token": {
      "accessToken": "eyJhbGc...",
      "expiresIn": 28800,
      "tokenType": "Bearer"
    }
  }
}
```

**Endpoints disponíveis:**
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout (protegido)
- `GET /api/auth/me` - Perfil do usuário (protegido)
- `PATCH /api/auth/me` - Atualizar perfil (protegido)

## 📡 Módulos da API

### 1. Autenticação (`/api/auth`)
- Login/Logout
- Perfil do usuário
- Atualização de dados

### 2. Projetos (`/api/projects`)
- CRUD completo de projetos
- Upload de imagens
- Filtros e paginação

### 3. Serviços (`/api/services`)
- CRUD de serviços oferecidos
- Categorização
- Ordenação

### 4. Stack (`/api/stack`)
- CRUD de tecnologias
- Categorias (Frontend, Backend, etc.)
- Estatísticas

### 5. Mensagens (`/api/messages`)
- Recebimento de mensagens (público)
- Gerenciamento de mensagens (protegido)
- Status (lida/não lida)

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## 🔒 Segurança

- ✅ JWT com expiração de 8 horas
- ✅ Senhas criptografadas com bcrypt
- ✅ Rate limiting (100 req/min)
- ✅ Helmet para headers de segurança
- ✅ CORS configurado
- ✅ Validação de dados com class-validator

## 📝 Scripts Disponíveis

```bash
npm run start:dev      # Desenvolvimento com hot-reload
npm run build          # Build de produção
npm run start:prod     # Executar em produção
npm run seed           # Popular banco com usuário inicial
npm run lint           # Verificar código
npm run format         # Formatar código
```

## 🌐 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente no servidor
2. Execute `npm run build`
3. Inicie com `npm run start:prod`
4. Configure HTTPS (recomendado: Nginx como proxy reverso)

## 📞 Contato

**Desenvolvido por:** Marcelo - MRISE TECH
**Email:** marcelo@mrisetech.com

## 📄 Licença

[MIT licensed](LICENSE)
