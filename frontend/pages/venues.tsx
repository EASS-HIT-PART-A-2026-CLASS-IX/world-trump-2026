import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Venues({ hackerMode }: { hackerMode: boolean }) {
  const [venues, setVenues] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('venues').then(d => setVenues(d.venues || [])).catch(e => setError(e.message))
  }, [])

  const c = hackerMode ? { text: '#ffb000', dim: '#664400', bg: '#0a0000' } : { text: '#00cc44', dim: '#006622', bg: '#0a0a0a' }

  return (
    <div style={{ background: c.bg, minHeight: 'calc(100vh - 40px)', paddingBottom: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ color: c.dim, fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: c.text }}>$</span> cat /venues/stadiums.json
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 'bold', color: c.text, textShadow: `0 0 10px ${c.text}`, margin: '0 0 4px', letterSpacing: 2 }}>
          ╔══ 16 VENUES ══╗
        </h1>
        <div style={{ fontSize: 11, color: c.dim, marginBottom: 20 }}>11 USA · 3 MEX · 2 CAN</div>

        {error && <div style={{ border: '1px solid #ff3333', padding: '8px 12px', marginBottom: 16, color: '#ff3333', fontSize: 12 }}>[ERROR] {error}</div>}

        {[
          { country: '🇺🇸 UNITED STATES', venues: venues.filter((v: any) => v.country === 'USA') },
          { country: '🇲🇽 MEXICO', venues: venues.filter((v: any) => v.country === 'Mexico') },
          { country: '🇨🇦 CANADA', venues: venues.filter((v: any) => v.country === 'Canada') },
        ].map(cx => (
          <div key={cx.country} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 'bold', color: c.text, marginBottom: 12, letterSpacing: 1 }}>
              ╔══ {cx.country} ({cx.venues.length}) ══╗
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 10 }}>
              {cx.venues.map((v: any) => (
                <div key={v.id} className="terminal-card" style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#ffb000', marginBottom: 4 }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: '#668844' }}>{v.city}, {v.state} · {v.country}</div>
                  <div style={{ fontSize: 11, color: '#446644', marginTop: 6 }}>
                    CAP: {v.capacity.toLocaleString()} · {v.type}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 6 }}>
                    {v.matches.map((m: string) => (
                      <span key={m} style={{ padding: '1px 6px', border: '1px solid #0f1a0f', fontSize: 9, color: '#003300' }}>{m}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', color: '#003300', fontSize: 10, marginTop: 24 }}>
          ╔══════════════════════════════════════╗<br />
          ║  16 stadiums · 3 nations · 1 trophy  ║<br />
          ╚══════════════════════════════════════╝
        </div>
      </div>
    </div>
  )
}
