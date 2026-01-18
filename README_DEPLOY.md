# 🚀 Deploy no Render - MRISE TECH Backend

## Pré-requisitos
1. Conta no [Render](https://render.com)
2. Repositório no GitHub com o código
3. MongoDB Atlas configurado

## Passo a Passo

### 1. Preparar o repositório
/projeto-backend/
├── src/
├── package.json
├── render.yaml
├── Dockerfile
├── .env.production
└── README_DEPLOY.md


### 2. Criar Web Service no Render
1. Acesse [dashboard.render.com](https://dashboard.render.com)
2. Click em "New +" → "Web Service"
3. Conecte seu repositório do GitHub

### 3. Configurar o serviço
- **Name:** `mrise-tech-backend`
- **Environment:** `Node`
- **Region:** `Oregon (US West)` (recomendado)
- **Branch:** `main` ou `master`
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm run start:prod`

### 4. Variáveis de Ambiente (CRÍTICO!)
Adicione no Render Dashboard → Environment:
NODE_ENV=production
PORT=10000
MONGODB_URI=sua_uri_do_mongodb_atlas
JWT_SECRET=sua_chave_segura_aqui
CORS_ORIGIN=https://mrise-frontend.vercel.app


### 5. Banco de Dados (Opcional - se quiser usar o do Render)
1. No Render, "New +" → "PostgreSQL"
2. Nome: `mrisetech-db`
3. Conectar ao Web Service

### 6. Deploy
1. Click "Create Web Service"
2. Aguarde o build (5-10 minutos)
3. Acesse a URL fornecida

## URLs Importantes
- **Backend:** `https://mrise-tech-backend.onrender.com`
- **Frontend:** `https://mrise-frontend.vercel.app`
- **Swagger Docs:** `https://mrise-tech-backend.onrender.com/api/docs`

## Troubleshooting

### Build falha
- Verifique logs no Render
- Confira versão do Node.js
- Verifique dependências

### App não inicia
- Check PORT (deve ser 10000)
- Verifique variáveis de ambiente
- Confira logs de erro

### CORS errors
- Garanta que `CORS_ORIGIN` está correto
- Inclua todas as URLs necessárias

## Contato
- **Desenvolvedor:** Marcelo
- **Email:** marcelo@mrisetech.com