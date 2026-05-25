import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [trumpMode, setTrumpMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('trump-mode', trumpMode)
  }, [trumpMode])

  return (
    <div>
      <nav className="pm-nav">
        <div className="pm-nav-inner">
          <a href="/" style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            World Trump 2026
          </a>
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
          <a href="/" className="pm-nav-link">Markets</a>
          <a href="/matches" className="pm-nav-link">Matches</a>
          <a href="/betting" className="pm-nav-link">Odds</a>
          <a href="/venues" className="pm-nav-link">Venues</a>
          <a href="/trump" className="pm-nav-link" style={{ color: 'var(--gold)' }}>USA 250</a>
          <div style={{ flex: 1 }} />
          <div className="pm-toggle" onClick={() => setTrumpMode(!trumpMode)}>
            <div className={`pm-toggle-option ${!trumpMode ? 'active' : ''}`}>Standard</div>
            <div className={`pm-toggle-option ${trumpMode ? 'active' : ''}`}>MAGA</div>
          </div>
        </div>
      </nav>
      <main style={{ paddingTop: 48 }}>
        <Component {...pageProps} trumpMode={trumpMode} />
      </main>
    </div>
  )
}

export async function fetchAPI(path: string) {
  const res = await fetch(`/api/${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
