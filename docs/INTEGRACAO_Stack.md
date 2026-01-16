# ⚡ Documentação de Integração - Stack Tecnológica

## Base URL
```
http://localhost:3001/api/stack
```

---

## 📋 Endpoints Disponíveis

### 1. Criar Nova Tecnologia (Admin)
**POST** `/api/stack`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "name": "React",
  "category": "frontend",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "level": "avançado",
  "description": "Biblioteca JavaScript para construção de interfaces de usuário modernas e reativas",
  "yearsOfExperience": 5,
  "isActive": true,
  "order": 1
}
```

**Campos Obrigatórios:**
- `name` ✅
- `category` ✅ (`frontend`, `backend`, `database`, `devops`, `design`, `mobile`)
- `icon` ✅
- `level` ✅ (`básico`, `intermediário`, `avançado`)

**Campos Opcionais:**
- `description`
- `yearsOfExperience`
- `isActive` (padrão: true)
- `order` (padrão: 0)

**Response (201 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "name": "React",
    "category": "frontend",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "level": "avançado",
    "description": "Biblioteca JavaScript para construção de interfaces de usuário modernas e reativas",
    "yearsOfExperience": 5,
    "isActive": true,
    "order": 1,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  },
  "message": "Tecnologia criada com sucesso"
}
```

---

### 2. Listar Tecnologias (Público/Admin)
**GET** `/api/stack?page=1&pageSize=50&category=frontend&level=avançado&isActive=true&search=react`

