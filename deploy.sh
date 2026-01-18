#!/bin/bash

echo "🚀 Iniciando deploy do MRISE TECH Backend..."

# Build da aplicação
echo "📦 Build da aplicação..."
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Build falhou!"
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo "🌐 A aplicação está pronta para produção"