# 🎬 MovieFinder

Uma aplicação Next.js moderna e elegante para descobrir e explorar filmes usando a API do TMDB (The Movie Database). Desenvolvida com as melhores práticas de UX/UI e tecnologias de ponta.

![MovieFinder Preview](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=MovieFinder)

## ✨ Características

### 🎯 Funcionalidades Principais
- **🔍 Busca Inteligente**: Pesquise filmes por título, ator ou diretor com debounce automático
- **📱 Design Responsivo**: Interface adaptável para mobile, tablet e desktop
- **🌙 Modo Escuro**: Suporte completo a dark mode
- **❤️ Sistema de Favoritos**: Salve seus filmes favoritos com localStorage
- **⚡ Cache Inteligente**: Sistema de cache automático para melhor performance
- **🔄 Scroll Infinito**: Carregamento dinâmico de mais filmes
- **📄 Páginas Detalhadas**: Informações completas de cada filme

### 🎨 Design & UX
- **Animações Fluidas**: Utilizando Framer Motion para transições suaves
- **Feedback Visual**: Estados de loading, erro e sucesso bem definidos
- **Micro-interações**: Hover effects e animações que encantam
- **Tipografia Moderna**: Fonte Inter para legibilidade otimizada
- **Paleta Harmoniosa**: Gradientes purple-blue elegantes

### 🚀 Performance
- **SSR**: Server-Side Rendering com Next.js 15
- **Otimização de Imagens**: Lazy loading e múltiplos tamanhos
- **Bundle Otimizado**: Tree-shaking e code splitting automático
- **SEO Friendly**: Meta tags e Open Graph otimizados

## 🛠️ Tecnologias

- **Framework**: [Next.js 15.3.3](https://nextjs.org/) com App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- API Key do TMDB (gratuita)

### 1. Clone o Repositório
```bash
git clone <repository-url>
cd play-reel
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure a API Key
O projeto já vem com uma API Key de demonstração configurada em `src/lib/api.ts`. Para produção, é recomendado usar variáveis de ambiente:

```bash
# Crie um arquivo .env.local
echo "NEXT_PUBLIC_TMDB_API_KEY=sua_api_key_aqui" > .env.local
```

### 4. Execute o Projeto
```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── movie/
│       └── [id]/
│           └── page.tsx   # Página de detalhes do filme
├── components/             # Componentes reutilizáveis
│   ├── ui/
│   │   └── LoadingSpinner.tsx
│   ├── MovieCard.tsx      # Card de filme
│   └── SearchBar.tsx      # Barra de pesquisa
├── hooks/                 # Hooks personalizados
│   └── useMovies.ts       # Gerenciamento de estado dos filmes
└── lib/                   # Utilitários e configurações
    └── api.ts             # Configuração da API TMDB
```

## 🎯 Funcionalidades Detalhadas

### 🔍 Sistema de Busca
- **Debounce**: 500ms para evitar requisições excessivas
- **Cache**: Resultados ficam em cache por 5 minutos
- **Estados**: Loading, erro e lista vazia tratados elegantemente
- **Sugestões**: Dicas de pesquisa quando campo está vazio

### 📱 Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 
  - Mobile: 2 colunas
  - Tablet: 3-4 colunas
  - Desktop: 5-6 colunas
- **Touch Friendly**: Alvos de toque adequados para mobile

### ⚡ Performance
- **Lazy Loading**: Imagens carregadas sob demanda
- **Virtual Scrolling**: Para listas longas
- **Memoization**: Hooks otimizados com useCallback
- **Bundle Splitting**: Código dividido por rotas

### 🎨 Animações
- **Entrada**: Cards aparecem com stagger animation
- **Hover**: Efeitos de lift e escala
- **Transições**: Mudanças de página fluidas
- **Loading**: Spinners e skeleton screens

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linting do código
```

## 🌟 Destaques Técnicos

### Arquitetura Escalável
- **Componentização**: Componentes pequenos e reutilizáveis
- **Hooks Customizados**: Lógica de negócio isolada
- **TypeScript**: Tipagem forte para maior confiabilidade
- **Padrões Consistentes**: ESLint e Prettier configurados

### Experiência do Usuário
- **Feedback Imediato**: Loading states em todas as ações
- **Tratamento de Erros**: Mensagens amigáveis para o usuário
- **Acessibilidade**: Foco visible e navegação por teclado
- **Progressive Enhancement**: Funciona mesmo sem JavaScript

### Otimizações
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts com display swap
- **CSS-in-JS**: Zero runtime CSS com Tailwind
- **Bundle Analysis**: Análise automática do bundle

## 🎨 Design System

### Cores Principais
- **Primary**: Purple (#8b5cf6)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Emerald (#10b981)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Tipografia
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400, 500, 600, 700
- **Line Height**: 1.6 para legibilidade

### Spacing
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Containers**: Responsive com max-width

## 📈 Melhorias Futuras

- [ ] **Filtros Avançados**: Por gênero, ano, classificação
- [ ] **Listas Personalizadas**: Criar e gerenciar listas de filmes
- [ ] **PWA**: Transformar em Progressive Web App
- [ ] **Testes**: Unit e E2E tests com Jest/Playwright
- [ ] **i18n**: Internacionalização multi-idioma
- [ ] **Analytics**: Google Analytics ou Plausible
- [ ] **Notifications**: Sistema de notificações
- [ ] **Social Features**: Compartilhamento e reviews

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Amazing Feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)
- **Email**: seu-email@exemplo.com
- **LinkedIn**: [Seu Nome](https://linkedin.com/in/seu-nome)

---

<div align="center">

**🎬 Feito com ❤️ e muito ☕**

[⭐ Star o projeto](https://github.com/seu-usuario/moviefinder) | [🐛 Reportar Bug](https://github.com/seu-usuario/moviefinder/issues) | [💡 Solicitar Feature](https://github.com/seu-usuario/moviefinder/issues)

</div>
