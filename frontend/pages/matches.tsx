import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

const STAGES = ['Group', 'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Third Place', 'Final']

export default function Matches({ trumpMode }: { trumpMode: boolean }) {
  const [matches, setMatches] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [stage, setStage] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAPI('matches'), fetchAPI('teams')])
      .then(([m, t]) => { setMatches(m.matches||[]); setTeams(t.teams||[]) })
      .catch(e => setError(e.message))
  }, [])

  const getTeam = (id: number) => teams.find(t => t.id === id)
  const filtered = stage === 'all' ? matches : matches.filter((m:any) => m.stage.includes(stage))

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4B7BF5, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
            Match Schedule
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
            {filtered.length} of 104&nbsp;matches · June&nbsp;11 – July&nbsp;19, 2026
          </p>
        </header>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }} role="alert">Error: {error}</div>}

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }} aria-label="Filter by stage">
          <button className={`pm-btn ${stage === 'all' ? 'active' : ''}`} onClick={() => setStage('all')} aria-pressed={stage === 'all'}>All</button>
          {STAGES.map(s => (
            <button key={s} className={`pm-btn ${stage === s ? 'active' : ''}`} onClick={() => setStage(s)} aria-pressed={stage === s}>{s}</button>
          ))}
        </nav>

        <div className="pm-card" style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 && !error ? (
            <div className="pm-empty">No matches found for this stage</div>
          ) : (
            <table className="pm-table" role="table">
              <caption className="sr-only">World Cup 2026 match schedule filtered by {stage === 'all' ? 'all stages' : stage}</caption>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Home</th>
                  <th scope="col" aria-hidden="true"></th>
                  <th scope="col">Away</th>
                  <th scope="col">Stage</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Venue</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m: any) => {
                  const home = getTeam(m.home); const away = getTeam(m.away)
                  return (
                    <tr key={m.id} tabIndex={0}>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 12, minWidth: 90 }}>{m.date}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{m.time}</td>
                      <td style={{ fontWeight: 500 }}><span style={{ marginRight: 6 }} aria-hidden="true">{home?.flag||''}</span>{home?.name || 'TBD'}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>vs</td>
                      <td style={{ fontWeight: 500 }}><span style={{ marginRight: 6 }} aria-hidden="true">{away?.flag||''}</span>{away?.name || 'TBD'}</td>
                      <td style={{ fontSize: 12 }}><span className="pm-badge blue">{m.stage}</span></td>
                      <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: 12 }}>#{m.venue}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
