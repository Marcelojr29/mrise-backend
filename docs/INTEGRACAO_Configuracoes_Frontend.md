# 🔧 Documentação de Integração - Configurações

## Base URL
```
http://localhost:3001/api/settings
```

---

## 📋 Endpoints Disponíveis

### 1. Obter Configurações da Empresa
**GET** `/api/settings`

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
    "_id": "673a1b2c3d4e5f6g7h8i9j0k",
    "companyInfo": {
      "name": "MRISE TECH",
      "email": "contato@mrisetech.com",
      "phone": "(11) 99999-9999",
      "address": "São Paulo, SP - Brasil",
      "description": "Transformando ideias em soluções tecnológicas inovadoras"
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/mrisetech",
      "github": "https://github.com/mrisetech",
      "instagram": "https://instagram.com/mrisetech",
      "twitter": "https://twitter.com/mrisetech"
    },
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T14:20:00.000Z"
  },
  "message": "Configurações obtidas com sucesso"
}
```

---

### 2. Atualizar Informações da Empresa
**PUT** `/api/settings/company`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "MRISE TECH",
  "email": "contato@mrisetech.com",
  "phone": "(11) 99999-9999",
  "address": "São Paulo, SP - Brasil",
  "description": "Transformando ideias em soluções tecnológicas inovadoras"
}
```

**Validações:**
- `name`: obrigatório, mínimo 3 caracteres
- `email`: obrigatório, formato válido de email
- `phone`: obrigatório, string
- `address`: obrigatório, string
- `description`: obrigatório, mínimo 10 caracteres

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "673a1b2c3d4e5f6g7h8i9j0k",
    "companyInfo": {
      "name": "MRISE TECH",
      "email": "contato@mrisetech.com",
      "phone": "(11) 99999-9999",
      "address": "São Paulo, SP - Brasil",
      "description": "Transformando ideias em soluções tecnológicas inovadoras"
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/mrisetech",
      "github": "https://github.com/mrisetech",
      "instagram": "https://instagram.com/mrisetech",
      "twitter": "https://twitter.com/mrisetech"
    },
    "updatedAt": "2026-01-16T15:00:00.000Z"
  },
  "message": "Informações da empresa atualizadas com sucesso"
}
```

**Response (400 - Error):**
```json
{
  "statusCode": 400,
  "message": [
    "Email inválido",
    "Nome deve ter no mínimo 3 caracteres"
  ],
  "error": "Bad Request"
}
```

---

### 3. Atualizar Redes Sociais
**PUT** `/api/settings/social`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body (todos os campos opcionais):**
```json
{
  "linkedin": "https://linkedin.com/company/mrisetech",
  "github": "https://github.com/mrisetech",
  "instagram": "https://instagram.com/mrisetech",
  "twitter": "https://twitter.com/mrisetech"
}
```

**Validações:**
- Todos os campos são opcionais
- Se fornecidos, devem ser URLs válidas
- Pode enviar apenas os campos que deseja atualizar

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "_id": "673a1b2c3d4e5f6g7h8i9j0k",
    "companyInfo": {
      "name": "MRISE TECH",
      "email": "contato@mrisetech.com",
      "phone": "(11) 99999-9999",
      "address": "São Paulo, SP - Brasil",
      "description": "Transformando ideias em soluções tecnológicas inovadoras"
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/mrisetech",
      "github": "https://github.com/mrisetech",
      "instagram": "https://instagram.com/mrisetech",
      "twitter": "https://twitter.com/mrisetech"
    },
    "updatedAt": "2026-01-16T15:05:00.000Z"
  },
  "message": "Redes sociais atualizadas com sucesso"
}
```

**Response (400 - Error):**
```json
{
  "statusCode": 400,
  "message": [
    "LinkedIn deve ser uma URL válida"
  ],
  "error": "Bad Request"
}
```

---

### 4. Alterar Senha do Administrador
**PUT** `/api/auth/change-password`

