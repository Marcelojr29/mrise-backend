# 🎨 Documentação de Integração - Projetos (Portfólio)

## Base URL
```
http://localhost:3001/api/projects
```

---

## 📋 Endpoints Disponíveis

### 1. Criar Novo Projeto (Admin)
**POST** `/api/projects`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "title": "E-commerce Platform",
  "description": "Plataforma completa de e-commerce com integração de pagamentos, gestão de estoque e painel administrativo.",
  "image": "https://example.com/images/ecommerce-project.jpg",
  "technologies": ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
  "liveUrl": "https://example-ecommerce.com",
  "githubUrl": "https://github.com/user/ecommerce-platform",
  "featured": true,
  "category": "web",
  "clientName": "Tech Corp",
  "completedAt": "2025-12-01T00:00:00.000Z",
  "isActive": true,
  "order": 1
}
```

**Campos Obrigatórios:**
- `title` ✅
- `description` ✅
- `image` ✅
- `technologies` ✅ (array de strings)

**Campos Opcionais:**
- `liveUrl`
- `githubUrl`
- `featured` (padrão: false)
- `category`
- `clientName`
- `completedAt`
- `isActive` (padrão: true)
- `order` (padrão: 0)

**Response (201 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "title": "E-commerce Platform",
    "description": "Plataforma completa de e-commerce...",
    "image": "https://example.com/images/ecommerce-project.jpg",
    "technologies": ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    "liveUrl": "https://example-ecommerce.com",
    "githubUrl": "https://github.com/user/ecommerce-platform",
    "featured": true,
    "category": "web",
    "clientName": "Tech Corp",
    "completedAt": "2025-12-01T00:00:00.000Z",
    "isActive": true,
    "order": 1,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  },
  "message": "Projeto criado com sucesso"
}
```

---

### 2. Listar Projetos (Público/Admin)
**GET** `/api/projects?page=1&pageSize=20&featured=true&isActive=true&category=web&search=ecommerce`

**Autenticação:** ❌ Não requerida (público) | ✅ Para filtros avançados (admin)

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `pageSize` (opcional): Itens por página (padrão: 20)
- `featured` (opcional): Filtrar projetos em destaque (true/false)
- `isActive` (opcional): Filtrar projetos ativos (true/false)
- `category` (opcional): Filtrar por categoria (`web`, `mobile`, `desktop`)
- `search` (opcional): Buscar no título e descrição

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "_id": "67889abc123def456789",
        "title": "E-commerce Platform",
        "description": "Plataforma completa de e-commerce...",
        "image": "https://example.com/images/ecommerce-project.jpg",
        "technologies": ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
        "liveUrl": "https://example-ecommerce.com",
        "githubUrl": "https://github.com/user/ecommerce-platform",
        "featured": true,
        "category": "web",
        "clientName": "Tech Corp",
        "completedAt": "2025-12-01T00:00:00.000Z",
        "isActive": true,
        "order": 1,
        "createdAt": "2026-01-16T10:30:00.000Z",
        "updatedAt": "2026-01-16T10:30:00.000Z"
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

---

### 3. Obter Projeto por ID (Público)
**GET** `/api/projects/:id`

**Autenticação:** ❌ Não requerida

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "title": "E-commerce Platform",
    "description": "Plataforma completa de e-commerce com integração de pagamentos...",
    "image": "https://example.com/images/ecommerce-project.jpg",
    "technologies": ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    "liveUrl": "https://example-ecommerce.com",
    "githubUrl": "https://github.com/user/ecommerce-platform",
    "featured": true,
    "category": "web",
    "clientName": "Tech Corp",
    "completedAt": "2025-12-01T00:00:00.000Z",
    "isActive": true,
    "order": 1,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 4. Atualizar Projeto (Admin)
**PATCH** `/api/projects/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body (todos os campos opcionais):**
```json
{
  "title": "E-commerce Platform v2",
  "featured": false,
  "isActive": true,
  "order": 2
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "title": "E-commerce Platform v2",
    "description": "Plataforma completa de e-commerce...",
    "featured": false,
    "isActive": true,
    "order": 2,
    "updatedAt": "2026-01-16T11:00:00.000Z"
  },
  "message": "Projeto atualizado com sucesso"
}
```

---

### 5. Deletar Projeto (Admin)
**DELETE** `/api/projects/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Projeto deletado com sucesso"
}
```

---

## 💻 Exemplos de Integração Frontend

### 1. Página de Portfólio (Público)
```javascript
// Listar todos os projetos ativos
async function fetchProjects() {
  const response = await fetch('http://localhost:3001/api/projects?isActive=true&pageSize=100', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data.data.projects;
}
```

### 2. Projetos em Destaque na Homepage
```javascript
// Buscar apenas projetos em destaque
async function fetchFeaturedProjects() {
  const response = await fetch('http://localhost:3001/api/projects?featured=true&isActive=true', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data.data.projects;
}
```

### 3. Página de Detalhes do Projeto
```javascript
// Obter detalhes de um projeto específico
async function fetchProjectDetails(projectId) {
  const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data.data;
}
```

### 4. Painel Admin - Criar Projeto
```javascript
async function createProject(projectData) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch('http://localhost:3001/api/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });

  const data = await response.json();
  return data;
}
```

### 5. Filtrar Projetos por Categoria
```javascript
async function fetchProjectsByCategory(category) {
  const response = await fetch(`http://localhost:3001/api/projects?category=${category}&isActive=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data.data.projects;
}
```

---

## 🎨 Exemplo de Componente React

```jsx
function ProjectCard({ project }) {
  return (
    <div className="project-card rounded-lg overflow-hidden shadow-lg">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ver Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🗂️ Categorias Sugeridas

- `web` - Aplicações Web
- `mobile` - Aplicativos Mobile
- `desktop` - Aplicações Desktop
- `ecommerce` - E-commerce
- `dashboard` - Dashboards/Painéis
- `api` - APIs/Backend

---

## ⚠️ Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou campos obrigatórios faltando |
| 401 | Não autorizado (apenas para rotas admin) |
| 404 | Projeto não encontrado |
| 500 | Erro interno do servidor |

---

## 📝 Notas Importantes

1. **Endpoints Públicos:** `GET /api/projects` e `GET /api/projects/:id` são acessíveis sem autenticação
2. **Rotas Admin:** POST, PATCH e DELETE requerem autenticação JWT
3. **Ordenação:** Projetos são retornados ordenados pelo campo `order` (crescente) e depois por data de criação
4. **Imagens:** Armazene as imagens em um serviço externo (Cloudinary, AWS S3, etc.) e salve apenas a URL
5. **Featured:** Marque projetos como `featured: true` para exibi-los em destaque na homepage
