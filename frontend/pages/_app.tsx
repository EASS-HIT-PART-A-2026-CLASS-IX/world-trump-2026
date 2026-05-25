import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [trumpMode, setTrumpMode] = useState(false)

  return (
    <div className={trumpMode ? 'trump-mode' : ''}>
      <nav className="fixed top-0 w-full z-50 bg-vegas-dark/95 backdrop-blur border-b border-vegas-green/30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <span className="font-bold text-vegas-gold font-mono">WORLD TRUMP 2026</span>
          </a>
          <div className="flex items-center gap-1">
            <a href="/" className="nav-link">Home</a>
            <a href="/matches" className="nav-link">Matches</a>
            <a href="/betting" className="nav-link">Betting</a>
            <a href="/venues" className="nav-link">Venues</a>
            <a href="/trump" className="nav-link">🇺🇸 MAGA</a>
            <button
              onClick={() => setTrumpMode(!trumpMode)}
              className={`ml-3 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                trumpMode
                  ? 'bg-trump-gold text-black shadow-lg shadow-trump-gold/50'
                  : 'bg-vegas-green/20 text-vegas-green border border-vegas-green/30'
              }`}
            >
              {trumpMode ? 'TRUMP MODE ON' : 'TRUMP MODE'}
            </button>
          </div>
        </div>
      </nav>
      <main className="pt-14">
        <Component {...pageProps} trumpMode={trumpMode} />
      </main>
    </div>
  )
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetchAPI(path: string) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
