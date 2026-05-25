import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Venues({ trumpMode }: { trumpMode: boolean }) {
  const [venues, setVenues] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('venues').then(d => setVenues(d.venues||[])).catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4B7BF5, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
            Venues
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>16&nbsp;stadiums · 11&nbsp;USA · 3&nbsp;Mexico · 2&nbsp;Canada</p>
        </header>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }} role="alert">Error: {error}</div>}

        {[
          { country: 'United States', flag: '🇺🇸', venues: venues.filter((v: any) => v.country === 'USA') },
          { country: 'Mexico', flag: '🇲🇽', venues: venues.filter((v: any) => v.country === 'Mexico') },
          { country: 'Canada', flag: '🇨🇦', venues: venues.filter((v: any) => v.country === 'Canada') },
        ].map(cx => (
          <section key={cx.country} style={{ marginBottom: 28 }} aria-label={`${cx.country} venues`}>
            <h2 className="pm-section-title" style={{ marginBottom: 14 }}>
              <span className="pm-badge blue" aria-hidden="true">{cx.flag}</span>
              {cx.country}
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>({cx.venues.length})</span>
            </h2>
            <div className="pm-grid-4">
              {cx.venues.length > 0 ? cx.venues.map((v: any) => (
                <article key={v.id} className="pm-card pm-card-clickable" style={{ padding: 14 }} tabIndex={0} aria-label={`${v.name} in ${v.city}`}>
                  <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{v.name}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{v.city}, {v.state}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, fontSize: 12 }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>Capacity</span>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.capacity.toLocaleString()}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>Type</span>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.type}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                    {v.matches.slice(0, 4).map((m: string) => (
                      <span key={m} style={{ padding: '2px 6px', borderRadius: 3, background: 'var(--bg-secondary)', fontSize: 10, color: 'var(--text-muted)' }}>{m}</span>
                    ))}
                    {v.matches.length > 4 && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{v.matches.length - 4}</span>}
                  </div>
                </article>
              )) : <div className="pm-empty">Loading venues…</div>}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
