# Google Analytics Implementation

## Overview
O Google Analytics foi implementado no site Mentor Assessment para rastrear eventos e conversões importantes.

## Arquivos Modificados

### 1. `app/layout.tsx`
- Adicionado o script do Google Analytics no `<head>`
- Inclui o código base do Google Tag Manager
- Configurado com o Measurement ID: `G-GT977CXDNJ`
- Implementa o tracking automático de pageviews

### 2. `app/page.tsx`
- Importado o hook `useGoogleAnalytics`
- Adicionado tracking de eventos quando o formulário é enviado
- O evento é disparado tanto em caso de sucesso quanto de erro na API

### 3. `hooks/use-google-analytics.ts`
- Hook personalizado para facilitar o uso do Google Analytics
- Fornece funções para rastrear eventos customizados
- Inclui funções específicas para eventos do quiz

### 4. `types/global.d.ts`
- Declaração de tipos para o objeto `gtag` global
- Melhora a tipagem TypeScript

## Eventos Implementados

### 1. PageView
- Disparado automaticamente em todas as páginas
- Rastreia visualizações de página

### 2. start_assessment
- Disparado quando a pessoa responde a primeira pergunta do quiz
- Inclui parâmetros:
  - `event_category: 'engagement'`
  - `event_label: 'Mentor Quiz Assessment'`

### 3. end_assessment
- Disparado quando o quiz é finalizado (última seção)
- Inclui parâmetros:
  - `event_category: 'engagement'`
  - `event_label: 'Mentor Quiz Assessment'`
  - `value`: pontuação total do quiz

### 4. form_submitted
- Disparado quando o formulário de contato é enviado
- Inclui parâmetros:
  - `event_category: 'conversion'`
  - `event_label: 'Mentor Quiz Info Page'`
  - `custom_parameter`: email do usuário

### 5. complete_registration
- Disparado quando o formulário é enviado com sucesso
- Inclui parâmetros:
  - `event_category: 'conversion'`
  - `event_label: 'Mentor Quiz Info Page'`

## Como Usar

### Rastrear Eventos Customizados
```typescript
import { useGoogleAnalytics } from '@/hooks/use-google-analytics'

const { trackEvent, trackPageView } = useGoogleAnalytics()

// Evento customizado
trackEvent('custom_event', {
  event_category: 'engagement',
  event_label: 'Custom Label',
  value: 100
})

// Page view
trackPageView('/custom-page')
```

### Rastrear Eventos Específicos
```typescript
const { 
  trackStartAssessment, 
  trackEndAssessment, 
  trackFormSubmitted, 
  trackCompleteRegistration 
} = useGoogleAnalytics()

// Início do quiz
trackStartAssessment()

// Fim do quiz
trackEndAssessment(150) // com pontuação total

// Formulário enviado
trackFormSubmitted('user@example.com')

// Registro completo
trackCompleteRegistration()
```

## Configuração do Google Analytics

1. Acesse o Google Analytics
2. Configure o Measurement ID: `G-GT977CXDNJ`
3. Configure eventos personalizados:
   - `start_assessment` - para rastrear início do quiz
   - `end_assessment` - para rastrear conclusão do quiz
   - `form_submitted` - para rastrear envio do formulário
   - `complete_registration` - para rastrear conversões

## Verificação

Para verificar se o Google Analytics está funcionando:

1. Abra o DevTools do navegador
2. Vá para a aba Network
3. Filtre por "google-analytics" ou "gtag"
4. Preencha e envie o formulário
5. Verifique se as requisições para o Google Analytics estão sendo feitas

## Relatórios no Google Analytics

### Eventos Personalizados
- **Engagement**: `start_assessment`, `end_assessment`
- **Conversions**: `form_submitted`, `complete_registration`

### Métricas Importantes
- **Taxa de Conversão**: Formulários enviados / Visitas
- **Engagement Rate**: Usuários que completaram o quiz
- **Funnel Analysis**: Start → End → Form → Complete

## Notas Importantes

- O Google Analytics só funciona no lado do cliente (browser)
- Todos os eventos são verificados se `window.gtag` existe antes de serem disparados
- Os eventos são disparados mesmo se houver erro na API do GoHighLevel
- O código está otimizado para Next.js com SSR
- Compatível com GDPR e LGPD (não coleta dados pessoais automaticamente)
