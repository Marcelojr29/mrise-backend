3# 📚 Guia Completo de Integração - MRISE TECH API

## 🚀 Informações Gerais

### Base URL
```
http://localhost:3001
```

### Documentação Swagger
```
http://localhost:3001/api/docs
```

---

## 📋 Módulos Disponíveis

| Módulo | Endpoint Base | Documentação |
|--------|---------------|--------------|
| Autenticação | `/api/auth` | [INTEGRACAO_Autenticacao.md](./INTEGRACAO_Autenticacao.md) |
| Mensagens | `/api/messages` | [INTEGRACAO_Mensagens.md](./INTEGRACAO_Mensagens.md) |
| Projetos | `/api/projects` | [INTEGRACAO_Projetos.md](./INTEGRACAO_Projetos.md) |
| Serviços | `/api/services` | [INTEGRACAO_Servicos.md](./INTEGRACAO_Servicos.md) |
| Stack | `/api/stack` | [INTEGRACAO_Stack.md](./INTEGRACAO_Stack.md) |

---

## 🔐 Autenticação

### Como Funciona

A API usa **JWT (JSON Web Tokens)** para autenticação. Após fazer login, você receberá um `accessToken` que deve ser incluído no header de todas as requisições protegidas.

### Fluxo de Autenticação

```javascript
// 1. Fazer Login
const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'marcelo@mrisetech.com',
    password: 'senha123'
  })
});

const { data } = await loginResponse.json();

// 2. Armazenar Token
localStorage.setItem('accessToken', data.token.accessToken);
localStorage.setItem('user', JSON.stringify(data.user));

// 3. Usar Token nas Requisições
const response = await fetch('http://localhost:3001/api/projects', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(projectData)
});
```

### Endpoints Públicos vs Protegidos

#### ✅ Endpoints Públicos (sem autenticação)
- `POST /api/messages` - Formulário de contato
- `GET /api/projects` - Listar projetos
- `GET /api/projects/:id` - Detalhes do projeto
- `GET /api/services` - Listar serviços
- `GET /api/services/:id` - Detalhes do serviço
- `GET /api/stack` - Listar tecnologias
- `GET /api/stack/:id` - Detalhes da tecnologia
- `GET /api/stack/stats` - Estatísticas

#### 🔒 Endpoints Protegidos (requerem autenticação)
- Todos os endpoints de **criação** (POST)
- Todos os endpoints de **atualização** (PATCH)
- Todos os endpoints de **exclusão** (DELETE)
- Endpoints administrativos de usuários
- Gerenciamento de mensagens

---

## 🛠️ Configuração no Frontend

### 1. Variáveis de Ambiente

