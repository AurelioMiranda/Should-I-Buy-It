'use client'

import { useState } from 'react'

const questions = [
  { id: 1, text: 'Do you really need it?' },
  { id: 2, text: 'Do you want it?' },
  { id: 3, text: 'Can you afford it comfortably?' },
  { id: 4, text: 'Will it help you long-term?' },
  { id: 5, text: 'Will you use it long-term?' },
  { id: 6, text: 'Is it better than what you already have?' },
  { id: 7, text: 'Do you have room for it?' },
]

export default function Home() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(50))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

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

  if (submitted) {
    return (
      <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1>Result:</h1>
        <br/>
        <p>
          Your total score is <strong>{total}</strong> out of {maxTotal}
        </p>
        <br/>
        <p>
          {total >= 75 * questions.length
            ? 'Yes, it seems worth it!'
            : total >= 50 * questions.length
            ? 'Maybe. Think a bit more.'
            : 'No, probably not a good idea.'}
        </p>
        <br/>
        <button onClick={handleReset} style={{ padding: '0.5rem 1rem' }}>
          Redo quiz
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Should I buy it?</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Slide toward “Yes” or “No” for each question.</p>

      <div style={{ marginBottom: 20 }}>
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
          <span>No</span>
          <span>Yes</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={goBack} disabled={currentIndex === 0} style={{ padding: '0.5rem 1rem' }}>
          Back
        </button>

        {currentIndex === questions.length - 1 ? (
          <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
            Get Recommendation
          </button>
        ) : (
          <button onClick={goNext} style={{ padding: '0.5rem 1rem' }}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}
