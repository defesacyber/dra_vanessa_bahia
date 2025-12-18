# Concierge Premium - Especificação Implementada

## Visão Geral

Sistema concierge premium para clientes de alto padrão com:
- Padrão "1 Melhor + 3 Alternativas"
- Cards com hierarquia visual
- Evidências científicas (discretas para paciente, completas para nutri)
- Mensagens diárias concierge-style
- Auditoria completa

## Arquitetura

### Tipos/Schemas (`src/types/concierge.ts`)

```typescript
// Resposta de substituição
interface FoodSubstitutionResponse {
  type: 'food_substitution';
  plan_version: string;        // "2025-01-15_v3"
  policy_version: string;      // "1.0.0"
  request_id: string;          // UUID para auditoria
  
  base_item: { food, grams, kcal, macros, meal };
  best_choice: SubstitutionChoice;
  alternatives: SubstitutionChoice[];  // Exatamente 3
  
  evidence_preview: EvidenceItem[];    // 1-2 para paciente
  evidence_full?: EvidenceItem[];      // Completo para nutri
  
  audit: { patient_id, nutritionist_id, catalog_version, calculation_method };
}

// Quando não há alternativa segura
interface NoAlternativeResponse {
  type: 'no_safe_alternative';
  reason: string;
  action: string;
  contact_cta: boolean;
}
```

### Backend Routes

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/v1/policy/substitution` | POST | Calcula substituições |
| `/api/v1/policy/config` | GET | Config do Policy Engine (nutri only) |
| `/api/v1/messages` | GET | Lista mensagens do paciente |
| `/api/v1/messages/today` | GET | Mensagem do dia |
| `/api/v1/messages` | POST | Nutri cria mensagem personalizada |
| `/api/v1/audit` | GET | Lista audit log (nutri only) |
| `/api/v1/audit/stats` | GET | Estatísticas de uso |

### Policy Engine (`server/routes/policy.ts`)

**Ranking Algorithm:**
1. Compatibilidade com plano (40%)
2. Erro de equivalência (30%)
3. Preferências do paciente (20%)
4. Variedade (10%)

**Métodos de cálculo:**
- `macros_full` - Média ponderada (C:50%, P:30%, G:20%)
- `kcal_only` - Simples equivalência calórica
- `carb_primary` - Prioriza carboidratos

### Componentes UI (`src/components/concierge/`)

| Componente | Descrição |
|------------|-----------|
| `BestChoiceCard` | Card hero com badge "Melhor agora" |
| `AlternativeCard` | Cards secundários compactos |
| `EvidenceSection` | Collapsible com evidências |
| `NoAlternativeView` | Estado quando não há opções seguras |
| `SubstitutionView` | View completa de substituição |
| `SubstitutionModal` | Modal full-screen mobile |
| `DailyMessageCard` | Mensagem do dia com tom |
| `MessageFeed` | Feed de mensagens anteriores |

### Evidence System (`src/services/evidenceService.ts`)

- `getPatientEvidence()` - Resumida, sem DOI
- `getNutritionistEvidence()` - Completa com DOI e citação
- `searchEvidence()` - Busca por keywords
- `formatCitation()` - ABNT/APA

### Audit System (`server/routes/audit.ts`)

- Log de todas as requisições
- Suporte a impersonation (nutri visualiza como paciente)
- Estatísticas de uso
- Filtros por ator, ação, período

## Contrato JSON (Exemplo)

```json
{
  "type": "food_substitution",
  "plan_version": "2025-01-15_v1",
  "policy_version": "1.0.0",
  "request_id": "sub_1705330800_a1b2c3",
  "timestamp": "2025-01-15T12:00:00.000Z",
  "base_item": {
    "food": "Arroz branco",
    "grams": 150,
    "kcal": 195,
    "macros": { "carb_g": 42, "prot_g": 4, "fat_g": 0.5 },
    "meal": "almoço"
  },
  "best_choice": {
    "food": "Batata doce",
    "grams": 230,
    "kcal": 198,
    "macros": { "carb_g": 46, "prot_g": 3.7, "fat_g": 0.2, "fiber_g": 6.9 },
    "why": "Energia sustentada para seu treino. Carboidrato de liberação gradual.",
    "equivalence_error": 1.5
  },
  "alternatives": [
    { "food": "Quinoa", "grams": 165, ... },
    { "food": "Arroz integral", "grams": 175, ... },
    { "food": "Macarrão integral", "grams": 160, ... }
  ],
  "evidence_preview": [
    { "title": "ABESO 2024", "note": "Substituições calóricas mantêm resultados." }
  ],
  "disclaimer": "Substituições validadas pelo seu plano."
}
```

## Tons de Mensagem

| Tone | Descrição | Uso |
|------|-----------|-----|
| `NEUTRAL_PRO` | Coach discreto | Padrão |
| `WARM_SUPPORTIVE` | Acolhedor | Pacientes sensíveis |
| `DIRECT_MINIMAL` | Ultra-direto | Executivos |
| `PHILOSOPHICAL` | Com reflexão | Tomismo |

## Próximos Passos

1. Integrar UI com portal do paciente
2. Persistir audit log em banco
3. Conectar catálogo real por paciente
4. Implementar cache de equivalências
5. Adicionar notificações push para mensagens

---
*Implementado conforme especificação concierge premium*
