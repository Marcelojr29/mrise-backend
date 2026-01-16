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
