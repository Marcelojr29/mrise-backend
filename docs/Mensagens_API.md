# Documentação da API - Mensagens de Contato

## Visão Geral
Esta documentação descreve a estrutura de dados e endpoints para gerenciamento de mensagens recebidas através do formulário de contato do site.

## Modelo de Dados

### Message (Mensagem)
```typescript
interface Message {
  id: string                                    // UUID único da mensagem
  name: string                                  // Nome do remetente
  email: string                                 // Email do remetente
  phone?: string                                // Telefone (opcional)
  company?: string                              // Nome da empresa (opcional)
  message: string                               // Conteúdo da mensagem
  status: "nova" | "lida" | "respondida"       // Status da mensagem
  createdAt: string                             // Data de criação (ISO 8601)
  updatedAt: string                             // Data da última atualização (ISO 8601)
  respondedAt?: string                          // Data da resposta (ISO 8601, opcional)
  respondedBy?: string                          // ID do admin que respondeu (opcional)
  notes?: string                                // Notas internas (opcional)
}
```

### MessageList (Lista Paginada)
```typescript
interface MessageList {
  messages: Message[]       // Array de mensagens
  pagination: {
    page: number           // Página atual
    pageSize: number       // Itens por página
    totalPages: number     // Total de páginas
    totalItems: number     // Total de itens
  }
}
```

### MessageStats (Estatísticas)
```typescript
interface MessageStats {
  total: number          // Total de mensagens
  novas: number          // Mensagens não lidas
  lidas: number          // Mensagens lidas mas não respondidas
  respondidas: number    // Mensagens respondidas
  thisMonth: number      // Mensagens recebidas este mês
  lastMonth: number      // Mensagens recebidas no mês passado
}
```

## Endpoints da API

### 1. Criar Nova Mensagem (Público)
Permite que visitantes do site enviem mensagens de contato.

**Endpoint:** `POST /api/messages`

**Autenticação:** Não requerida

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "company": "Tech Solutions",
  "message": "Gostaria de saber mais sobre os serviços de desenvolvimento web."
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "Mensagem enviada com sucesso"
  },
  "message": "Obrigado pelo contato! Retornaremos em breve."
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": {
      "name": "Nome é obrigatório",
      "email": "Email inválido"
    }
  }
}
```

### 2. Listar Mensagens (Admin)
Lista todas as mensagens com paginação e filtros.

**Endpoint:** `GET /api/messages`

**Autenticação:** Requerida (Bearer Token)

**Query Parameters:**
```
page=1                        // Número da página (padrão: 1)
pageSize=20                   // Itens por página (padrão: 20, max: 100)
status=nova                   // Filtrar por status (opcional)
search=joão                   // Buscar por nome, email ou mensagem (opcional)
sortBy=createdAt             // Ordenar por campo (padrão: createdAt)
sortOrder=desc               // Ordem: asc ou desc (padrão: desc)
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "João Silva",
        "email": "joao@example.com",
        "phone": "(11) 98765-4321",
        "company": "Tech Solutions",
        "message": "Gostaria de saber mais sobre os serviços...",
        "status": "nova",
        "createdAt": "2026-01-13T10:30:00Z",
        "updatedAt": "2026-01-13T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 5,
      "totalItems": 95
    }
  }
}
```

### 3. Obter Mensagem por ID (Admin)
Retorna detalhes de uma mensagem específica.

**Endpoint:** `GET /api/messages/:id`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "company": "Tech Solutions",
    "message": "Gostaria de saber mais sobre os serviços de desenvolvimento web.",
    "status": "lida",
    "createdAt": "2026-01-13T10:30:00Z",
    "updatedAt": "2026-01-13T11:00:00Z",
    "notes": "Cliente interessado em e-commerce"
  }
}
```

### 4. Atualizar Status da Mensagem (Admin)
Atualiza o status de uma mensagem.

**Endpoint:** `PATCH /api/messages/:id/status`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "status": "respondida",
  "notes": "Resposta enviada por email em 13/01/2026"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "respondida",
    "respondedAt": "2026-01-13T12:00:00Z",
    "respondedBy": "admin-user-id"
  },
  "message": "Status atualizado com sucesso"
}
```

### 5. Adicionar Notas à Mensagem (Admin)
Adiciona ou atualiza notas internas de uma mensagem.

**Endpoint:** `PATCH /api/messages/:id/notes`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "notes": "Cliente interessado em projeto de médio porte. Orçamento: R$ 50k"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "notes": "Cliente interessado em projeto de médio porte. Orçamento: R$ 50k"
  },
  "message": "Notas atualizadas com sucesso"
}
```

