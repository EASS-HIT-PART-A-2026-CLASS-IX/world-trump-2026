import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

const ASCII_EAGLE = `
      ,-.
     / \\\`.         ╔══════════════════════════════════════╗
    /    \\         ║   MAKE SOCCER GREAT AGAIN!  ║
   /  _   \\        ╚══════════════════════════════════════╝
  /,-' \`-. \\
 /__|_____|__\\
    ]     [
   /_]___[_\\
   |__|__|__|
  ,'  |  |  \`.
`

export default function Trump({ hackerMode }: { hackerMode: boolean }) {
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])
  const [prediction, setPrediction] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAPI('usa250'), fetchAPI('trump-quotes')])
      .then(([u, q]) => { setUsa250(u); setQuotes(q.quotes || []) })
      .catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: '#0a0000', minHeight: 'calc(100vh - 40px)', paddingBottom: 24, fontFamily: 'inherit' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>

        <div style={{ color: '#664400', fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: '#ffb000' }}>$</span> ./broadcast --MAGA --USA250 --encrypted
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <pre style={{ color: '#664400', fontSize: 8, lineHeight: '9px', display: 'inline-block', textAlign: 'left' }}>{ASCII_EAGLE}</pre>
        </div>

        <h1 style={{ textAlign: 'center', fontSize: 28, fontWeight: 900, color: '#ffb000', textShadow: '0 0 20px #ffb000, 2px 2px 0 #661111', margin: '0 0 8px', letterSpacing: 3 }}>
          MAKE SOCCER GREAT AGAIN!
        </h1>
        <p style={{ textAlign: 'center', color: '#aa8833', fontSize: 12, marginBottom: 24 }}>
          PRESIDENT TRUMP'S OFFICIAL WORLD CUP 2026 HUB · JULY 4, 2026 · USA 250
        </p>

        {error && <div style={{ border: '1px solid #ff3333', padding: '8px 12px', marginBottom: 16, color: '#ff3333', fontSize: 12 }}>[ERROR] {error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'USA AGE', value: '250', icon: '🎂' },
            { label: 'HOST', value: '3rd', icon: '🏟️' },
            { label: 'USMNT GROUP', value: 'D', icon: '⚽' },
            { label: 'TRUMP PRIZE', value: '🏅', icon: '🏆' },
          ].map(s => (
            <div key={s.label} className="terminal-card" style={{ textAlign: 'center', borderColor: '#2a1515' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 'bold', color: '#ffb000', textShadow: '0 0 10px #ffb000' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#664400', letterSpacing: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div className="terminal-card" style={{ borderColor: '#2a1515' }}>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#ffb000', marginBottom: 10, letterSpacing: 2 }}>
              ╔══ OFFICIAL STATEMENTS ══╗
            </div>
            {quotes.map((q, i) => (
              <div key={i} style={{ padding: '6px 8px', borderLeft: '2px solid #2a1515', marginBottom: 6, fontSize: 11 }}>
                <span style={{ color: '#664400' }}>&gt; </span>
                <span style={{ color: '#aa8833' }}>{q}</span>
              </div>
            ))}
          </div>

          <div className="terminal-card" style={{ borderColor: '#332200' }}>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#ffb000', marginBottom: 10, letterSpacing: 2 }}>
              ╔══ YOUR PREDICTION ══╗
            </div>
            {!submitted ? (
              <div>
                <textarea
                  style={{
                    width: '100%', padding: '8px 10px', background: '#0a0808', border: '1px solid #2a1515',
                    color: '#aa8833', fontFamily: 'inherit', fontSize: 12, resize: 'vertical', minHeight: 80,
                    boxSizing: 'border-box',
                  }}
                  placeholder="> USA 3-1 BRAZIL. Pulisic hat trick at MetLife. Trump presents the trophy. BEST FINAL EVER."
                  value={prediction}
                  onChange={e => setPrediction(e.target.value)}
                />
                <button
                  onClick={() => { if (prediction.trim()) setSubmitted(true) }}
                  style={{
                    width: '100%', marginTop: 8, padding: '8px',
                    background: '#332200', border: '1px solid #664400', color: '#ffb000',
                    fontFamily: 'inherit', fontSize: 13, fontWeight: 'bold', cursor: 'pointer',
                    letterSpacing: 2,
                  }}
                >
                  [ SUBMIT · TRANSMIT · MSGA ]
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 40 }}>🇺🇸</div>
                <div style={{ fontSize: 14, fontWeight: 'bold', color: '#ffb000', marginTop: 8 }}>
                  PREDICTION TRANSMITTED
                </div>
                <div style={{ fontSize: 11, color: '#664400', marginTop: 4 }}>
                  SECURE CHANNEL · ENCRYPTED · TREMENDOUS
                </div>
              </div>
            )}
          </div>
        </div>

        {usa250 && (
          <div className="terminal-card" style={{ marginBottom: 24, borderColor: '#2a1515' }}>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#ffb000', marginBottom: 10, letterSpacing: 2 }}>
              ╔══ 13 COLONIES · 250 YEARS ══╗
            </div>
            <div style={{ fontSize: 11, color: '#664400', marginBottom: 12 }}>{usa250.description}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
              {usa250.facts.map((f: any) => (
                <div key={f.id} style={{ padding: '6px 8px', border: '1px solid #1a1010', fontSize: 11 }}>
                  <span style={{ color: '#ffb000' }}>[{f.year}]</span>
                  <span style={{ marginLeft: 6, color: '#aa8833' }}>{f.colony}</span>
                  <div style={{ color: '#553311', marginTop: 3 }}>{f.fact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#331a00', fontSize: 10, marginTop: 32 }}>
          <a href="/" className="nav-link" style={{ padding: '2px 8px' }}>[home]</a>
          <span style={{ margin: '0 8px' }}>│</span>
          <a href="/matches" className="nav-link" style={{ padding: '2px 8px' }}>[matches]</a>
          <span style={{ margin: '0 8px' }}>│</span>
          <a href="/betting" className="nav-link" style={{ padding: '2px 8px' }}>[betting exchange]</a>
          <br /><br />
          <span>🇺🇸 250 YEARS · 🇺🇸 WORLD CUP 2026 · 🇺🇸 MSGA</span>
        </div>
      </div>
    </div>
  )
}
