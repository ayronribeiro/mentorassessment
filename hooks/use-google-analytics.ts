"use client"

import { useCallback } from 'react'

export const useGoogleAnalytics = () => {
  const trackEvent = useCallback((action: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, parameters)
    }
  }, [])

  const trackPageView = useCallback((url?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-GT977CXDNJ', {
        page_path: url || window.location.pathname
      })
    }
  }, [])

  const trackStartAssessment = useCallback(() => {
    trackEvent('start_assessment', {
      event_category: 'engagement',
      event_label: 'Mentor Quiz Assessment'
    })
  }, [trackEvent])

  const trackEndAssessment = useCallback((totalScore?: number) => {
    trackEvent('end_assessment', {
      event_category: 'engagement',
      event_label: 'Mentor Quiz Assessment',
      value: totalScore
    })
  }, [trackEvent])

  const trackFormSubmitted = useCallback((email?: string) => {
    trackEvent('form_submitted', {
      event_category: 'conversion',
      event_label: 'Mentor Quiz Info Page',
      custom_parameter: email
    })
  }, [trackEvent])

  const trackCompleteRegistration = useCallback(() => {
    trackEvent('complete_registration', {
      event_category: 'conversion',
      event_label: 'Mentor Quiz Info Page'
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackPageView,
    trackStartAssessment,
    trackEndAssessment,
    trackFormSubmitted,
    trackCompleteRegistration
  }
}
