# Guia de Deploy do Site Nzinga na Vercel

Este documento contém instruções passo a passo para fazer o deploy do site da Agência Nzinga na plataforma Vercel.

## Pré-requisitos

- Uma conta na [Vercel](https://vercel.com)
- Acesso ao código-fonte do projeto (GitHub, GitLab, Bitbucket ou download direto)

## Opção 1: Deploy a partir de um Repositório Git

### Passo 1: Prepare seu repositório

1. Certifique-se de que o projeto está em um repositório Git (GitHub, GitLab ou Bitbucket)
2. Verifique se o arquivo `package.json` está na raiz do projeto
3. Confirme que todos os arquivos necessários estão comitados

### Passo 2: Conecte à Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New" → "Project"
3. Escolha o repositório que contém o projeto Nzinga
4. Se o repositório não aparecer, pode ser necessário configurar as permissões:
   - Clique em "Adjust GitHub App Permissions"
   - Conceda acesso ao repositório desejado

### Passo 3: Configure o Projeto

1. A Vercel automaticamente detectará que é um projeto React + Vite
2. Em "Build and Output Settings", mantenha as configurações padrão:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. Configurações Avançadas (opcional):
   - Vá para "Advanced" se precisar adicionar variáveis de ambiente
   - Não é obrigatório configurar variáveis de ambiente para o site funcionar

4. Clique em "Deploy"

## Opção 2: Deploy a partir de Arquivos Locais

### Passo 1: Prepare os arquivos

1. Certifique-se de que o projeto está funcionando localmente
2. Execute o build do projeto:
   ```bash
   npm run build
   ```
3. Isso criará uma pasta `dist` com os arquivos otimizados para produção

### Passo 2: Instale a CLI da Vercel

1. Abra o terminal/prompt de comando
2. Instale a CLI da Vercel globalmente:
   ```bash
   npm install -g vercel
   ```

### Passo 3: Faça login e deploy

1. Execute o comando de login:
   ```bash
   vercel login
   ```
2. Siga as instruções para fazer login
3. Navegue até a pasta raiz do projeto e execute:
   ```bash
   vercel
   ```
4. Responda às perguntas sobre a configuração do projeto:
   - "Set up and deploy": Sim
   - "Which scope": Escolha sua conta pessoal ou organização
   - "Link to existing project": Não
   - "Project name": `nzinga` (ou outro nome de sua escolha)
   - "Framework preset": Vite
   - "Directory": `./`
   - "Build Command": `npm run build`
   - "Output Directory": `dist`
   - "Development Command": `npm run dev`
   - "Want to override settings": Não

## Configurações Adicionais

### Domínio Personalizado

1. Após o deploy, vá para o dashboard do projeto na Vercel
2. Navegue até "Settings" → "Domains"
3. Clique em "Add" e siga as instruções para configurar seu domínio personalizado

### Configurações de Performance

1. No dashboard do projeto, vá para "Settings" → "Edge Network"
2. Habilite as opções recomendadas:
   - Compression: Enabled
   - HTTP/2: Enabled  
   - HTTP/3: Enabled

### Monitoramento

1. No dashboard do projeto, vá para "Analytics"
2. Você pode monitorar métricas importantes como:
   - Web Vitals
   - Visitors
   - Performance Insights

## Atualizações do Site

Para atualizar o site após modificações:

### Se você usou um repositório Git

1. Faça suas alterações no código
2. Comite e envie para o repositório
3. A Vercel detectará automaticamente as mudanças e fará um novo deploy

### Se você usou arquivos locais

1. Faça suas alterações no código
2. Execute `npm run build` para gerar novos arquivos otimizados
3. Execute `vercel` na pasta raiz do projeto para fazer um novo deploy

## Solução de Problemas

### O build falha

- Verifique os logs do build na Vercel para identificar o problema
- Certifique-se de que o projeto funciona localmente com `npm run build`
- Confirme que todas as dependências estão corretamente listadas no `package.json`

### Problemas de renderização ou funcionalidade

- Verifique se há erros no console do navegador
- Confirme que todas as referências a arquivos e APIs estão corretas
- Se o problema persistir, use a função "Preview Deployment" da Vercel para testar alterações antes do deploy principal

## Suporte

Se precisar de ajuda adicional:

- Consulte a [documentação oficial da Vercel](https://vercel.com/docs)
- Acesse o [fórum da comunidade Vercel](https://github.com/vercel/vercel/discussions)

---

Lembre-se: A Vercel oferece um plano gratuito bastante generoso para projetos pessoais e de pequeno porte, ideal para o site da Nzinga.