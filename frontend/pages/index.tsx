import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Home({ trumpMode }: { trumpMode: boolean }) {
  const [teams, setTeams] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAPI('teams'), fetchAPI('matches?stage=group'), fetchAPI('usa250'), fetchAPI('trump-quotes')])
      .then(([t, m, u, q]) => { setTeams(t.teams||[]); setMatches(m.matches||[]); setUsa250(u); setQuotes(q.quotes||[]) })
      .catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: trumpMode ? 'linear-gradient(135deg, #FFD700, #F5A623)' : 'linear-gradient(135deg, #4B7BF5, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
            World Cup 2026 Markets
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
            June&nbsp;11 – July&nbsp;19 · 48&nbsp;teams · 16&nbsp;venues · 104&nbsp;matches
          </p>
        </header>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }} role="alert">Error: {error}</div>}

        <div className="pm-ticker" style={{ marginBottom: 20 }}>
          <div className="pm-ticker-inner" aria-live="polite" aria-label="Live updates">
            {quotes.length > 0 ? quotes.join('  ·  ') : 'President Trump welcomes the world to the GREATEST World Cup · 250&nbsp;years of American greatness · MAKE SOCCER GREAT AGAIN · USA! USA! USA!'}
          </div>
        </div>

        <div className="pm-grid-3" style={{ marginBottom: 24 }}>
          <div className="pm-card pm-stat">
            <div className="pm-stat-value">{teams.length || 48}</div>
            <div className="pm-stat-label">Qualified Teams</div>
          </div>
          <div className="pm-card pm-stat">
            <div className="pm-stat-value">16</div>
            <div className="pm-stat-label">Venues</div>
          </div>
          <div className="pm-card pm-stat">
            <div className="pm-stat-value">104</div>
            <div className="pm-stat-label">Total Matches</div>
          </div>
          <div className="pm-card pm-stat">
            <div className="pm-stat-value">6</div>
            <div className="pm-stat-label">Live Markets</div>
          </div>
        </div>

        <div className="pm-grid-2" style={{ marginBottom: 24 }}>
          <section className="pm-card" aria-label="Tournament winner odds">
            <h2 className="pm-section-title">
              <span className="pm-badge blue">Market</span> Tournament Winner
            </h2>
            <div style={{ marginTop: 8 }}>
              {[
                { team: 'Spain', odds: '+450', pct: 18, fav: true },
                { team: 'France', odds: '+500', pct: 16, fav: true },
                { team: 'England', odds: '+600', pct: 14, fav: true },
                { team: 'Brazil', odds: '+800', pct: 11 },
                { team: 'Argentina', odds: '+800', pct: 11 },
                { team: 'Portugal', odds: '+1000', pct: 9 },
                { team: 'Germany', odds: '+1400', pct: 7 },
                { team: 'USA', odds: '+6600', pct: 1.5 },
              ].map((o, i) => (
                <div key={i} className="pm-odds-row" style={{ fontSize: 13, cursor: 'pointer', borderRadius: 6, padding: '7px 6px' }}
                  tabIndex={0} role="button" aria-label={`${o.team} at ${o.odds}`}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault() } }}
                >
                  <span style={{ width: 90, color: 'var(--text-primary)', fontWeight: o.fav ? 600 : 400 }}>{o.team}</span>
                  <div className="pm-odds-bar">
                    <div className={`pm-odds-bar-fill ${o.fav ? 'green' : 'blue'}`} style={{ width: `${o.pct * 3.5}%` }} />
                  </div>
                  <div className={`pm-price ${o.fav ? 'green' : ''}`} style={{ width: 60, justifyContent: 'center', fontSize: 13 }}>
                    {o.odds}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pm-card" aria-label="Golden boot odds">
            <h2 className="pm-section-title">
              <span className="pm-badge gold">Market</span> Golden Boot
            </h2>
            <div style={{ marginTop: 8 }}>
              {[
                { player: 'Kylian Mbappé', nation: 'FRA', odds: '+600', pct: 22 },
                { player: 'Harry Kane', nation: 'ENG', odds: '+700', pct: 20 },
                { player: 'Erling Haaland', nation: 'NOR', odds: '+1000', pct: 16 },
                { player: 'Lionel Messi', nation: 'ARG', odds: '+1200', pct: 14 },
                { player: 'Lamine Yamal', nation: 'ESP', odds: '+1400', pct: 12 },
                { player: 'Cristiano Ronaldo', nation: 'POR', odds: '+1800', pct: 9 },
                { player: 'Vinícius&nbsp;Jr', nation: 'BRA', odds: '+2000', pct: 8 },
                { player: 'Christian Pulisic', nation: 'USA', odds: '+10000', pct: 2 },
              ].map((o, i) => (
                <div key={i} className="pm-odds-row" style={{ fontSize: 13, cursor: 'pointer', borderRadius: 6, padding: '7px 6px' }}
                  tabIndex={0} role="button" aria-label={`${o.player} at ${o.odds}`}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault() } }}
                >
                  <span style={{ width: 130, color: 'var(--text-primary)' }}>{o.player}</span>
                  <span style={{ width: 30, fontSize: 10, color: 'var(--text-muted)' }}>{o.nation}</span>
                  <div className="pm-odds-bar">
                    <div className="pm-odds-bar-fill gold" style={{ width: `${o.pct * 3}%` }} />
                  </div>
                  <div className="pm-price" style={{ width: 60, justifyContent: 'center', fontSize: 13 }}>{o.odds}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="pm-card" style={{ marginBottom: 24 }} aria-label="Upcoming matches">
          <h2 className="pm-section-title">
            <span className="pm-badge green">Schedule</span> Upcoming Matches
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 8, marginTop: 8 }}>
            {matches.length > 0 ? matches.slice(0, 10).map((m: any) => (
              <div key={m.id} className="pm-card pm-card-clickable" style={{ padding: '10px 12px' }} tabIndex={0} role="button" aria-label={`${m.stage} on ${m.date}`}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.date} · {m.time}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{m.stage}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Venue&nbsp;#{m.venue}</div>
              </div>
            )) : <div className="pm-empty" style={{ gridColumn: '1 / -1' }}>Loading schedule…</div>}
          </div>
        </section>

        {usa250 && (
          <section className="pm-card" style={{ marginBottom: 24 }} aria-label="USA 250th anniversary facts">
            <h2 className="pm-section-title">
              <span className="pm-badge gold">USA&nbsp;250</span> Semiquincentennial — {usa250.date}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 12 }}>{usa250.description}</p>
            <div className="pm-grid-4">
              {usa250.facts.slice(0, 6).map((f: any) => (
                <div key={f.id} className="pm-card" style={{ padding: 12 }}>
                  <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{f.colony} · {f.year}</h3>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.fact}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <nav style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: 12 }} aria-label="Quick links">
          <a href="/matches" className="pm-btn" style={{ marginRight: 8 }}>All Matches →</a>
          <a href="/betting" className="pm-btn" style={{ marginRight: 8 }}>All Markets →</a>
          <a href="/trump" className="pm-btn">USA&nbsp;250 Hub →</a>
        </nav>
      </div>
    </div>
  )
}
