<div align="center">

# 🧠 NutriFilosofia

### Nutrição Clínica com Apoio Filosófico

*Plataforma para nutricionistas que integram filosofia ao tratamento nutricional integral*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Sobre o Projeto

**NutriFilosofia** é uma plataforma inovadora para nutricionistas que desejam ir além da prescrição dietética tradicional. Combinamos:

- 🥗 **Nutrição Clínica** baseada em evidências científicas
- 🏛️ **Filosofia Prática** (Estoicismo, Epicurismo, Mindfulness)
- 🧘 **Abordagem Comportamental** para mudanças sustentáveis

### Funcionalidades Principais

- **Análise Integrativa**: IA analisa o caso do paciente e sugere abordagens que combinam nutrição + filosofia
- **Planos Personalizados**: Crie planos que incluem metas nutricionais E rituais filosóficos
- **Calibragem de IA**: A IA aprende seu estilo de atendimento e se adapta
- **Portal do Paciente**: Pacientes acessam seus planos e reflexões diárias
- **Histórico de Consultas**: Acompanhe a evolução dos casos

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nutrifilosofia.git
cd nutrifilosofia

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione sua GEMINI_API_KEY

# Inicie o desenvolvimento
npm run dev
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run typecheck` | Verificação TypeScript |
| `npm run lint` | Linting com ESLint |
| `npm run format` | Formatação com Prettier |
| `npm test` | Executa testes |

---

## 🏗️ Arquitetura

```
src/
├── components/          # Componentes React reutilizáveis
├── features/           # Features por domínio
│   └── analysis/       # Análise integrativa
├── hooks/              # Custom hooks
├── services/           # Serviços (API, backend mock)
├── locales/            # Internacionalização (pt, en, es)
└── types.ts            # Tipos TypeScript

server/
├── routes/             # Rotas da API
├── middleware/         # Rate limiting, validação, erros
├── config/             # Configurações
└── lib/                # Utilitários (logger)
```

---

## 🎯 Filosofias Integradas

| Filosofia | Aplicação Nutricional |
|-----------|----------------------|
| **Tomismo** | Virtudes cardeais (prudência, justiça, fortitude, temperança), ordem natural, bem integral |
| **Mindful Eating** | Atenção plena nas refeições, consciência alimentar |
| **Aristóteles** | Virtude como meio-termo, temperança |

---

## 🔒 Segurança

- ✅ API keys nunca expostas no frontend
- ✅ Rate limiting (50 req/15min, 10 req/min para IA)
- ✅ Validação com Zod
- ✅ CSP e headers de segurança
- ✅ Sanitização de inputs

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Desenvolvido com 💚 para nutricionistas que acreditam no poder da mente**

*"Que a comida seja o teu remédio, e o remédio seja a tua comida" - Hipócrates*

</div>
