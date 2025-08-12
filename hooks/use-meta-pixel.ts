"use client"

import { useCallback } from 'react'

export const useMetaPixel = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters)
    }
  }, [])

  const trackCustomEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, parameters)
    }
  }, [])

  const trackCompleteRegistration = useCallback(() => {
    trackEvent('CompleteRegistration', {
      content_name: 'Mentor Quiz Info Page'
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackCustomEvent,
    trackCompleteRegistration
  }
}
