# Documentação da API - Serviços

## Visão Geral
Esta documentação descreve a estrutura de dados e endpoints para gerenciamento de serviços oferecidos pela empresa.

## Modelo de Dados

### Service (Serviço)
```typescript
interface Service {
  id: string                    // UUID único do serviço
  title: string                 // Título do serviço
  description: string           // Descrição detalhada
  icon: string                  // Nome do ícone (Lucide Icons)
  features: string[]            // Array de características/benefícios
  pricing?: {                   // Informações de preço (opcional)
    model: "fixed" | "hourly" | "project" | "custom"
    startingPrice?: number
    currency: string
  }
  category: string              // Categoria do serviço
  isActive: boolean            // Se está ativo/visível no site
  order: number                // Ordem de exibição
  createdAt: string            // Data de criação (ISO 8601)
  updatedAt: string            // Data da última atualização (ISO 8601)
}
```

### ServiceCategory (Categoria de Serviço)
```typescript
interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
}
```

## Endpoints da API

### 1. Listar Serviços (Público/Admin)
**Endpoint:** `GET /api/services`

**Query Parameters (Admin):**
```
page=1
pageSize=20
isActive=true              // Filtrar apenas ativos
category=development       // Filtrar por categoria
search=web                // Buscar no título/descrição
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "service-001",
        "title": "Desenvolvimento Web",
        "description": "Criação de sites e aplicações web modernas...",
        "icon": "Globe",
        "features": [
          "Sites institucionais",
          "E-commerce",
          "Landing pages",
          "Web apps"
        ],
        "pricing": {
          "model": "project",
          "startingPrice": 5000,
          "currency": "BRL"
        },
        "category": "development",
        "isActive": true,
        "order": 1,
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z"
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

### 2. Obter Serviço por ID
**Endpoint:** `GET /api/services/:id`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "service-001",
    "title": "Desenvolvimento Web",
    "description": "Criação de sites e aplicações web modernas, responsivas e otimizadas...",
    "icon": "Globe",
    "features": [
      "Sites institucionais",
      "E-commerce",
      "Landing pages",
      "Web apps",
      "PWA (Progressive Web Apps)"
    ],
    "pricing": {
      "model": "project",
      "startingPrice": 5000,
      "currency": "BRL"
    },
    "category": "development",
    "isActive": true,
    "order": 1,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
}
```

### 3. Criar Serviço (Admin)
**Endpoint:** `POST /api/services`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "title": "Consultoria em Cloud",
  "description": "Serviços de consultoria para migração e otimização de infraestrutura em nuvem",
  "icon": "Cloud",
  "features": [
    "Análise de infraestrutura atual",
    "Planejamento de migração",
    "Implementação",
    "Otimização de custos"
  ],
  "pricing": {
    "model": "hourly",
    "startingPrice": 200,
    "currency": "BRL"
  },
  "category": "consulting",
  "isActive": true
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "service-new-001",
    "title": "Consultoria em Cloud",
    "createdAt": "2026-01-13T12:00:00Z"
  },
  "message": "Serviço criado com sucesso"
}
```

### 4. Atualizar Serviço (Admin)
**Endpoint:** `PUT /api/services/:id`

**Autenticação:** Requerida (Bearer Token)

**Request Body:** (mesma estrutura do POST)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "service-001",
    "updatedAt": "2026-01-13T12:00:00Z"
  },
  "message": "Serviço atualizado com sucesso"
}
```

### 5. Excluir Serviço (Admin)
**Endpoint:** `DELETE /api/services/:id`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Serviço excluído com sucesso"
}
```

### 6. Reordenar Serviços (Admin)
**Endpoint:** `POST /api/services/reorder`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "serviceIds": ["service-003", "service-001", "service-002"]
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Ordem dos serviços atualizada"
}
```

### 7. Listar Categorias de Serviços
**Endpoint:** `GET /api/services/categories`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat-001",
        "name": "Desenvolvimento",
        "slug": "development",
        "description": "Serviços de desenvolvimento de software"
      },
      {
        "id": "cat-002",
        "name": "Consultoria",
        "slug": "consulting",
        "description": "Serviços de consultoria técnica"
      }
    ]
  }
}
```

## Validações

### Campos Obrigatórios
- `title`: 3-150 caracteres
- `description`: 10-1000 caracteres
- `icon`: Nome válido de Lucide Icon
- `features`: Array com pelo menos 1 item
- `category`: String não vazia

### Campos Opcionais
- `pricing`: Objeto com informações de preço
  - `model`: "fixed", "hourly", "project", "custom"
  - `startingPrice`: Número positivo
  - `currency`: Código ISO 4217 (ex: BRL, USD)

## Ícones Disponíveis

Ícones do Lucide Icons: [https://lucide.dev/icons](https://lucide.dev/icons)

Exemplos comuns:
- `Globe` - Web
- `Smartphone` - Mobile
- `Code` - Desenvolvimento
- `Cloud` - Cloud Computing
- `Shield` - Segurança
- `Zap` - Performance
- `Users` - Consultoria
- `Wrench` - Manutenção

## Banco de Dados

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  features TEXT[] NOT NULL,
  pricing_model VARCHAR(20),
  starting_price DECIMAL(10, 2),
  currency VARCHAR(3),
  category VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_services_order ON services(order_index);
```

## Exemplo de Integração (Frontend)

```typescript
// Listar serviços públicos
const getPublicServices = async () => {
  const response = await fetch('/api/services?isActive=true');
  return response.json();
};

// Criar serviço (admin)
const createService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/services', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  });
  
  return response.json();
};

// Atualizar serviço (admin)
const updateService = async (id: string, updates: Partial<Service>) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`/api/services/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  return response.json();
};
```

## Modelos de Preço

### Fixed (Fixo)
Preço fixo por entrega/pacote.

### Hourly (Por Hora)
Cobrança por hora de trabalho.

### Project (Por Projeto)
Valor varia conforme escopo do projeto.

### Custom (Customizado)
Preço a combinar, varia muito por projeto.

## Notas de Implementação

1. **Ícones**: Validar se o nome do ícone existe no Lucide Icons
2. **Categorias**: Criar sistema de categorias dinâmicas
3. **Preços**: Considerar suporte a múltiplas moedas
4. **Cache**: Implementar cache para serviços públicos (melhor performance)
5. **i18n**: Considerar internacionalização para diferentes idiomas
