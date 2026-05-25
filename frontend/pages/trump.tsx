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
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }} aria-hidden="true">🇺🇸</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', background: 'linear-gradient(135deg, #FFD700, #F5A623, #BF0A30)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
            Make Soccer Great Again
          </h1>
          <p style={{ color: 'var(--gold)', fontSize: 13, marginTop: 6, fontWeight: 500 }}>
            President Trump's Official World Cup 2026 Hub · USA&nbsp;250 · #MSGA
          </p>
        </header>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }} role="alert">Error: {error}</div>}

        <div className="pm-grid-3" style={{ marginBottom: 24 }}>
          {[
            { value: '250', label: 'Years of Greatness', sub: 'July&nbsp;4, 1776 → 2026' },
            { value: '3rd', label: 'USA Hosts World Cup', sub: '1994 · 2026 · history' },
            { value: 'Group&nbsp;D', label: 'USMNT Position', sub: 'Opening match at SoFi' },
            { value: '🏅', label: 'FIFA Peace Prize', sub: 'Awarded to President Trump' },
          ].map(s => (
            <div key={s.label} className="pm-card pm-stat">
              <div className="pm-stat-value" style={{ color: 'var(--gold)' }}>{s.value}</div>
              <div className="pm-stat-label">{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="pm-grid-2" style={{ marginBottom: 24 }}>
          <section className="pm-card" aria-label="Official statements">
            <h2 className="pm-section-title">
              <span className="pm-badge gold">Official</span> Statements
            </h2>
            <div style={{ marginTop: 8 }}>
              {quotes.length > 0 ? quotes.map((q, i) => (
                <blockquote key={i} className="pm-card" style={{ padding: 12, marginBottom: 8, borderColor: 'rgba(245,166,35,0.15)' }}>
                  <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 500 }}>&ldquo;{q}&rdquo;</div>
                </blockquote>
              )) : <div className="pm-empty">Loading statements…</div>}
            </div>
          </section>

          <section className="pm-card" aria-label="Submit your prediction">
            <h2 className="pm-section-title">
              <span className="pm-badge gold">Predict</span> Your Forecast
            </h2>
            {!submitted ? (
              <div style={{ marginTop: 8 }}>
                <label htmlFor="prediction-input" style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Who wins the World Cup — and how?
                </label>
                <textarea
                  id="prediction-input"
                  name="prediction"
                  spellCheck={false}
                  style={{ width: '100%', padding: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: 13, resize: 'vertical', minHeight: 100 }}
                  placeholder="USA beats Brazil 3-1 at MetLife. Pulisic hat trick. Trump presents the trophy. HISTORY!"
                  value={prediction} onChange={e => setPrediction(e.target.value)}
                />
                <button
                  onClick={() => { if (prediction.trim()) setSubmitted(true) }}
                  className="pm-btn pm-btn-primary" style={{ width: '100%', marginTop: 10, padding: '10px 0', fontSize: 14, borderRadius: 8, background: 'var(--gold)', color: '#1a1218', border: '1px solid var(--gold)' }}
                >
                  Submit Prediction · MSGA
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }} aria-live="polite">
                <div style={{ fontSize: 48 }} aria-hidden="true">🇺🇸</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold)', marginTop: 10 }}>Prediction Locked</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Tremendous. The best prediction. Believe me.</div>
              </div>
            )}
          </section>
        </div>

        {usa250 && (
          <section className="pm-card" style={{ marginBottom: 24 }} aria-label="USA 250th anniversary facts">
            <h2 className="pm-section-title">
              <span className="pm-badge gold">USA&nbsp;250</span>
              13&nbsp;Colonies · 250&nbsp;Years · {usa250.date}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 14 }}>{usa250.description}</p>
            <div className="pm-grid-4">
              {usa250.facts.map((f: any) => (
                <article key={f.id} className="pm-card" style={{ padding: 12 }}>
                  <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>⭐ {f.colony}</h3>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{f.year}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.fact}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        <nav style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 12 }} aria-label="Quick links">
          <a href="/betting" className="pm-btn pm-btn-primary" style={{ background: 'var(--gold)', color: '#1a1218' }}>Betting Exchange →</a>
          <span style={{ margin: '0 12px' }}>·</span>
          <a href="/matches" className="pm-btn">Matches →</a>
        </nav>
      </div>
    </div>
  )
}