### 6. Excluir Mensagem (Admin)
Remove permanentemente uma mensagem.

**Endpoint:** `DELETE /api/messages/:id`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Mensagem excluída com sucesso"
}
```

### 7. Obter Estatísticas (Admin)
Retorna estatísticas sobre as mensagens.

**Endpoint:** `GET /api/messages/stats`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "total": 250,
    "novas": 15,
    "lidas": 8,
    "respondidas": 227,
    "thisMonth": 42,
    "lastMonth": 38,
    "growthRate": 10.5
  }
}
```

### 8. Marcar Múltiplas Mensagens (Admin)
Atualiza o status de múltiplas mensagens de uma vez.

**Endpoint:** `POST /api/messages/bulk-update`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "messageIds": [
    "550e8400-e29b-41d4-a716-446655440000",
    "660e8400-e29b-41d4-a716-446655440001"
  ],
  "status": "lida"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "updated": 2,
    "failed": 0
  },
  "message": "2 mensagens atualizadas com sucesso"
}
```

### 9. Exportar Mensagens (Admin)
Exporta mensagens em formato CSV ou JSON.

**Endpoint:** `GET /api/messages/export`

**Autenticação:** Requerida (Bearer Token)

**Query Parameters:**
```
format=csv                    // Formato: csv ou json (padrão: csv)
status=respondida            // Filtrar por status (opcional)
startDate=2026-01-01         // Data inicial (opcional)
endDate=2026-01-31           // Data final (opcional)
```

**Response Success (200):**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="messages_2026-01-13.csv"

id,name,email,phone,company,message,status,createdAt
550e8400...,João Silva,joao@example.com,(11) 98765-4321,Tech Solutions,...,nova,2026-01-13T10:30:00Z
```

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `VALIDATION_ERROR` | Dados de entrada inválidos |
| `MESSAGE_NOT_FOUND` | Mensagem não encontrada |
| `UNAUTHORIZED` | Acesso não autorizado |
| `RATE_LIMIT_EXCEEDED` | Muitas requisições (limite de envio de mensagens) |

## Validações

### Campos Obrigatórios (Criação)
- `name`: 3-100 caracteres
- `email`: Email válido
- `message`: 10-2000 caracteres

### Campos Opcionais
- `phone`: Formato: (XX) XXXXX-XXXX ou similar
- `company`: 2-100 caracteres

## Rate Limiting

### Endpoint Público (POST /api/messages)
- 5 mensagens por IP a cada 15 minutos
- Previne spam e uso abusivo

### Endpoints Admin
- 100 requisições por minuto por token

## Exemplo de Integração (Frontend)

```typescript
// Enviar mensagem do formulário de contato (público)
const sendContactMessage = async (data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response.json();
};

// Listar mensagens (admin)
const listMessages = async (params: {
  page?: number;
  status?: string;
  search?: string;
}) => {
  const token = localStorage.getItem('accessToken');
  const queryString = new URLSearchParams(params as any).toString();
  
  const response = await fetch(`/api/messages?${queryString}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
};

// Atualizar status da mensagem (admin)
const updateMessageStatus = async (
  messageId: string,
  status: 'nova' | 'lida' | 'respondida',
  notes?: string
) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`/api/messages/${messageId}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, notes }),
  });
  
  return response.json();
};
```

## Notificações

### Email de Confirmação (Remetente)
Ao receber uma nova mensagem, enviar email automático ao remetente confirmando o recebimento.

### Notificação para Admins
- Email: Notificar admins quando nova mensagem é recebida
- Dashboard: Badge com contador de mensagens não lidas

## Banco de Dados

### Tabela: messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'nova',
  notes TEXT,
  responded_at TIMESTAMP,
  responded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);
```

## Webhook (Opcional)

### Notificação de Nova Mensagem
Enviar webhook quando uma nova mensagem é recebida para integração com ferramentas externas (Slack, Discord, etc.).

**Payload:**
```json
{
  "event": "message.created",
  "timestamp": "2026-01-13T10:30:00Z",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Gostaria de saber mais..."
  }
}
```
