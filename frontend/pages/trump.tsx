import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Trump({ trumpMode }: { trumpMode: boolean }) {
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])
  const [prediction, setPrediction] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAPI('usa250'), fetchAPI('trump-quotes')])
      .then(([u, q]) => { setUsa250(u); setQuotes(q.quotes||[]) })
      .catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🇺🇸</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', background: 'linear-gradient(135deg, #FFD700, #F5A623, #BF0A30)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Make Soccer Great Again
          </h1>
          <p style={{ color: 'var(--gold)', fontSize: 13, marginTop: 6, fontWeight: 500 }}>President Trump's Official World Cup 2026 Hub · USA&nbsp;250</p>
        </header>

        {error && <div className="pm-card" style={{ borderColor: 'var(--red)', color: 'var(--red)', marginBottom: 16 }}>{error}</div>}

        <div className="pm-grid-3" style={{ marginBottom: 24 }}>
          {[{v:'250',l:'Years of Greatness',s:'July 4, 1776 → 2026'},{v:'3rd',l:'USA Hosts',s:'1994 · 2026 · history'},{v:'Group D',l:'USMNT',s:'Opening at SoFi'},{v:'🏅',l:'FIFA Peace Prize',s:'Awarded to Trump'}].map(s=>(
            <div key={s.l} className="pm-card pm-stat">
              <div className="pm-stat-value" style={{ color: 'var(--gold)' }}>{s.v}</div>
              <div className="pm-stat-label">{s.l}</div>
              <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>{s.s}</div>
            </div>
          ))}
        </div>

        <div className="pm-grid-2" style={{ marginBottom: 24 }}>
          <section className="pm-card" aria-label="Official statements">
            <h2 className="pm-section-title"><span className="pm-badge gold">Official</span> Statements</h2>
            {quotes.map((q,i)=>(
              <blockquote key={i} className="pm-card" style={{ padding: 12, marginBottom: 8, borderColor: 'rgba(245,166,35,0.15)' }}>
                <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 500 }}>“{q}”</div>
              </blockquote>
            ))}
          </section>
          <section className="pm-card" aria-label="Submit prediction">
            <h2 className="pm-section-title"><span className="pm-badge gold">Predict</span> Your Forecast</h2>
            {!submitted ? (
              <div style={{ marginTop: 8 }}>
                <label htmlFor="pred-input" style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Who wins the World Cup — and how?</label>
                <textarea id="pred-input" name="prediction" spellCheck={false}
                  style={{ width: '100%', padding: 10, background: '#222339', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontFamily: 'inherit', fontSize: 13, resize: 'vertical', minHeight: 100 }}
                  placeholder="USA beats Brazil 3-1 at MetLife…"
                  value={prediction} onChange={e => setPrediction(e.target.value)} />
                <button onClick={() => { if (prediction.trim()) setSubmitted(true) }}
                  className="pm-btn primary" style={{ width: '100%', marginTop: 10, padding: 10, fontSize: 14, borderRadius: 8 }}>
                  Submit Prediction
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }} aria-live="polite">
                <div style={{ fontSize: 48 }}>🇺🇸</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold)', marginTop: 10 }}>Prediction Locked</div>
                <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>Tremendous.</div>
              </div>
            )}
          </section>
        </div>

        {usa250 && (
          <section className="pm-card" style={{ marginBottom: 24 }} aria-label="USA 250th facts">
            <h2 className="pm-section-title"><span className="pm-badge gold">USA&nbsp;250</span> 13 Colonies · 250 Years · {usa250.date}</h2>
            <div className="pm-grid-4">
              {usa250.facts.map((f:any)=>(
                <div key={f.id} className="pm-card" style={{ padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>⭐ {f.colony}</div>
                  <div style={{ fontSize: 10, color: 'var(--dim)', marginBottom: 4 }}>{f.year}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{f.fact}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <nav style={{ textAlign: 'center', padding: '20px 0' }}>
          <a href="/betting" className="pm-btn primary">Betting Exchange →</a>
          <span style={{ margin: '0 12px' }}>·</span>
          <a href="/matches" className="pm-btn">Matches →</a>
        </nav>
      </div>
    </div>
  )
}