**Autenticação:** ✅ Requerida (Bearer Token)

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "senha123",
  "newPassword": "novaSenhaSegura456"
}
```

**Validações:**
- `currentPassword`: obrigatório
- `newPassword`: obrigatório, mínimo 6 caracteres

**Response (200 - Success):**
```json
{
  "success": true,
  "data": null,
  "message": "Senha alterada com sucesso"
}
```

**Response (400 - Error):**
```json
{
  "statusCode": 400,
  "message": "Senha atual incorreta",
  "error": "Bad Request"
}
```

---

## 🎨 Como Integrar no Frontend

### 1. Criar Service de Configurações

```typescript
// src/services/settingsService.ts
import api from './api';

export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
}

export interface Settings {
  _id: string;
  companyInfo: CompanyInfo;
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
}

class SettingsService {
  // Obter configurações
  async getSettings(): Promise<Settings> {
    const response = await api.get('/api/settings');
    return response.data.data;
  }

  // Atualizar informações da empresa
  async updateCompanyInfo(companyInfo: CompanyInfo): Promise<Settings> {
    const response = await api.put('/api/settings/company', companyInfo);
    return response.data.data;
  }

  // Atualizar redes sociais
  async updateSocialLinks(socialLinks: Partial<SocialLinks>): Promise<Settings> {
    const response = await api.put('/api/settings/social', socialLinks);
    return response.data.data;
  }

