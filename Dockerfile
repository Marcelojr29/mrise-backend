# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar o build do estágio anterior
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 10000

# Comando para iniciar
CMD ["npm", "run", "start:prod"]