Crie um arquivo `.env` ou `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Serviço de API (exemplo com Axios)

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Hook de Autenticação (React)

```javascript
// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await api.get('/api/auth/me');
          setUser(response.data.data);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { user, token } = response.data.data;
    
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    
    return user;
  };

  const logout = async () => {
    await api.post('/api/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## 📦 Estrutura de Resposta Padrão

### Sucesso

```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Erro

```json
{
  "statusCode": 400,
  "message": "Mensagem de erro" ou ["Array", "de", "erros"],
  "error": "Bad Request"
}
```

---

## ⚠️ Códigos de Status HTTP

| Código | Significado | Quando Ocorre |
|--------|-------------|---------------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos ou faltando |
| 401 | Unauthorized | Token inválido ou expirado |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Conflito (ex: email já cadastrado) |
| 500 | Internal Server Error | Erro no servidor |

---

## 🔄 Rate Limiting

A API possui **rate limiting** configurado para prevenir abuso:

- **Limite:** 100 requisições por minuto por IP
- **Header de Resposta:** `X-RateLimit-Remaining`

Se exceder o limite, receberá erro **429 Too Many Requests**.

---

## 🌐 CORS

O CORS está configurado para aceitar requisições de:

```
http://localhost:3000
```

Para produção, atualize a variável `CORS_ORIGIN` no arquivo `.env`:

```env
CORS_ORIGIN=https://seu-frontend.com
```

---

## 📊 Paginação

Endpoints que retornam listas suportam paginação:

**Query Parameters:**
- `page` - Número da página (padrão: 1)
- `pageSize` - Itens por página (padrão: 20)

**Resposta:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 5,
      "totalItems": 100
    }
  }
}
```

---

## 🔍 Busca e Filtros

### Mensagens
```
GET /api/messages?status=nova&search=contato
```

### Projetos
```
GET /api/projects?featured=true&category=web&search=ecommerce
```

### Serviços
```
GET /api/services?category=development&isActive=true
```

### Stack
```
GET /api/stack?category=frontend&level=avançado
```

---

## 🧪 Testando a API

### 1. Usando o Swagger UI
Acesse: http://localhost:3001/api/docs

### 2. Usando cURL

```bash
# Criar mensagem (público)
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Teste de mensagem"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mrisetech.com",
    "password": "senha123"
  }'

# Listar projetos (autenticado)
curl -X GET http://localhost:3001/api/projects \
  -H "Authorization: Bearer {seu_token_aqui}"
```

### 3. Usando Postman

Importe a coleção do Swagger:
1. Abra o Postman
2. File > Import
3. Cole a URL: `http://localhost:3001/api/docs-json`

---

## 🚨 Tratamento de Erros

### Exemplo Completo

```javascript
async function handleApiCall() {
  try {
    const response = await api.post('/api/projects', projectData);
    
    // Sucesso
    if (response.data.success) {
      console.log('Projeto criado:', response.data.data);
      return response.data.data;
    }
  } catch (error) {
    // Erro de validação (400)
    if (error.response?.status === 400) {
      const errors = error.response.data.message;
      console.error('Erros de validação:', errors);
      // Mostrar erros no formulário
    }
    
    // Não autorizado (401)
    else if (error.response?.status === 401) {
      console.error('Token inválido ou expirado');
      // Redirecionar para login
    }
    
    // Recurso não encontrado (404)
    else if (error.response?.status === 404) {
      console.error('Recurso não encontrado');
    }
    
    // Erro do servidor (500)
    else if (error.response?.status === 500) {
      console.error('Erro no servidor');
      // Mostrar mensagem genérica ao usuário
    }
    
    // Erro de rede
    else if (!error.response) {
      console.error('Erro de conexão com o servidor');
    }
  }
}
```

---

## 📝 Checklist de Integração

### Frontend

- [ ] Configurar variáveis de ambiente
- [ ] Criar serviço de API (Axios/Fetch)
- [ ] Implementar interceptors para token
- [ ] Criar hook de autenticação
- [ ] Implementar tratamento de erros
- [ ] Configurar proteção de rotas
- [ ] Testar fluxo de login/logout
- [ ] Implementar refresh token (futuro)

### Testes

- [ ] Testar endpoints públicos
- [ ] Testar autenticação
- [ ] Testar CRUD de cada módulo
- [ ] Testar validações
- [ ] Testar paginação
- [ ] Testar filtros e busca
- [ ] Testar tratamento de erros

---

## 🔗 Links Úteis

- **API Local:** http://localhost:3001
- **Swagger Docs:** http://localhost:3001/api/docs
- **Swagger JSON:** http://localhost:3001/api/docs-json
- **DevIcon (ícones):** https://devicon.dev
- **Lucide Icons:** https://lucide.dev

---

## 💡 Dicas de Performance

1. **Cache de Dados Públicos:** Use cache (React Query, SWR) para dados que não mudam frequentemente
2. **Debounce em Buscas:** Implemente debounce para evitar requisições desnecessárias
3. **Lazy Loading:** Carregue dados sob demanda com paginação
4. **Otimização de Imagens:** Use CDN e formatos otimizados (WebP)
5. **Prefetch:** Faça prefetch de dados que o usuário provavelmente acessará

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
1. Documentação do Swagger: http://localhost:3001/api/docs
2. Logs do servidor no terminal
3. Console do navegador para erros de rede

---

## 🎉 Próximos Passos

1. ✅ Implementar refresh token
2. ✅ Upload de imagens (Cloudinary/AWS S3)
3. ✅ Envio de emails (nodemailer)
4. ✅ Websockets para notificações em tempo real
5. ✅ Testes automatizados (Jest)
6. ✅ Deploy (Railway, Render, Vercel)
