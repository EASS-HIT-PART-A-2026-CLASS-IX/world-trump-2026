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
        <div style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4B7BF5, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Venues
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>16 stadiums · 11 USA · 3 Mexico · 2 Canada</p>
        </div>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }}>Error: {error}</div>}

        {[
          { country: 'United States', flag: '🇺🇸', venues: venues.filter((v: any) => v.country === 'USA') },
          { country: 'Mexico', flag: '🇲🇽', venues: venues.filter((v: any) => v.country === 'Mexico') },
          { country: 'Canada', flag: '🇨🇦', venues: venues.filter((v: any) => v.country === 'Canada') },
        ].map(cx => (
          <div key={cx.country} style={{ marginBottom: 28 }}>
            <div className="pm-section-title" style={{ marginBottom: 14 }}>
              <span className="pm-badge blue">{cx.flag}</span>
              {cx.country}
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>({cx.venues.length})</span>
            </div>
            <div className="pm-grid-4">
              {cx.venues.map((v: any) => (
                <div key={v.id} className="pm-card pm-card-clickable" style={{ padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{v.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{v.city}, {v.state}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, fontSize: 12 }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>CAPACITY</span>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.capacity.toLocaleString()}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>TYPE</span>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.type}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                    {v.matches.slice(0, 4).map((m: string) => (
                      <span key={m} style={{ padding: '2px 6px', borderRadius: 3, background: 'var(--bg-secondary)', fontSize: 10, color: 'var(--text-muted)' }}>{m}</span>
                    ))}
                    {v.matches.length > 4 && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{v.matches.length - 4}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
