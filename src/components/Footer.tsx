'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '3rem',
        padding: '1.5rem 0',
        textAlign: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '0.9rem',
        color: '#666',
        borderTop: '1px solid #eaeaea',
        bottom: '0',
        width: '100%'
      }}
    >
      <p style={{ marginBottom: '0.5rem' }}>
        © {new Date().getFullYear()} Should I Buy It?
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/credits">Credits</Link>
      </div>
    </footer>
  )
}
