# Nzinga - Agência de Comunicação e Estratégia

## Sobre o Projeto

Site institucional moderno para a agência Nzinga, projetado com foco em comunicação visual e estratégia de marca, oferecendo uma experiência digital responsiva, envolvente e de alto impacto visual. O design foi desenvolvido para refletir a sofisticação e qualidade dos serviços oferecidos pela agência.

### Tecnologias Principais

- **Frontend**: React.js, Vite
- **Estilização**: Tailwind CSS, Componentes shadcn/ui
- **Linguagem**: TypeScript
- **Roteamento**: Wouter
- **Backend**: Express.js (simples para servir a aplicação)
- **Hospedagem**: Otimizado para deploy na Vercel

### Funcionalidades 

- Design responsivo para todos os dispositivos (mobile, tablet, desktop)
- Sistema de tema claro/escuro com transições suaves
- Seções interativas:
  - Hero section com animações sutis
  - Serviços com cards interativos
  - Portfólio com galeria de projetos
  - Depoimentos de clientes em carrossel
- Carrossel de logos de marcas parceiras
- FAQ interativo com acordeão expansível
- Formulário de contato otimizado
- Navegação suave entre seções (smooth scroll)
- Efeitos visuais e animações sutis
- Menu mobile otimizado para melhor experiência em dispositivos pequenos

## Estrutura do Projeto

```
.
├── client/               # Frontend da aplicação
│   ├── src/              # Código fonte
│   │   ├── assets/       # Recursos estáticos (imagens, logos dos parceiros)
│   │   ├── components/   # Componentes React reutilizáveis
│   │   │   ├── ui/       # Componentes de UI do shadcn
│   │   │   └── ...       # Componentes específicos da aplicação
│   │   ├── hooks/        # Custom hooks (useTheme, useMobile, etc.)
│   │   ├── lib/          # Utilitários e helpers
│   │   ├── pages/        # Páginas da aplicação (Home, ServicoDetalhes, etc.)
│   ├── index.html        # Template HTML principal
│   ├── vite.config.ts    # Configuração do Vite
├── public/               # Arquivos públicos estáticos
│   ├── images/           # Imagens públicas
├── server/               # Servidor Express simples para servir a aplicação
├── shared/               # Código compartilhado entre client e server
├── package.json          # Dependências e scripts
├── VERCEL_DEPLOY.md      # Instruções detalhadas de deploy na Vercel
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

- Suporte a SEO incorporado em todas as páginas com meta tags otimizadas
- Performance otimizada com melhores práticas do Lighthouse
- Interface totalmente adaptativa para diferentes tamanhos de tela
- Carousel de logos de empresas parceiras com animação fluida
- Modo escuro/claro que respeita a preferência do sistema do usuário
- Efeitos de parallax e microinterações para aumentar o engajamento

## Próximos Passos

Algumas melhorias futuras que podem ser implementadas:

- Seção de blog para compartilhar insights e notícias
- Área de acesso restrito para clientes
- Sistema de agendamento de reuniões
- Integração com redes sociais
- Chat para atendimento direto

## Licença

Copyright © 2024 Nzinga. Todos os direitos reservados.