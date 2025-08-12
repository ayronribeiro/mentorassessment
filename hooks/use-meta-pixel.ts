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

  const trackStartAssessment = useCallback(() => {
    trackCustomEvent('StartAssessment', {
      content_name: 'Mentor Quiz Assessment'
    })
  }, [trackCustomEvent])

  const trackEndAssessment = useCallback((totalScore?: number) => {
    trackCustomEvent('EndAssessment', {
      content_name: 'Mentor Quiz Assessment',
      total_score: totalScore
    })
  }, [trackCustomEvent])

  const trackFormSubmitted = useCallback((email?: string) => {
    trackCustomEvent('FormSubmitted', {
      content_name: 'Mentor Quiz Info Page',
      user_email: email
    })
  }, [trackCustomEvent])

  return {
    trackEvent,
    trackCustomEvent,
    trackCompleteRegistration,
    trackStartAssessment,
    trackEndAssessment,
    trackFormSubmitted
  }
}
