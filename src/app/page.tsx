'use client'

import { useState } from 'react'

const questions = [
  { id: 1, text: 'Do you really need the product?' },
  { id: 2, text: 'Can you afford it comfortably?' },
  { id: 3, text: 'Will it help you long-term?' },
  { id: 4, text: 'Is it better than what you already have?' },
]

export default function Home() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(50))
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (index: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => setSubmitted(true)

  const total = answers.reduce((acc, val) => acc + val, 0)
  const maxTotal = questions.length * 100

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Should I buy it?</h1>
      <p style={{ textAlign: 'center' }}>Slide toward “Yes” or “No” for each question.</p>

      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>{q.text}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={answers[i]}
            onChange={(e) => handleChange(i, Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555' }}>
            <span>No</span>
            <span>Yes</span>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', fontSize: 16 }}>
          Get Recommendation
        </button>
      </div>

      {submitted && (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <h2>Result:</h2>
          <p>
            Your total score is <strong>{total}</strong> out of {maxTotal}
          </p>
          <p>
            {total >= 75 * questions.length
              ? 'Yes, it seems worth it!'
              : total >= 50 * questions.length
              ? 'Maybe. Think a bit more.'
              : 'No, probably not a good idea.'}
          </p>
        </div>
      )}
    </div>
  )
}
