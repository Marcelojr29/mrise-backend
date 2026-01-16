# Documentação da API - Stack Tecnológica

## Visão Geral
Esta documentação descreve a estrutura de dados e endpoints para gerenciamento das tecnologias utilizadas pela empresa.

## Modelo de Dados

### Technology (Tecnologia)
```typescript
interface Technology {
  id: string                                                        // UUID único da tecnologia
  name: string                                                      // Nome da tecnologia
  category: "frontend" | "backend" | "database" | "devops" | "design" | "mobile"  // Categoria
  icon: string                                                      // URL do ícone/logo
  level: "básico" | "intermediário" | "avançado"                   // Nível de conhecimento
  description?: string                                              // Descrição breve (opcional)
  yearsOfExperience?: number                                        // Anos de experiência (opcional)
  isActive: boolean                                                 // Se está ativo/visível no site
  order: number                                                     // Ordem de exibição
  createdAt: string                                                 // Data de criação (ISO 8601)
  updatedAt: string                                                 // Data da última atualização (ISO 8601)
}
```

### TechnologyStats (Estatísticas)
```typescript
interface TechnologyStats {
  totalTechnologies: number
  byCategory: {
    frontend: number
    backend: number
    database: number
    devops: number
    design: number
    mobile: number
  }
  byLevel: {
    básico: number
    intermediário: number
    avançado: number
  }
}
```

## Endpoints da API

### 1. Listar Tecnologias (Público/Admin)
**Endpoint:** `GET /api/stack`

**Query Parameters:**
```
page=1
pageSize=50
category=frontend          // Filtrar por categoria
level=avançado            // Filtrar por nível
isActive=true             // Filtrar apenas ativas
search=react              // Buscar por nome
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "technologies": [
      {
        "id": "tech-001",
        "name": "React",
        "category": "frontend",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "level": "avançado",
        "description": "Biblioteca JavaScript para construção de interfaces",
        "yearsOfExperience": 5,
        "isActive": true,
        "order": 1,
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z"
      },
      {
        "id": "tech-002",
        "name": "Node.js",
        "category": "backend",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "level": "avançado",
        "description": "Runtime JavaScript para servidor",
        "yearsOfExperience": 4,
        "isActive": true,
        "order": 2,
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "totalPages": 1,
      "totalItems": 24
    }
  }
}
```

### 2. Listar Tecnologias por Categoria (Público)
**Endpoint:** `GET /api/stack/by-category`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "frontend": [
      {
        "id": "tech-001",
        "name": "React",
        "icon": "https://...",
        "level": "avançado"
      },
      {
        "id": "tech-002",
        "name": "Vue.js",
        "icon": "https://...",
        "level": "intermediário"
      }
    ],
    "backend": [
      {
        "id": "tech-003",
        "name": "Node.js",
        "icon": "https://...",
        "level": "avançado"
      }
    ],
    "database": [...],
    "devops": [...],
    "design": [...],
    "mobile": [...]
  }
}
```

### 3. Obter Tecnologia por ID
**Endpoint:** `GET /api/stack/:id`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "tech-001",
    "name": "React",
    "category": "frontend",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "level": "avançado",
    "description": "Biblioteca JavaScript para construção de interfaces de usuário",
    "yearsOfExperience": 5,
    "isActive": true,
    "order": 1,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
}
```

### 4. Criar Tecnologia (Admin)
**Endpoint:** `POST /api/stack`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "name": "TypeScript",
  "category": "frontend",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "level": "avançado",
  "description": "Superset tipado de JavaScript",
  "yearsOfExperience": 4,
  "isActive": true
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "tech-new-001",
    "name": "TypeScript",
    "createdAt": "2026-01-13T12:00:00Z"
  },
  "message": "Tecnologia adicionada com sucesso"
}
```

### 5. Atualizar Tecnologia (Admin)
**Endpoint:** `PUT /api/stack/:id`

**Autenticação:** Requerida (Bearer Token)

**Request Body:** (mesma estrutura do POST, todos campos opcionais)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "tech-001",
    "updatedAt": "2026-01-13T12:00:00Z"
  },
  "message": "Tecnologia atualizada com sucesso"
}
```

### 6. Excluir Tecnologia (Admin)
**Endpoint:** `DELETE /api/stack/:id`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Tecnologia excluída com sucesso"
}
```

### 7. Reordenar Tecnologias (Admin)
Atualiza a ordem de exibição das tecnologias.

**Endpoint:** `POST /api/stack/reorder`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "technologyIds": ["tech-003", "tech-001", "tech-002"]
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Ordem das tecnologias atualizada"
}
```