**Autenticação:** ❌ Não requerida (público) | ✅ Para filtros avançados (admin)

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `pageSize` (opcional): Itens por página (padrão: 50)
- `category` (opcional): Filtrar por categoria
- `level` (opcional): Filtrar por nível
- `isActive` (opcional): Filtrar tecnologias ativas (true/false)
- `search` (opcional): Buscar por nome

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "technologies": [
      {
        "_id": "67889abc123def456789",
        "name": "React",
        "category": "frontend",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "level": "avançado",
        "description": "Biblioteca JavaScript para construção de interfaces",
        "yearsOfExperience": 5,
        "isActive": true,
        "order": 1,
        "createdAt": "2026-01-16T10:30:00.000Z",
        "updatedAt": "2026-01-16T10:30:00.000Z"
      },
      {
        "_id": "67889abc123def456790",
        "name": "Node.js",
        "category": "backend",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "level": "avançado",
        "description": "Runtime JavaScript para servidor",
        "yearsOfExperience": 4,
        "isActive": true,
        "order": 2,
        "createdAt": "2026-01-16T10:31:00.000Z",
        "updatedAt": "2026-01-16T10:31:00.000Z"
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

---

### 3. Obter Estatísticas (Público)
**GET** `/api/stack/stats`

**Autenticação:** ❌ Não requerida

**Response (200 - Success):**
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

---

### 4. Obter Tecnologia por ID (Público)
**GET** `/api/stack/:id`

**Autenticação:** ❌ Não requerida

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "name": "React",
    "category": "frontend",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "level": "avançado",
    "description": "Biblioteca JavaScript para construção de interfaces de usuário modernas e reativas",
    "yearsOfExperience": 5,
    "isActive": true,
    "order": 1,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 5. Atualizar Tecnologia (Admin)
**PATCH** `/api/stack/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body (todos os campos opcionais):**
```json
{
  "level": "expert",
  "yearsOfExperience": 6,
  "isActive": true
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "67889abc123def456789",
    "name": "React",
    "level": "expert",
    "yearsOfExperience": 6,
    "updatedAt": "2026-01-16T11:00:00.000Z"
  },
  "message": "Tecnologia atualizada com sucesso"
}
```

---

### 6. Deletar Tecnologia (Admin)
**DELETE** `/api/stack/:id`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Tecnologia deletada com sucesso"
}
```

---

## 💻 Exemplos de Integração Frontend

### 1. Página de Stack Tecnológica (Público)
```javascript
// Listar todas as tecnologias agrupadas por categoria
async function fetchTechnologies() {
  const response = await fetch('http://localhost:3001/api/stack?isActive=true&pageSize=100', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  
  // Agrupar por categoria
  const grouped = data.data.technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});

  return grouped;
}
```

### 2. Componente de Grade de Tecnologias
```jsx
function TechStack() {
  const [technologies, setTechnologies] = useState({});
  
  useEffect(() => {
    fetchTechnologies().then(setTechnologies);
  }, []);

  const categoryTitles = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Banco de Dados',
    devops: 'DevOps',
    design: 'Design',
    mobile: 'Mobile'
  };

  return (
    <div className="tech-stack">
      {Object.entries(technologies).map(([category, techs]) => (
        <div key={category} className="category-section mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {categoryTitles[category]}
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {techs.map(tech => (
              <TechCard key={tech._id} tech={tech} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 3. Card de Tecnologia
```jsx
function TechCard({ tech }) {
  const levelColors = {
    'básico': 'border-green-300 bg-green-50',
    'intermediário': 'border-yellow-300 bg-yellow-50',
    'avançado': 'border-blue-300 bg-blue-50'
  };

  return (
    <div 
      className={`tech-card p-4 rounded-lg border-2 ${levelColors[tech.level]} 
                  hover:shadow-lg transition-all cursor-pointer`}
      title={tech.description}
    >
      <img 
        src={tech.icon} 
        alt={tech.name}
        className="w-12 h-12 mx-auto mb-2"
      />
      <p className="text-center text-sm font-semibold">{tech.name}</p>
      {tech.yearsOfExperience && (
        <p className="text-center text-xs text-gray-600 mt-1">
          {tech.yearsOfExperience} anos
        </p>
      )}
    </div>
  );
}
```

### 4. Dashboard com Estatísticas
```jsx
function StackDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const response = await fetch('http://localhost:3001/api/stack/stats');
    const data = await response.json();
    setStats(data.data);
  }

  if (!stats) return <div>Carregando...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="stat-card p-6 bg-blue-100 rounded-lg">
        <h3 className="text-3xl font-bold">{stats.totalTechnologies}</h3>
        <p className="text-gray-600">Total de Tecnologias</p>
      </div>
      
      <div className="stat-card p-6 bg-green-100 rounded-lg">
        <h3 className="text-3xl font-bold">{stats.byLevel.avançado}</h3>
        <p className="text-gray-600">Nível Avançado</p>
      </div>
      
      <div className="stat-card p-6 bg-purple-100 rounded-lg">
        <h3 className="text-3xl font-bold">{stats.byCategory.frontend}</h3>
        <p className="text-gray-600">Frontend</p>
      </div>
    </div>
  );
}
```

### 5. Filtrar por Categoria
```javascript
async function fetchTechnologiesByCategory(category) {
  const response = await fetch(
    `http://localhost:3001/api/stack?category=${category}&isActive=true`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const data = await response.json();
  return data.data.technologies;
}
```

---

## 🎨 Ícones de Tecnologias

Use o **DevIcon CDN** para ícones de tecnologias:

```
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech}/{tech}-{variant}.svg
```

**Exemplos:**
```
React: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
Node.js: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg
TypeScript: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg
Python: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg
MongoDB: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg
PostgreSQL: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg
Docker: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg
AWS: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg
```

**Variantes:**
- `original` - Ícone original colorido
- `plain` - Ícone simples monocromático
- `line` - Ícone em linha

**Explorar mais:** https://devicon.dev

---

## 📊 Categorias Disponíveis

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| `frontend` | Tecnologias de frontend | React, Vue, Angular, Next.js |
| `backend` | Tecnologias de backend | Node.js, Python, PHP, Java |
| `database` | Bancos de dados | MongoDB, PostgreSQL, MySQL |
| `devops` | DevOps e infraestrutura | Docker, Kubernetes, AWS, CI/CD |
| `design` | Design e ferramentas | Figma, Adobe XD, Photoshop |
| `mobile` | Desenvolvimento mobile | React Native, Flutter, Swift |

---

## 📈 Níveis de Conhecimento

| Nível | Descrição |
|-------|-----------|
| `básico` | Conhecimento fundamental, projetos simples |
| `intermediário` | Experiência prática, projetos de médio porte |
| `avançado` | Domínio completo, projetos complexos e otimizações |

---

## ⚠️ Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou campos obrigatórios faltando |
| 401 | Não autorizado (apenas para rotas admin) |
| 404 | Tecnologia não encontrada |
| 500 | Erro interno do servidor |

---

## 📝 Notas Importantes

1. **Endpoints Públicos:** `GET /api/stack`, `GET /api/stack/:id` e `GET /api/stack/stats` são acessíveis sem autenticação
2. **Rotas Admin:** POST, PATCH e DELETE requerem autenticação JWT
3. **Ordenação:** Tecnologias são retornadas ordenadas pelo campo `order` (crescente)
4. **Ícones:** Use URLs do DevIcon CDN ou armazene seus próprios ícones
5. **Categorias:** Siga as 6 categorias definidas para manter consistência
6. **Estatísticas:** Endpoint `/api/stack/stats` útil para dashboards e visualizações
