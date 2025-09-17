'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy')
  const effectiveDate = 'September 17, 2025'

  return (
    <div style={{
      maxWidth: 900,
      margin: '2rem auto',
      fontFamily: 'Inter, Arial, sans-serif',
      lineHeight: 1.6,
      padding: '1.5rem'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>{t('title')}</h1>
      <p style={{ textAlign: 'center', color: '#666', marginTop: 0 }}>
        {t('effectiveDate', { date: effectiveDate })}
      </p>

      <section style={{ marginTop: '1.25rem' }}>
        <h2>{t('summaryTitle')}</h2>
        <p>{t('summary')}</p>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>{t('whatWeStoreTitle')}</h2>
        <p>{t('whatWeStore')}</p>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>{t('whatWeDoNotDoTitle')}</h2>
        <ul>
          <li>{t('noPersonalData')}</li>
          <li>{t('noThirdPartySharing')}</li>
          <li>{t('noTracking')}</li>
        </ul>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>{t('cookieDurationTitle')}</h2>
        <p>{t('cookieDuration')}</p>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>{t('yourChoicesTitle')}</h2>
        <p>{t('yourChoices')}</p>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>{t('changesTitle')}</h2>
        <p>{t('changes')}</p>
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>{t('contactTitle')}</h2>
        <p>
          {t('contactText')}
          <br />
          <a href='https://www.linkedin.com/in/mirandex/' rel="noopener noreferrer" target="_blank">LinkedIn</a>
        </p>
      </section>
    </div>
  )
}
