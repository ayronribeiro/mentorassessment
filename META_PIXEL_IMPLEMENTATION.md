# Meta Pixel Implementation

## Overview
O Meta Pixel foi implementado no site Mentor Assessment para rastrear conversões e eventos importantes.

## Arquivos Modificados

### 1. `app/layout.tsx`
- Adicionado o script do Meta Pixel no `<head>`
- Inclui o código base do Facebook Pixel
- Configurado com o Pixel ID: `1274615750766903`
- Implementa o evento `InfoPageView` quando a página carrega
- Define a função `trackInfoSubmitted()` para rastrear envios de formulário

### 2. `app/page.tsx`
- Importado o hook `useMetaPixel`
- Adicionado tracking do evento `CompleteRegistration` quando o formulário é enviado
- O evento é disparado tanto em caso de sucesso quanto de erro na API

### 3. `hooks/use-meta-pixel.ts`
- Hook personalizado para facilitar o uso do Meta Pixel
- Fornece funções para rastrear eventos padrão e customizados
- Inclui função específica para `CompleteRegistration`

### 4. `types/global.d.ts`
- Declaração de tipos para o objeto `fbq` global
- Melhora a tipagem TypeScript

## Eventos Implementados

### 1. PageView
- Disparado automaticamente em todas as páginas
- Rastreia visualizações de página

### 2. InfoPageView (Custom Event)
- Disparado quando alguém acessa a página de informações
- Rastreia visitantes na página do formulário

### 3. CompleteRegistration
- Disparado quando o formulário é enviado com sucesso
- Inclui parâmetros:
  - `content_name: 'Mentor Quiz Info Page'`

## Como Usar

### Rastrear Eventos Customizados
```typescript
import { useMetaPixel } from '@/hooks/use-meta-pixel'

const { trackEvent, trackCustomEvent } = useMetaPixel()

// Evento padrão
trackEvent('Purchase', { value: 100, currency: 'USD' })

// Evento customizado
trackCustomEvent('CustomEvent', { parameter: 'value' })
```

### Rastrear Registro Completo
```typescript
const { trackCompleteRegistration } = useMetaPixel()
trackCompleteRegistration()
```

## Configuração do Facebook Ads

1. Acesse o Facebook Events Manager
2. Configure o Pixel ID: `1274615750766903`
3. Configure eventos personalizados:
   - `InfoPageView` - para rastrear visitantes na página
   - `CompleteRegistration` - para rastrear conversões

## Verificação

Para verificar se o Meta Pixel está funcionando:

1. Abra o DevTools do navegador
2. Vá para a aba Network
3. Filtre por "facebook"
4. Preencha e envie o formulário
5. Verifique se as requisições para o Facebook estão sendo feitas

## Notas Importantes

- O Meta Pixel só funciona no lado do cliente (browser)
- Todos os eventos são verificados se `window.fbq` existe antes de serem disparados
- O evento `CompleteRegistration` é disparado mesmo se houver erro na API do GoHighLevel
- O código está otimizado para Next.js com SSR
