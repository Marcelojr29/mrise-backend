# Integração - Configurações da Empresa

## Visão Geral
Sistema de gerenciamento de configurações da empresa, incluindo informações institucionais, redes sociais e alteração de senha do administrador.

## Endpoints Necessários

### 1. Obter Configurações
```
GET /api/settings
```

**Descrição:** Retorna todas as configurações da empresa

**Headers:**
```
Authorization: Bearer {token}
```

**Resposta de Sucesso (200):**
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
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Configurações obtidas com sucesso"
}
```

---

### 2. Atualizar Informações da Empresa
```
PUT /api/settings/company
```

**Descrição:** Atualiza as informações institucionais da empresa

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
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
- `name`: obrigatório, string, mínimo 3 caracteres
- `email`: obrigatório, formato de email válido
- `phone`: obrigatório, string
- `address`: obrigatório, string
- `description`: obrigatório, string, mínimo 10 caracteres

**Resposta de Sucesso (200):**
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
    "updatedAt": "2024-01-15T14:20:00.000Z"
  },
  "message": "Informações da empresa atualizadas com sucesso"
}
```

---

### 3. Atualizar Redes Sociais
```
PUT /api/settings/social
```

**Descrição:** Atualiza os links das redes sociais da empresa

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
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

**Resposta de Sucesso (200):**
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
    "updatedAt": "2024-01-15T14:25:00.000Z"
  },
  "message": "Redes sociais atualizadas com sucesso"
}
```

---

### 4. Alterar Senha do Administrador
```
PUT /api/auth/change-password
```

**Descrição:** Permite que o usuário autenticado altere sua senha

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "currentPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

**Validações:**
- `currentPassword`: obrigatório, string
- `newPassword`: obrigatório, string, mínimo 6 caracteres

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Senha alterada com sucesso"
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "data": null,
  "message": "Senha atual incorreta"
}
```

---

## Modelo de Dados (MongoDB)

### Settings Collection
```typescript
{
  _id: ObjectId,
  companyInfo: {
    name: string,
    email: string,
    phone: string,
    address: string,
    description: string
  },
  socialLinks: {
    linkedin?: string,
    github?: string,
    instagram?: string,
    twitter?: string
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Observações:**
- Deve existir apenas **um único documento** de configurações no sistema
- Se não existir, deve ser criado com valores padrão no primeiro acesso
- O campo `_id` é obrigatório para identificação única

---

## Casos de Uso

### 1. Carregar Configurações ao Entrar na Página
```typescript
// Ao montar o componente da página de configurações
const settings = await settingsService.getSettings();
setCompanyInfo(settings.companyInfo);
setSocialLinks(settings.socialLinks);
```

### 2. Salvar Informações da Empresa
```typescript
const handleSaveCompanyInfo = async () => {
  try {
    await settingsService.updateCompanyInfo(companyInfo);
    toast.success("Informações atualizadas com sucesso");
  } catch (error) {
    toast.error("Erro ao atualizar informações");
  }
};
```

### 3. Salvar Redes Sociais
```typescript
const handleSaveSocialLinks = async () => {
  try {
    await settingsService.updateSocialLinks(socialLinks);
    toast.success("Redes sociais atualizadas com sucesso");
  } catch (error) {
    toast.error("Erro ao atualizar redes sociais");
  }
};
```

### 4. Alterar Senha
```typescript
const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    toast.error("As senhas não coincidem");
    return;
  }
  
  try {
    await authService.changePassword(currentPassword, newPassword);
    toast.success("Senha alterada com sucesso");
    // Limpar campos
  } catch (error) {
    toast.error("Senha atual incorreta");
  }
};
```

---

## Implementação Backend (NestJS)

### Controller
```typescript
@Controller('api/settings')
export class SettingsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async getSettings() {
    // Retornar configurações (criar se não existir)
  }

  @Put('company')
  @UseGuards(JwtAuthGuard)
  async updateCompanyInfo(@Body() dto: UpdateCompanyInfoDto) {
    // Validar e atualizar informações da empresa
  }

  @Put('social')
  @UseGuards(JwtAuthGuard)
  async updateSocialLinks(@Body() dto: UpdateSocialLinksDto) {
    // Validar e atualizar redes sociais
  }
}
```

### Endpoint de Senha (AuthController)
```typescript
@Put('api/auth/change-password')
@UseGuards(JwtAuthGuard)
async changePassword(@Request() req, @Body() dto: ChangePasswordDto) {
  // 1. Verificar senha atual do usuário autenticado
  // 2. Fazer hash da nova senha
  // 3. Atualizar senha no banco
}
```

---

## Observações Importantes

1. **Singleton de Configurações**: O sistema deve ter apenas um documento de configurações. Na primeira execução, criar com valores padrão.

2. **Autenticação**: Todos os endpoints de configurações requerem autenticação via JWT.

3. **Validação de Senha**: O endpoint de alteração de senha deve:
   - Verificar se a senha atual está correta
   - Validar força da nova senha (mínimo 6 caracteres)
   - Fazer hash da nova senha antes de salvar

4. **Uso Futuro**: As configurações podem ser usadas em:
   - Footer do site (informações de contato)
   - Página "Sobre"
   - SEO metadata
   - Links de redes sociais no header/footer

5. **Campos Opcionais**: Os links de redes sociais são opcionais. Se não fornecidos, não exibir no frontend.

---

## Testes Recomendados

1. ✅ Criar configurações padrão na primeira execução
2. ✅ Atualizar informações da empresa com dados válidos
3. ✅ Atualizar redes sociais com URLs válidas
4. ✅ Rejeitar URLs inválidas nas redes sociais
5. ✅ Alterar senha com senha atual correta
6. ✅ Rejeitar alteração de senha com senha atual incorreta
7. ✅ Validar tamanho mínimo da nova senha
8. ✅ Garantir que apenas usuário autenticado pode acessar
