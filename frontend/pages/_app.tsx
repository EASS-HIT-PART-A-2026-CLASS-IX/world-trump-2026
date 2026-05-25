import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

const API_BASE = '/api'

export async function fetchAPI(path: string) {
  const res = await fetch(`${API_BASE}/${path}`)
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export default function App({ Component, pageProps }: AppProps) {
  const [trumpMode, setTrumpMode] = useState(false)
  useEffect(() => { document.body.classList.toggle('trump-mode', trumpMode) }, [trumpMode])

  return (
    <div>
      <nav className="pm-navbar" aria-label="Main">
        <a href="/" className="pm-nav-brand" translate="no">World Trump 2026</a>
        <div className="pm-nav-divider" />
        <a href="/">Markets</a>
        <a href="/matches">Matches</a>
        <a href="/betting">Odds</a>
        <a href="/venues">Venues</a>
        <a href="/trump" style={{ color: 'var(--gold)' }}>USA&nbsp;250</a>
        <div style={{ flex: 1 }} />
        <button onClick={() => setTrumpMode(!trumpMode)}
          style={{ background: trumpMode ? 'rgba(245,166,35,0.15)' : 'transparent', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 600, color: trumpMode ? 'var(--gold)' : 'var(--muted)' }}>
          {trumpMode ? 'MAGA' : 'Standard'}
        </button>
      </nav>
      <main style={{ paddingTop: 48 }} id="main-content">
        <Component {...pageProps} trumpMode={trumpMode} />
      </main>
    </div>
  )
}
