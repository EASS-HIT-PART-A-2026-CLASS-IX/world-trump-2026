import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [hackerMode, setHackerMode] = useState(false)

  return (
    <div className={hackerMode ? 'hacker-mode' : ''}>
      <nav style={{ background: '#080c08', borderBottom: '1px solid #1a3a1a', position: 'fixed', top: 0, width: '100%', zIndex: 50, fontFamily: 'inherit' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ color: '#00cc44', fontWeight: 'bold', fontSize: 14, textShadow: '0 0 8px #00cc44' }}>
              ~/world-trump-2026
            </span>
            <span className="cursor-blink" style={{ width: 8, height: 14 }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <a href="/" className="nav-link">[home]</a>
            <a href="/matches" className="nav-link">[matches]</a>
            <a href="/betting" className="nav-link">[betting]</a>
            <a href="/venues" className="nav-link">[venues]</a>
            <a href="/trump" className="nav-link" style={{ color: '#664400' }}>[MAGA]</a>
            <button
              onClick={() => setHackerMode(!hackerMode)}
              style={{
                marginLeft: 12,
                padding: '2px 10px',
                background: hackerMode ? '#664400' : '#0a0f0a',
                border: hackerMode ? '1px solid #ffb000' : '1px solid #1a3a1a',
                color: hackerMode ? '#ffb000' : '#006622',
                fontFamily: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              {hackerMode ? '>> MAGA MODE <<' : '> hacker_mode'}
            </button>
          </div>
        </div>
      </nav>
      <main style={{ paddingTop: 40 }}>
        <Component {...pageProps} hackerMode={hackerMode} />
      </main>

      <div className="vim-mode">
        <span className="mode-name">NORMAL</span>
        <span style={{ color: '#004d1a' }}>world-trump-2026/</span>
        <span style={{ color: '#1a3a1a' }}>|</span>
        <span style={{ color: '#003300' }}>j/k scroll · q quit · :help betting</span>
        <span style={{ color: '#1a3a1a', marginLeft: 'auto' }}>1:1</span>
        <span className="vim-cursor" />
      </div>
    </div>
  )
}

export async function fetchAPI(path: string) {
  const res = await fetch(`/api/${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