  // Alterar senha
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.put('/api/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }
}

export default new SettingsService();
```

---

### 2. Componente de Configurações (React/Next.js)

```tsx
// src/pages/admin/settings.tsx
import { useState, useEffect } from 'react';
import settingsService, { CompanyInfo, SocialLinks } from '@/services/settingsService';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Informações da empresa
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  // Redes sociais
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: '',
    github: '',
    instagram: '',
    twitter: '',
  });

  // Alteração de senha
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Carregar configurações ao montar componente
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      setCompanyInfo(data.companyInfo);
      setSocialLinks(data.socialLinks);
    } catch (error) {
      toast.error('Erro ao carregar configurações');
    } finally {
      setLoading(false);
    }
  };

  // Salvar informações da empresa
  const handleSaveCompanyInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await settingsService.updateCompanyInfo(companyInfo);
      toast.success('Informações da empresa atualizadas com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar informações');
    } finally {
      setSaving(false);
    }
  };

  // Salvar redes sociais
  const handleSaveSocialLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await settingsService.updateSocialLinks(socialLinks);
      toast.success('Redes sociais atualizadas com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar redes sociais');
    } finally {
      setSaving(false);
    }
  };

  // Alterar senha
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar senhas
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      setSaving(true);
      await settingsService.changePassword(currentPassword, newPassword);
      toast.success('Senha alterada com sucesso!');
      
      // Limpar campos
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao alterar senha');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="settings-page">
      <h1>Configurações</h1>

      {/* Seção: Informações da Empresa */}
      <section className="settings-section">
        <h2>Informações da Empresa</h2>
        <form onSubmit={handleSaveCompanyInfo}>
          <div className="form-group">
            <label>Nome da Empresa</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              required
              minLength={3}
            />
          </div>

          <div className="form-group">
            <label>Email de Contato</label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="text"
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={companyInfo.description}
              onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
              required
              minLength={10}
              rows={4}
            />
          </div>

          <button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Informações'}
          </button>
        </form>
      </section>

      {/* Seção: Redes Sociais */}
      <section className="settings-section">
        <h2>Redes Sociais</h2>
        <form onSubmit={handleSaveSocialLinks}>
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              placeholder="https://linkedin.com/company/mrisetech"
              value={socialLinks.linkedin || ''}
              onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              placeholder="https://github.com/mrisetech"
              value={socialLinks.github || ''}
              onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              placeholder="https://instagram.com/mrisetech"
              value={socialLinks.instagram || ''}
              onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              type="url"
              placeholder="https://twitter.com/mrisetech"
              value={socialLinks.twitter || ''}
              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
            />
          </div>

          <button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Redes Sociais'}
          </button>
        </form>
      </section>

      {/* Seção: Alterar Senha */}
      <section className="settings-section">
        <h2>Alterar Senha</h2>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label>Senha Atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nova Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            <small>Mínimo de 6 caracteres</small>
          </div>

          <div className="form-group">
            <label>Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={saving}>
            {saving ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </form>
      </section>
    </div>
  );
}
```

---

## 🎯 Casos de Uso

### 1. Carregar Configurações ao Iniciar
```typescript
useEffect(() => {
  const loadSettings = async () => {
    try {
      const settings = await settingsService.getSettings();
      setCompanyInfo(settings.companyInfo);
      setSocialLinks(settings.socialLinks);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  loadSettings();
}, []);
```

### 2. Atualizar Apenas um Campo das Redes Sociais
```typescript
// Atualizar apenas o LinkedIn
const updateLinkedIn = async () => {
  try {
    await settingsService.updateSocialLinks({
      linkedin: 'https://linkedin.com/company/nova-empresa'
    });
    toast.success('LinkedIn atualizado!');
  } catch (error) {
    toast.error('Erro ao atualizar LinkedIn');
  }
};
```

### 3. Validar Senha antes de Enviar
```typescript
const validatePassword = () => {
  if (newPassword.length < 6) {
    toast.error('Senha deve ter no mínimo 6 caracteres');
    return false;
  }

  if (newPassword !== confirmPassword) {
    toast.error('As senhas não coincidem');
    return false;
  }

  return true;
};
```

---

## ⚠️ Códigos de Erro Comuns

| Código | Descrição | Solução |
|--------|-----------|---------|
| 400 | Dados inválidos | Verificar validações dos campos |
| 401 | Não autorizado | Token expirado ou inválido - fazer login novamente |
| 404 | Configurações não encontradas | Primeira execução - serão criadas automaticamente |
| 500 | Erro interno | Verificar logs do servidor |

---

## 📝 Notas Importantes

1. **Singleton de Configurações**: O sistema mantém apenas um documento de configurações. Na primeira execução, valores padrão são criados automaticamente.

2. **Redes Sociais Opcionais**: Você pode deixar campos de redes sociais vazios. Se não fornecidos, não serão exibidos no site.

3. **Validação de URLs**: As URLs das redes sociais são validadas no backend. Certifique-se de usar URLs completas (com https://).

4. **Alteração de Senha**: 
   - A senha atual é verificada antes de atualizar
   - Nova senha deve ter no mínimo 6 caracteres
   - Recomenda-se usar combinação de letras, números e caracteres especiais

5. **Autenticação**: Todos os endpoints requerem token JWT válido no header Authorization.

6. **Toast Notifications**: Use bibliotecas como `react-toastify` ou `sonner` para feedback visual ao usuário.

7. **Uso das Configurações**:
   - Footer do site (informações de contato)
   - Página "Sobre"
   - Links de redes sociais no header/footer
   - Metadados para SEO

---

## 🔒 Segurança

- ✅ Todas as rotas protegidas com JWT
- ✅ Validação de dados no backend
- ✅ Senha atual verificada antes de alterar
- ✅ URLs validadas para redes sociais
- ✅ Rate limiting ativo (100 req/min)

---

## 🧪 Testando os Endpoints

### Usando cURL

```bash
# 1. Obter configurações
curl -X GET http://localhost:3001/api/settings \
  -H "Authorization: Bearer {seu_token}"

# 2. Atualizar informações da empresa
curl -X PUT http://localhost:3001/api/settings/company \
  -H "Authorization: Bearer {seu_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MRISE TECH",
    "email": "contato@mrisetech.com",
    "phone": "(11) 99999-9999",
    "address": "São Paulo, SP",
    "description": "Soluções tecnológicas"
  }'

# 3. Atualizar redes sociais
curl -X PUT http://localhost:3001/api/settings/social \
  -H "Authorization: Bearer {seu_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "linkedin": "https://linkedin.com/company/mrisetech",
    "github": "https://github.com/mrisetech"
  }'

# 4. Alterar senha
curl -X PUT http://localhost:3001/api/auth/change-password \
  -H "Authorization: Bearer {seu_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "senha123",
    "newPassword": "novaSenha456"
  }'
```

### Usando Postman/Insomnia

1. Configure a variável de ambiente `{{baseUrl}}` = `http://localhost:3001`
2. Configure a variável `{{token}}` com seu JWT após login
3. Importe os endpoints acima
4. Use a aba Authorization > Bearer Token

---

## 📚 Referências

- [Documentação Swagger](http://localhost:3001/api/docs)
- [README Principal](../README.md)
- [Documentação de Autenticação](./INTEGRACAO_Autenticacao.md)