### 8. Obter Estatísticas (Admin)
**Endpoint:** `GET /api/stack/stats`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "totalTechnologies": 24,
    "byCategory": {
      "frontend": 8,
      "backend": 6,
      "database": 4,
      "devops": 3,
      "design": 2,
      "mobile": 1
    },
    "byLevel": {
      "básico": 3,
      "intermediário": 8,
      "avançado": 13
    }
  }
}
```

## Validações

### Campos Obrigatórios
- `name`: 2-100 caracteres
- `category`: Um dos valores permitidos
- `icon`: URL válida
- `level`: Um dos valores permitidos

### Campos Opcionais
- `description`: Máximo 500 caracteres
- `yearsOfExperience`: Número entre 0 e 50

## Categorias Disponíveis

| Categoria | Descrição |
|-----------|-----------|
| `frontend` | Tecnologias de interface (React, Vue, etc) |
| `backend` | Tecnologias de servidor (Node.js, Python, etc) |
| `database` | Bancos de dados (PostgreSQL, MongoDB, etc) |
| `devops` | Ferramentas DevOps (Docker, Kubernetes, etc) |
| `design` | Ferramentas de design (Figma, Adobe XD, etc) |
| `mobile` | Tecnologias mobile (React Native, Flutter, etc) |

## Níveis de Conhecimento

| Nível | Descrição |
|-------|-----------|
| `básico` | Conhecimento inicial, uso esporádico |
| `intermediário` | Conhecimento sólido, uso regular |
| `avançado` | Domínio completo, expertise |

## Banco de Dados

```sql
CREATE TABLE technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  icon VARCHAR(500) NOT NULL,
  level VARCHAR(20) NOT NULL,
  description VARCHAR(500),
  years_of_experience INTEGER,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_technologies_category ON technologies(category);
CREATE INDEX idx_technologies_level ON technologies(level);
CREATE INDEX idx_technologies_is_active ON technologies(is_active);
CREATE INDEX idx_technologies_order ON technologies(order_index);
CREATE UNIQUE INDEX idx_technologies_name ON technologies(LOWER(name));
```

## Fontes de Ícones Recomendadas

### DevIcons (Recomendado)
```
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech}/{tech}-original.svg

Exemplos:
- React: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
- Node.js: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg
- Python: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg
```

### Simples Icons
```
https://cdn.simpleicons.org/{tech}

Exemplos:
- https://cdn.simpleicons.org/react
- https://cdn.simpleicons.org/nodejs
```

## Exemplo de Integração (Frontend)

```typescript
// Listar tecnologias por categoria (público)
const getTechnologiesByCategory = async () => {
  const response = await fetch('/api/stack/by-category');
  return response.json();
};

// Adicionar tecnologia (admin)
const addTechnology = async (techData: Omit<Technology, 'id' | 'createdAt' | 'updatedAt'>) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/stack', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(techData),
  });
  
  return response.json();
};

// Atualizar tecnologia (admin)
const updateTechnology = async (id: string, updates: Partial<Technology>) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`/api/stack/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  return response.json();
};

// Reordenar tecnologias (admin)
const reorderTechnologies = async (technologyIds: string[]) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/stack/reorder', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ technologyIds }),
  });
  
  return response.json();
};
```

## Display Frontend

### Agrupamento por Categoria
No frontend, exibir tecnologias agrupadas por categoria:

```tsx
<section>
  <h3>Frontend</h3>
  <div className="tech-grid">
    {frontendTechs.map(tech => (
      <TechCard
        key={tech.id}
        name={tech.name}
        icon={tech.icon}
        level={tech.level}
      />
    ))}
  </div>
</section>
```

### Badge de Nível
Usar cores diferentes para cada nível:
- Básico: Azul
- Intermediário: Amarelo
- Avançado: Verde

## Notas de Implementação

1. **Cache**: Implementar cache agressivo para tecnologias públicas (raramente mudam)
2. **CDN**: Usar CDN para servir ícones (performance)
3. **Fallback**: Ter ícone padrão caso URL falhe
4. **Validação**: Validar se URL do ícone retorna imagem válida
5. **Ordenação**: Permitir drag-and-drop para reordenação no admin
6. **Import/Export**: Considerar funcionalidade de importar lista de tecnologias via CSV/JSON
