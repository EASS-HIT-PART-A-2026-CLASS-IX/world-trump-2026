import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Venues({ trumpMode }: { trumpMode: boolean }) {
  const [venues, setVenues] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('venues').then(d => setVenues(d.venues||[])).catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Venues</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>16 stadiums · 11 USA · 3 Mexico · 2 Canada</p>
        </header>
        {error && <div className="pm-card" style={{ borderColor: 'var(--red)', color: 'var(--red)', marginBottom: 16 }}>{error}</div>}

        {[
          { c: 'United States', f: '🇺🇸', v: venues.filter((x:any)=>x.country==='USA') },
          { c: 'Mexico', f: '🇲🇽', v: venues.filter((x:any)=>x.country==='Mexico') },
          { c: 'Canada', f: '🇨🇦', v: venues.filter((x:any)=>x.country==='Canada') },
        ].map(cx => (
          <section key={cx.c} style={{ marginBottom: 28 }} aria-label={`${cx.c} venues`}>
            <h2 className="pm-section-title" style={{ marginBottom: 14 }}>{cx.f} {cx.c} <span style={{ fontSize: 11, color: 'var(--dim)', fontWeight: 400 }}>({cx.v.length})</span></h2>
            <div className="pm-grid-4">
              {cx.v.map((v:any) => (
                <article key={v.id} className="pm-card pm-card-clickable" style={{ padding: 14 }} tabIndex={0}>
                  <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{v.name}</h3>
                  <div style={{ color: 'var(--muted)', fontSize: 12 }}>{v.city}, {v.state}</div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12 }}>
                    <div><span style={{ color: 'var(--dim)', fontSize: 10 }}>Capacity</span><div style={{ fontWeight: 600 }}>{v.capacity.toLocaleString()}</div></div>
                    <div><span style={{ color: 'var(--dim)', fontSize: 10 }}>Type</span><div style={{ fontWeight: 600 }}>{v.type}</div></div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                    {v.matches.slice(0, 4).map((m:string)=><span key={m} style={{ padding: '2px 6px', borderRadius: 3, background: '#222339', fontSize: 10, color: 'var(--dim)' }}>{m}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
