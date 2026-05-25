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
      <nav className="pm-nav" aria-label="Main navigation">
        <div className="pm-nav-inner">
          <a href="/" className="pm-nav-link" style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            <span translate="no">World Trump 2026</span>
          </a>
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} aria-hidden="true" />
          <a href="/" className="pm-nav-link">Markets</a>
          <a href="/matches" className="pm-nav-link">Matches</a>
          <a href="/betting" className="pm-nav-link">Odds</a>
          <a href="/venues" className="pm-nav-link">Venues</a>
          <a href="/trump" className="pm-nav-link" style={{ color: 'var(--gold)' }}>USA&nbsp;250</a>
          <div style={{ flex: 1 }} />
          <div
            className="pm-toggle"
            role="radiogroup"
            aria-label="Display mode"
            onClick={() => setTrumpMode(!trumpMode)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTrumpMode(!trumpMode) } }}
            tabIndex={0}
          >
            <div className={`pm-toggle-option ${!trumpMode ? 'active' : ''}`} role="radio" aria-checked={!trumpMode} aria-label="Standard mode">Standard</div>
            <div className={`pm-toggle-option ${trumpMode ? 'active' : ''}`} role="radio" aria-checked={trumpMode} aria-label="MAGA mode">MAGA</div>
          </div>
        </div>
      </nav>
      <main style={{ paddingTop: 48 }} id="main-content">
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
