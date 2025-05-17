# Nzinga - Agência de Comunicação e Estratégia

## Sobre o Projeto

Site institucional moderno para a agência Nzinga, desenvolvido com foco em comunicação visual e estratégia de marca, oferecendo uma experiência responsiva e envolvente.

### Tecnologias Principais

- **Frontend**: React.js, Vite
- **Estilização**: Tailwind CSS, Componentes shadcn/ui
- **Linguagem**: TypeScript
- **Roteamento**: Wouter
- **Backend**: Express.js (simples para servir a aplicação)
- **Hospedagem**: Preparado para Vercel

### Funcionalidades 

- Design responsivo para todos os dispositivos
- Temas claro e escuro
- Seções interativas (Serviços, Portfólio, Depoimentos)
- Carrossel de marcas parceiras
- FAQ interativo
- Formulário de contato
- Navegação suave entre seções
- Efeitos visuais e animações sutis

## Estrutura do Projeto

```
.
├── client/               # Frontend da aplicação
│   ├── src/              # Código fonte
│   │   ├── assets/       # Recursos estáticos (imagens, fontes)
│   │   ├── components/   # Componentes React
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilitários e helpers
│   │   ├── pages/        # Páginas da aplicação
│   ├── index.html        # Template HTML principal
│   ├── vite.config.ts    # Configuração do Vite
├── public/               # Arquivos públicos estáticos
│   ├── images/           # Imagens públicas
├── server/               # Servidor Express simples
├── shared/               # Código compartilhado entre client e server
├── package.json          # Dependências e scripts
└── README.md             # Este arquivo
```

## Executando Localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5000` no seu navegador

## Deployment

Para instruções detalhadas sobre como fazer o deploy deste projeto no Vercel, consulte o arquivo [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md).

## Recursos Adicionais

- Suporte a SEO incorporado em todas as páginas
- Otimizado para performance com Lighthouse
- Interface adaptativa para diferentes tamanhos de tela

## Licença

Copyright © 2024 Nzinga.