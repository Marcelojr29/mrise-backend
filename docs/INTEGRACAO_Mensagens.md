# 📧 Documentação de Integração - Mensagens

## Base URL
```
http://localhost:3001/api/messages
```

---

## 📋 Endpoints Disponíveis

### 1. Criar Nova Mensagem (Público - Formulário de Contato)
**POST** `/api/messages`

**Autenticação:** ❌ Não requerida (endpoint público)

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

**Campos Obrigatórios:**
- `name` ✅
- `email` ✅
- `message` ✅

**Campos Opcionais:**
- `phone`
- `company`

**Response (201 - Success):**
```json
{
  "success": true,
  "data": {
    "id": "67889abc123def456789",
    "message": "Mensagem enviada com sucesso"
  },
  "message": "Obrigado pelo contato! Retornaremos em breve."
}
```

**Response (400 - Error):**
```json
{
  "statusCode": 400,
  "message": [
    "Nome é obrigatório",
    "Email inválido",
    "Mensagem é obrigatória"
  ],
  "error": "Bad Request"
}
```

---

### 2. Listar Mensagens (Admin)
**GET** `/api/messages?page=1&pageSize=20&status=nova&search=tech`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `pageSize` (opcional): Itens por página (padrão: 20)
- `status` (opcional): Filtrar por status (`nova`, `lida`, `respondida`)
- `search` (opcional): Buscar em nome, email, empresa ou mensagem

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "67889abc123def456789",
        "name": "João Silva",
        "email": "joao@example.com",
        "phone": "(11) 98765-4321",
        "company": "Tech Solutions",
        "message": "Gostaria de saber mais sobre os serviços de desenvolvimento web.",
        "status": "nova",
        "respondedAt": null,
        "respondedBy": null,
        "notes": null,
        "createdAt": "2026-01-16T10:30:00.000Z",
        "updatedAt": "2026-01-16T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 1,
      "totalItems": 1
    }
  }
}
```

---

### 3. Obter Estatísticas de Mensagens (Admin)
**GET** `/api/messages/stats`

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
    "total": 150,
    "novas": 25,
    "lidas": 50,
    "respondidas": 75,
    "thisMonth": 30,
    "lastMonth": 42
  }
}
```

---

### 4. Obter Mensagem por ID (Admin)
**GET** `/api/messages/:id`

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
    "_id": "67889abc123def456789",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "company": "Tech Solutions",
    "message": "Gostaria de saber mais sobre os serviços de desenvolvimento web.",
    "status": "nova",
    "respondedAt": null,
    "respondedBy": null,
    "notes": null,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 5. Atualizar Mensagem (Admin)
**PATCH** `/api/messages/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "status": "respondida",
  "notes": "Cliente interessado em projeto de e-commerce. Orçamento enviado por email."
}
```

**Campos Atualizáveis:**
- `status`: `nova`, `lida`, `respondida`
- `notes`: Notas internas sobre a mensagem

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "company": "Tech Solutions",
    "message": "Gostaria de saber mais sobre os serviços de desenvolvimento web.",
    "status": "respondida",
    "respondedAt": "2026-01-16T11:00:00.000Z",
    "respondedBy": "67889abc123def456788",
    "notes": "Cliente interessado em projeto de e-commerce. Orçamento enviado por email.",
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T11:00:00.000Z"
  },
  "message": "Mensagem atualizada com sucesso"
}
```

---

### 6. Deletar Mensagem (Admin)
**DELETE** `/api/messages/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Mensagem deletada com sucesso"
}
```

---

## 💻 Exemplos de Integração Frontend

### 1. Formulário de Contato (Público)
```javascript
// Componente de formulário de contato
async function handleSubmit(formData) {
  try {
    const response = await fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message
      })
    });

    const data = await response.json();

    if (data.success) {
      // Mostrar mensagem de sucesso
      alert(data.message);
      // Limpar formulário
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}
```

### 2. Painel Admin - Listar Mensagens
```javascript
async function fetchMessages(page = 1, status = '', search = '') {
  const token = localStorage.getItem('accessToken');
  
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: '20'
  });
  
  if (status) params.append('status', status);
  if (search) params.append('search', search);

  const response = await fetch(`http://localhost:3001/api/messages?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data;
}
```

### 3. Atualizar Status da Mensagem
```javascript
async function updateMessageStatus(messageId, status, notes) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`http://localhost:3001/api/messages/${messageId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status, notes })
  });

  const data = await response.json();
  return data;
}
```

### 4. Dashboard - Obter Estatísticas
```javascript
async function fetchMessageStats() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch('http://localhost:3001/api/messages/stats', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data.data;
  // { total: 150, novas: 25, lidas: 50, respondidas: 75, ... }
}
```

---

## 🎨 Exemplo de UI - Card de Mensagem

```jsx
function MessageCard({ message, onStatusChange }) {
  const statusColors = {
    nova: 'bg-blue-100 text-blue-800',
    lida: 'bg-yellow-100 text-yellow-800',
    respondida: 'bg-green-100 text-green-800'
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold">{message.name}</h3>
        <span className={`px-2 py-1 rounded text-xs ${statusColors[message.status]}`}>
          {message.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">{message.email}</p>
      {message.company && <p className="text-sm text-gray-600">{message.company}</p>}
      <p className="mt-2">{message.message}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onStatusChange(message._id, 'lida')}>
          Marcar como Lida
        </button>
        <button onClick={() => onStatusChange(message._id, 'respondida')}>
          Marcar como Respondida
        </button>
      </div>
    </div>
  );
}
```

---

## ⚠️ Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou campos obrigatórios faltando |
| 401 | Não autorizado (apenas para rotas admin) |
| 404 | Mensagem não encontrada |
| 500 | Erro interno do servidor |

---

## 📝 Notas Importantes

1. **Endpoint Público:** `/api/messages` (POST) é acessível sem autenticação para o formulário de contato
2. **Rotas Admin:** Todas as outras rotas requerem autenticação JWT
3. **Status Automático:** Quando `status` muda para `respondida`, os campos `respondedAt` e `respondedBy` são preenchidos automaticamente
4. **Busca:** O parâmetro `search` busca em `name`, `email`, `company` e `message`
5. **Rate Limiting:** Máximo de 100 requisições por minuto
