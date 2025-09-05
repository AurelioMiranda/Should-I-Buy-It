'use client'

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import DynamicButton from '@/components/DynamicButton'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';

export default function Home() {

  const t = useTranslations('HomePage');

  const questions = [
    { id: 1, text: t('questions.1') },
    { id: 2, text: t('questions.2') },
    { id: 3, text: t('questions.3') },
    { id: 4, text: t('questions.4') },
    { id: 5, text: t('questions.5') },
    { id: 6, text: t('questions.6') },
    { id: 7, text: t('questions.7') },
  ];

  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(50))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))


  useEffect(() => {
    if (submitted) {
      countToValue(Math.round((total / maxTotal) * 100))
    }
  }, [submitted])

  const countToValue = (value: number) => {
    const controls = animate(count, value, { duration: 5 })
    return () => controls.stop()
  }

  const handleChange = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
  }

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setCurrentIndex(0)
    setAnswers(Array(questions.length).fill(50))
  }

  const total = answers.reduce((acc, val) => acc + val, 0)
  const maxTotal = questions.length * 100

  if (!started) {
    return (
      <div style={{
        maxWidth: 500, margin: '2rem auto', fontFamily: 'Arial, sans-serif', textAlign: 'center',
        display: 'flex', alignItems: 'center', flexDirection: 'column'
      }}>
        <h1 style={{ marginBottom: '20px' }}>{t('title')}</h1>
        <DynamicButton text={t('startButton')} onClick={() => setStarted(true)} />
      </div>
    )
  }

  if (submitted) {
    return (
      <div style={{
        maxWidth: 500, margin: '2rem auto', fontFamily: 'Arial, sans-serif', textAlign: 'center',
        display: 'flex', alignItems: 'center', flexDirection: 'column'
      }}>
        <h1>{t('resultsTitle')}</h1>
        <br />
        <p>{t('finalScore')}</p>
        <motion.pre style={text}>{rounded}</motion.pre>
        <br />
        <p>
          {total >= 75 * questions.length
            ? t('resultYes')
            : total >= 50 * questions.length
              ? t('resultMaybe')
              : t('resultNo')}
        </p>
        <br />
        <DynamicButton text={t('redoQuiz')} onClick={handleReset} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('quizTitle')}</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>{t('quizInstructions')}</p>


      <div style={{ marginBottom: 20 }}>
        <motion.div
          key={questions[currentIndex].id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", duration: 0.4, bounce: 0.2 },
          }}>
          <label style={{ display: 'block', marginBottom: 8 }}>{questions[currentIndex].text}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={answers[currentIndex]}
            onChange={(e) => handleChange(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555' }}>
            <span>{t('answers.no')}</span>
            <span>{t('answers.yes')}</span>
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentIndex !== 0 ?
          (<DynamicButton text={t('back')} onClick={goBack} />) :
          (<div></div>)
        }

        {currentIndex === questions.length - 1 ? (
          <DynamicButton text={t('seeResults')} onClick={handleSubmit} />
        ) : (
          <DynamicButton text={t('next')} onClick={goNext} />
        )}
      </div>
    </div>
  )
}

const text = {
  fontSize: 64,
  color: "#8df0cc",
}