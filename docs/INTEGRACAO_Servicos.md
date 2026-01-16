# 🛠️ Documentação de Integração - Serviços

## Base URL
```
http://localhost:3001/api/services
```

---

## 📋 Endpoints Disponíveis

### 1. Criar Novo Serviço (Admin)
**POST** `/api/services`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "title": "Desenvolvimento Web",
  "description": "Criação de sites e aplicações web modernas, responsivas e otimizadas para SEO.",
  "icon": "Globe",
  "features": [
    "Sites institucionais",
    "E-commerce completo",
    "Landing pages de alta conversão",
    "Web apps personalizadas",
    "Otimização SEO"
  ],
  "pricing": {
    "model": "project",
    "startingPrice": 5000,
    "currency": "BRL"
  },
  "category": "development",
  "isActive": true,
  "order": 1
}
```

**Campos Obrigatórios:**
- `title` ✅
- `description` ✅
- `icon` ✅
- `features` ✅ (array de strings)

**Campos Opcionais:**
- `pricing` (objeto com model, startingPrice, currency)
- `category`
- `isActive` (padrão: true)
- `order` (padrão: 0)

**Pricing Models:**
- `fixed` - Preço fixo
- `hourly` - Por hora
- `project` - Por projeto
- `custom` - Sob consulta

**Response (201 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "title": "Desenvolvimento Web",
    "description": "Criação de sites e aplicações web modernas...",
    "icon": "Globe",
    "features": [
      "Sites institucionais",
      "E-commerce completo",
      "Landing pages de alta conversão",
      "Web apps personalizadas",
      "Otimização SEO"
    ],
    "pricing": {
      "model": "project",
      "startingPrice": 5000,
      "currency": "BRL"
    },
    "category": "development",
    "isActive": true,
    "order": 1,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  },
  "message": "Serviço criado com sucesso"
}
```

---

### 2. Listar Serviços (Público/Admin)
**GET** `/api/services?page=1&pageSize=20&isActive=true&category=development&search=web`

**Autenticação:** ❌ Não requerida (público) | ✅ Para filtros avançados (admin)

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `pageSize` (opcional): Itens por página (padrão: 20)
- `isActive` (opcional): Filtrar serviços ativos (true/false)
- `category` (opcional): Filtrar por categoria
- `search` (opcional): Buscar no título e descrição

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "_id": "67889abc123def456789",
        "title": "Desenvolvimento Web",
        "description": "Criação de sites e aplicações web modernas...",
        "icon": "Globe",
        "features": [
          "Sites institucionais",
          "E-commerce completo",
          "Landing pages de alta conversão",
          "Web apps personalizadas",
          "Otimização SEO"
        ],
        "pricing": {
          "model": "project",
          "startingPrice": 5000,
          "currency": "BRL"
        },
        "category": "development",
        "isActive": true,
        "order": 1,
        "createdAt": "2026-01-16T10:30:00.000Z",
        "updatedAt": "2026-01-16T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 1,
      "totalItems": 12
    }
  }
}
```

---

### 3. Obter Serviço por ID (Público)
**GET** `/api/services/:id`

**Autenticação:** ❌ Não requerida

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "title": "Desenvolvimento Web",
    "description": "Criação de sites e aplicações web modernas, responsivas e otimizadas para SEO.",
    "icon": "Globe",
    "features": [
      "Sites institucionais",
      "E-commerce completo",
      "Landing pages de alta conversão",
      "Web apps personalizadas",
      "Otimização SEO"
    ],
    "pricing": {
      "model": "project",
      "startingPrice": 5000,
      "currency": "BRL"
    },
    "category": "development",
    "isActive": true,
    "order": 1,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 4. Atualizar Serviço (Admin)
**PATCH** `/api/services/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body (todos os campos opcionais):**
```json
{
  "title": "Desenvolvimento Web Completo",
  "pricing": {
    "model": "project",
    "startingPrice": 6000,
    "currency": "BRL"
  },
  "isActive": true,
  "order": 1
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "title": "Desenvolvimento Web Completo",
    "description": "Criação de sites e aplicações web modernas...",
    "pricing": {
      "model": "project",
      "startingPrice": 6000,
      "currency": "BRL"
    },
    "updatedAt": "2026-01-16T11:00:00.000Z"
  },
  "message": "Serviço atualizado com sucesso"
}
```

