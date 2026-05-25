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
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Match Schedule</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} of 104 matches</p>
        </header>
        {error && <div className="pm-card" style={{ borderColor: 'var(--red)', color: 'var(--red)', marginBottom: 16 }}>{error}</div>}

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }} aria-label="Filter">
          <button className={`pm-btn ${stage==='all'?'active':''}`} onClick={()=>setStage('all')}>All</button>
          {STAGES.map(s=><button key={s} className={`pm-btn ${stage===s?'active':''}`} onClick={()=>setStage(s)}>{s}</button>)}
        </nav>

        <div className="pm-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="pm-table">
            <thead><tr>
              <th>Date</th><th>Time</th><th>Home</th><th></th><th>Away</th><th>Stage</th><th style={{textAlign:'right'}}>Venue</th>
            </tr></thead>
            <tbody>
              {filtered.map((m:any)=>{
                const h=getTeam(m.home), a=getTeam(m.away)
                return <tr key={m.id} tabIndex={0}>
                  <td style={{fontSize:12,color:'var(--muted)',minWidth:90}}>{m.date}</td>
                  <td style={{fontSize:12,color:'var(--dim)'}}>{m.time}</td>
                  <td style={{fontWeight:500}}>{h?.flag||''} {h?.name||'TBD'}</td>
                  <td style={{color:'var(--dim)',fontSize:12}}>vs</td>
                  <td style={{fontWeight:500}}>{a?.flag||''} {a?.name||'TBD'}</td>
                  <td><span className="pm-badge blue">{m.stage}</span></td>
                  <td style={{textAlign:'right',fontSize:12,color:'var(--dim)'}}>#{m.venue}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
