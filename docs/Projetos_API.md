# Documentação da API - Projetos

## Visão Geral
Esta documentação descreve a estrutura de dados e endpoints para gerenciamento de projetos do portfólio.

## Modelo de Dados

### Project (Projeto)
```typescript
interface Project {
  id: string                    // UUID único do projeto
  title: string                 // Título do projeto
  description: string           // Descrição detalhada
  image: string                 // URL da imagem de capa
  technologies: string[]        // Array de tecnologias utilizadas
  liveUrl?: string             // URL do projeto em produção (opcional)
  githubUrl?: string           // URL do repositório GitHub (opcional)
  featured: boolean            // Se é projeto em destaque
  category?: string            // Categoria (web, mobile, desktop)
  clientName?: string          // Nome do cliente (opcional)
  completedAt?: string         // Data de conclusão (ISO 8601)
  createdAt: string            // Data de criação (ISO 8601)
  updatedAt: string            // Data da última atualização (ISO 8601)
  isActive: boolean            // Se está ativo/visível no site
  order: number                // Ordem de exibição
}
```

## Endpoints da API

### 1. Listar Projetos (Público/Admin)
**Endpoint:** `GET /api/projects`

**Query Parameters (Admin):**
```
page=1
pageSize=20
featured=true              // Filtrar apenas destacados
isActive=true             // Filtrar apenas ativos
category=web              // Filtrar por categoria
search=ecommerce          // Buscar no título/descrição
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "proj-001",
        "title": "E-commerce Platform",
        "description": "Plataforma completa de e-commerce...",
        "image": "https://example.com/image.jpg",
        "technologies": ["Next.js", "TypeScript", "Stripe"],
        "liveUrl": "https://example.com",
        "githubUrl": "https://github.com/example/repo",
        "featured": true,
        "category": "web",
        "completedAt": "2025-12-01T00:00:00Z",
        "createdAt": "2025-11-01T00:00:00Z",
        "updatedAt": "2025-12-01T00:00:00Z",
        "isActive": true,
        "order": 1
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 3,
      "totalItems": 45
    }
  }
}
```

### 2. Obter Projeto por ID
**Endpoint:** `GET /api/projects/:id`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "proj-001",
    "title": "E-commerce Platform",
    "description": "Descrição completa do projeto...",
    "image": "https://example.com/image.jpg",
    "technologies": ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/example/repo",
    "featured": true,
    "category": "web",
    "clientName": "Tech Corp",
    "completedAt": "2025-12-01T00:00:00Z",
    "createdAt": "2025-11-01T00:00:00Z",
    "updatedAt": "2025-12-01T00:00:00Z",
    "isActive": true,
    "order": 1
  }
}
```

### 3. Criar Projeto (Admin)
**Endpoint:** `POST /api/projects`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "title": "Novo Projeto",
  "description": "Descrição do projeto",
  "image": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js"],
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/example/repo",
  "featured": false,
  "category": "web",
  "clientName": "Cliente XYZ",
  "completedAt": "2026-01-10T00:00:00Z",
  "isActive": true
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "proj-new-001",
    "title": "Novo Projeto",
    "createdAt": "2026-01-13T12:00:00Z"
  },
  "message": "Projeto criado com sucesso"
}
```

### 4. Atualizar Projeto (Admin)
**Endpoint:** `PUT /api/projects/:id`

**Autenticação:** Requerida (Bearer Token)

**Request Body:** (mesma estrutura do POST)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "proj-001",
    "updatedAt": "2026-01-13T12:00:00Z"
  },
  "message": "Projeto atualizado com sucesso"
}
```

### 5. Excluir Projeto (Admin)
**Endpoint:** `DELETE /api/projects/:id`

**Autenticação:** Requerida (Bearer Token)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Projeto excluído com sucesso"
}
```

### 6. Reordenar Projetos (Admin)
**Endpoint:** `POST /api/projects/reorder`

**Autenticação:** Requerida (Bearer Token)

**Request Body:**
```json
{
  "projectIds": ["proj-003", "proj-001", "proj-002"]
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Ordem dos projetos atualizada"
}
```

## Validações

### Campos Obrigatórios
- `title`: 3-200 caracteres
- `description`: 10-2000 caracteres
- `image`: URL válida
- `technologies`: Array com pelo menos 1 tecnologia

### Campos Opcionais
- `liveUrl`: URL válida
- `githubUrl`: URL válida do GitHub
- `category`: "web", "mobile", "desktop", "other"
- `clientName`: 2-100 caracteres

## Banco de Dados

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  technologies TEXT[] NOT NULL,
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  category VARCHAR(50),
  client_name VARCHAR(100),
  completed_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_is_active ON projects(is_active);
CREATE INDEX idx_projects_order ON projects(order_index);
```

## Exemplo de Integração (Frontend)

```typescript
// Listar projetos públicos
const getPublicProjects = async () => {
  const response = await fetch('/api/projects?isActive=true');
  return response.json();
};

// Criar projeto (admin)
const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  
  return response.json();
};

// Atualizar projeto (admin)
const updateProject = async (id: string, updates: Partial<Project>) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`/api/projects/${id}`, {
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

## Notas de Implementação

1. **Upload de Imagens**: Integrar com serviço de storage (AWS S3, Cloudinary)
2. **Otimização**: Implementar cache para projetos públicos
3. **SEO**: Gerar sitemap.xml automaticamente com os projetos ativos
4. **Versionamento**: Considerar manter histórico de alterações dos projetos
