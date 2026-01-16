# Documentação da API - Autenticação

## Visão Geral
Esta documentação descreve a estrutura de dados e endpoints necessários para implementar a autenticação do sistema administrativo.

**IMPORTANTE:** Este é um sistema **single-user** (usuário único). Apenas Marcelo tem acesso ao sistema. Não há funcionalidade de registro de novos usuários.

## Modelo de Dados

### User (Usuário Admin)
```typescript
interface User {
  id: string                    // UUID único do usuário
  name: string                  // Nome completo do administrador
  email: string                 // Email (usado para login)
  password: string              // Senha hash (bcrypt)
  role: "super_admin"           // Nível de acesso (sempre super_admin)
  avatar?: string               // URL da foto de perfil (opcional)
  createdAt: string             // Data de criação (ISO 8601)
  updatedAt: string             // Data da última atualização (ISO 8601)
  lastLogin?: string            // Data do último login (ISO 8601)
  isActive: boolean             // Status da conta (sempre true)
}
```

### AuthToken
```typescript
interface AuthToken {
  accessToken: string     // JWT token de acesso
  expiresIn: number       // Tempo de expiração em segundos (28800 = 8h)
  tokenType: "Bearer"     // Tipo do token
}
```

### LoginCredentials
```typescript
interface LoginCredentials {
  email: string     // Email do usuário
  password: string  // Senha em texto plano (será enviada via HTTPS)
}
```

## Endpoints da API

### 1. Login
Autentica um usuário e retorna tokens de acesso.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "marcelo@mrisetech.com",
  "password": "senha123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "67889abc123def456789",
      "name": "Marcelo",
      "email": "marcelo@mrisetech.com",
      "role": "super_admin",
      "avatar": null,
      "lastLogin": "2026-01-16T10:35:00Z",
      "isActive": true,
      "createdAt": "2026-01-16T10:30:00Z",
      "updatedAt": "2026-01-16T10:35:00Z"
    },
    "token": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 28800,
      "tokenType": "Bearer"
    }
  },
  "message": "Login realizado com sucesso"
}
```

**Response Error (401):**
```json
{
  "statusCode": 401,
  "message": "Email ou senha inválidos",
  "error": "Unauthorized"
}
```

### 2. Logout
Invalida o token atual do usuário.

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

### 3. Obter Perfil do Usuário Logado
Retorna informações do usuário autenticado.

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Administrador",
    "email": "admin@mrisetech.com",
    "role": "admin",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "lastLogin": "2026-01-13T10:30:00Z"
  }
}
```

### 6. Atualizar Senha
Permite que o usuário autenticado altere sua senha.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body (todos os campos opcionais):**
```json
{
  "name": "Marcelo Silva",
  "password": "nova_senha_segura",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "67889abc123def456789",
    "name": "Marcelo Silva",
    "email": "marcelo@mrisetech.com",
    "role": "super_admin",
    "avatar": "https://example.com/new-avatar.jpg",
    "isActive": true,
    "lastLogin": "2026-01-16T10:35:00Z",
    "createdAt": "2026-01-16T10:30:00Z",
    "updatedAt": "2026-01-16T11:00:00Z"
  },
  "message": "Perfil atualizado com sucesso"
}
```

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou faltando campos obrigatórios |
| 401 | Não autorizado (credenciais inválidas ou token expirado) |
| 404 | Usuário não encontrado |
| 500 | Erro interno do servidor |

## Segurança

### Headers Obrigatórios
Todas as requisições autenticadas devem incluir:
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### JWT Payload
```typescript
interface JWTPayload {
  userId: string        // ID do usuário
  email: string         // Email do usuário
  role: string          // Papel do usuário (sempre "super_admin")
  iat: number          // Issued at (timestamp)
  exp: number          // Expiration (timestamp - 8h após emissão)
}
```

### Token Expiration
- **Access Token:** 8 horas (28800 segundos)
- Não há refresh token neste sistema
- Após expiração, é necessário fazer login novamente

### Requisitos de Senha
- Mínimo de 8 caracteres
- Recomendado: combinação de letras, números e caracteres especiais

## Exemplo de Integração (Frontend)

```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Salvar token no localStorage ou cookie seguro
    localStorage.setItem('accessToken', data.data.token.accessToken);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    return data.data.user;
  }
  
  throw new Error(data.message);
};

// Requisição autenticada
const fetchProtectedData = async () => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/protected-endpoint', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response.json();
};
```

## Notas de Implementação

1. **Sistema Single-User**: Este é um sistema de usuário único (Marcelo apenas)
2. **Armazenamento de Senha**: bcrypt com salt rounds = 10
3. **Token Expiration**: AccessToken: 8 horas (28800 segundos)
4. **HTTPS**: Todas as requisições devem usar HTTPS em produção
5. **Rate Limiting**: Configurado para 100 requisições por minuto
6. **CORS**: Configurado para aceitar requisições de `http://localhost:3000`
7. **Criação de Usuário**: Use o comando `npm run seed` para criar o usuário inicial
