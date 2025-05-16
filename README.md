# Nzinga - Comunicação, Imagem e Estratégia

Site institucional moderno e impactante para a agência Nzinga, focado em comunicação e estratégia de marcas.

## Descrição

Este projeto é um site institucional para a agência Nzinga, especializada em comunicação, imagem e estratégia de marcas. O site apresenta um design moderno e impactante, com seções para apresentação dos serviços, portfólio, sobre a empresa, depoimentos e contato.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Shadcn/UI
- **Backend**: Express.js, Node.js
- **Estilização**: TailwindCSS, Shadcn/UI

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto:
   ```
   npm run dev
   ```
4. Acesse o site em `http://localhost:5000`

## Estrutura do Projeto

- `/client`: Código frontend da aplicação
  - `/src`: Código fonte do frontend
    - `/components`: Componentes reutilizáveis
    - `/pages`: Páginas da aplicação
    - `/hooks`: Custom hooks
    - `/lib`: Utilitários e funcionalidades auxiliares
- `/server`: Código backend da aplicação
- `/shared`: Esquemas e tipos compartilhados

## Implantação na Vercel

Este projeto está configurado para ser implantado na Vercel. Para implantar:

1. Crie uma conta na [Vercel](https://vercel.com/)
2. Instale o Vercel CLI: `npm i -g vercel`
3. Execute `vercel` na raiz do projeto para fazer login e configurar o projeto
4. Para implantar em produção, execute `vercel --prod`

### Configuração de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente na Vercel:

- `NODE_ENV`: Ambiente de execução (production, development, etc.)

## Licença

Todos os direitos reservados © Nzinga - Comunicação, Imagem e Estratégia.