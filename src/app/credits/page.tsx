'use client'

import React from 'react'

type Person = {
  name: string
  role: string
  image: string
  linkedin: string
}

const people: Person[] = [
  {
    name: 'Aurélio Miranda',
    role: 'Developer',
    image: '/photos/picture.png',
    linkedin: 'https://www.linkedin.com/in/mirandex/'
  },
  {
    name: 'Rodrigo Ferreira',
    role: 'Translator',
    image: '/photos/rod.jpeg',
    linkedin: 'https://www.linkedin.com/in/bobsmith/'
  }
]

export default function CreditsPage() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0rem auto',
        fontFamily: 'Inter, Arial, sans-serif',
        textAlign: 'center'
      }}
    >
      <h1 style={{ marginBottom: '2rem', fontWeight: '600' }}>Credits</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {people.map((person) => (
          <a
            key={person.name}
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: '220px',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'scale(1.05)')
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')
            }
          >
            <img
              src={person.image}
              alt={person.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '224px',
                borderRadius: '8px',
                marginBottom: '0.75rem'
              }}
            />
            <h2 style={{ margin: '0.5rem 0 0.25rem' }}>{person.name}</h2>
            <p style={{ margin: 0, color: '#555' }}>{person.role}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