---

### 5. Deletar Serviço (Admin)
**DELETE** `/api/services/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Serviço deletado com sucesso"
}
```

---

## 💻 Exemplos de Integração Frontend

### 1. Página de Serviços (Público)
```javascript
// Listar todos os serviços ativos
async function fetchServices() {
  const response = await fetch('http://localhost:3001/api/services?isActive=true', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data.data.services;
}
```

### 2. Componente de Card de Serviço
```jsx
function ServiceCard({ service }) {
  // Mapeamento de ícones (usando Lucide React)
  const iconMap = {
    Globe: <Globe size={48} />,
    Smartphone: <Smartphone size={48} />,
    Database: <Database size={48} />,
    Cloud: <Cloud size={48} />,
    // ... adicionar mais ícones conforme necessário
  };

  return (
    <div className="service-card p-6 border rounded-lg shadow-lg">
      <div className="icon mb-4 text-blue-600">
        {iconMap[service.icon]}
      </div>
      
      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      {/* Features */}
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Pricing */}
      {service.pricing && (
        <div className="border-t pt-4">
          <p className="text-lg font-semibold">
            {service.pricing.model === 'custom' ? (
              'Sob consulta'
            ) : (
              <>
                A partir de {' '}
                <span className="text-blue-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: service.pricing.currency
                  }).format(service.pricing.startingPrice)}
                </span>
              </>
            )}
          </p>
        </div>
      )}

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Solicitar Orçamento
      </button>
    </div>
  );
}
```

### 3. Painel Admin - Criar Serviço
```javascript
async function createService(serviceData) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch('http://localhost:3001/api/services', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(serviceData)
  });

  const data = await response.json();
  return data;
}
```

### 4. Formulário de Criação de Serviço
```jsx
function ServiceForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Globe',
    features: [''],
    pricing: {
      model: 'project',
      startingPrice: 0,
      currency: 'BRL'
    },
    category: 'development',
    isActive: true,
    order: 0
  });

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields... */}
    </form>
  );
}
```

---

## 🎨 Ícones Disponíveis (Lucide Icons)

Aqui estão alguns ícones sugeridos para usar no campo `icon`:

| Ícone | Uso Sugerido |
|-------|--------------|
| `Globe` | Desenvolvimento Web |
| `Smartphone` | Desenvolvimento Mobile |
| `Database` | Backend/APIs |
| `Cloud` | Cloud/DevOps |
| `Search` | SEO/Marketing |
| `Palette` | Design/UI/UX |
| `ShoppingCart` | E-commerce |
| `Layout` | Landing Pages |
| `Code` | Desenvolvimento Custom |
| `Settings` | Manutenção/Suporte |
| `Shield` | Segurança |
| `Zap` | Performance |

**Instalação:**
```bash
npm install lucide-react
```

**Uso:**
```jsx
import { Globe, Smartphone, Database } from 'lucide-react';

<Globe size={48} className="text-blue-600" />
```

---

## 📊 Categorias Sugeridas

- `development` - Desenvolvimento
- `design` - Design
- `marketing` - Marketing
- `consulting` - Consultoria
- `maintenance` - Manutenção
- `support` - Suporte

---

## 💰 Modelos de Precificação

```javascript
const pricingModels = {
  fixed: 'Preço Fixo',
  hourly: 'Por Hora',
  project: 'Por Projeto',
  custom: 'Sob Consulta'
};
```

---

## ⚠️ Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou campos obrigatórios faltando |
| 401 | Não autorizado (apenas para rotas admin) |
| 404 | Serviço não encontrado |
| 500 | Erro interno do servidor |

---

## 📝 Notas Importantes

1. **Endpoints Públicos:** `GET /api/services` e `GET /api/services/:id` são acessíveis sem autenticação
2. **Rotas Admin:** POST, PATCH e DELETE requerem autenticação JWT
3. **Ordenação:** Serviços são retornados ordenados pelo campo `order` (crescente)
4. **Ícones:** Use nomes de ícones do Lucide Icons (https://lucide.dev)
5. **Features:** Adicione features em formato de lista para destacar os benefícios do serviço
6. **Pricing:** O objeto pricing é opcional - se não fornecido, não exibe informações de preço
