# 🔐 Documentação de Integração - Autenticação

## Base URL
```
http://localhost:3001/api/auth
```

---

## 📋 Endpoints Disponíveis

### 1. Login
**POST** `/api/auth/login`

**Autenticação:** Não requerida

**Request Body:**
```json
{
  "email": "marcelo@mrisetech.com",
  "password": "senha123"
}
```

**Response (200 - Success):**
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
      "isActive": true,
      "lastLogin": "2026-01-16T10:35:00.000Z",
      "createdAt": "2026-01-16T10:30:00.000Z",
      "updatedAt": "2026-01-16T10:35:00.000Z"
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

**Response (401 - Error):**
```json
{
  "statusCode": 401,
  "message": "Email ou senha inválidos",
  "error": "Unauthorized"
}
```

---

### 2. Obter Perfil do Usuário Logado
**GET** `/api/auth/me`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "id": "67889abc123def456789",
    "name": "Marcelo",
    "email": "marcelo@mrisetech.com",
    "role": "super_admin",
    "avatar": null,
    "isActive": true,
    "lastLogin": "2026-01-16T10:35:00.000Z",
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:35:00.000Z"
  }
}
```

---

### 3. Logout
**POST** `/api/auth/logout`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

### 4. Atualizar Perfil
**PATCH** `/api/auth/me`

**Autenticação:** ✅ Requerida (Bearer Token)

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

**Response (200 - Success):**
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
    "lastLogin": "2026-01-16T10:35:00.000Z",
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T11:00:00.000Z"
  },
  "message": "Perfil atualizado com sucesso"
}
```

---

## 🔑 Como Usar Autenticação no Frontend

### 1. Fazer Login e Armazenar Token
```javascript
// Login
const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'marcelo@mrisetech.com',
    password: 'senha123'
  })
});

const data = await response.json();

// Armazenar token no localStorage
localStorage.setItem('accessToken', data.data.token.accessToken);
localStorage.setItem('user', JSON.stringify(data.data.user));
```

### 2. Fazer Requisições Autenticadas
```javascript
const token = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:3001/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### 3. Logout
```javascript
const token = localStorage.getItem('accessToken');

await fetch('http://localhost:3001/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Limpar localStorage
localStorage.removeItem('accessToken');
localStorage.removeItem('user');
```

### 4. Atualizar Perfil
```javascript
const token = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:3001/api/auth/me', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Novo Nome',
    password: 'nova_senha' // Opcional
  })
});

const data = await response.json();
```

---

## ⚠️ Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou faltando campos obrigatórios |
| 401 | Não autorizado (credenciais inválidas ou token expirado) |
| 404 | Usuário não encontrado |
| 500 | Erro interno do servidor |

---

## 📝 Notas Importantes

1. **Token JWT:** Expira em 8 horas. Armazene no `localStorage` ou `sessionStorage`
2. **Single User:** Apenas um usuário (você) tem acesso ao sistema
3. **CORS:** Configurado para aceitar requisições de `http://localhost:3000`
4. **Rate Limiting:** Máximo de 100 requisições por minuto
5. **Validação:** Todos os campos são validados automaticamente pelo backend
6. **Criação de Usuário:** Use o comando `npm run seed` para criar o usuário inicial
