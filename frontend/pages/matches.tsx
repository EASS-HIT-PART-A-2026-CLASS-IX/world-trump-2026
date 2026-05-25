import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

const STAGES = ['Group', 'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Third Place', 'Final']

export default function Matches({ hackerMode }: { hackerMode: boolean }) {
  const [matches, setMatches] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [stage, setStage] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAPI('matches'), fetchAPI('teams')])
      .then(([m, t]) => { setMatches(m.matches || []); setTeams(t.teams || []) })
      .catch(e => setError(e.message))
  }, [])

  const getTeam = (id: number) => teams.find(t => t.id === id)
  const filtered = stage === 'all' ? matches : matches.filter((m: any) => m.stage.includes(stage))
  const c = hackerMode ? { text: '#ffb000', dim: '#664400', bg: '#0a0000' } : { text: '#00cc44', dim: '#006622', bg: '#0a0a0a' }

  return (
    <div style={{ background: c.bg, minHeight: 'calc(100vh - 40px)', paddingBottom: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ color: c.dim, fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: c.text }}>$</span> ls /schedule/ --sort=date
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 'bold', color: c.text, textShadow: `0 0 10px ${c.text}`, margin: '0 0 4px 0', letterSpacing: 2 }}>
          ╔══ MATCH SCHEDULE ══╗
        </h1>
        <div style={{ fontSize: 11, color: c.dim, marginBottom: 16 }}>June 11 → July 19, 2026 · {filtered.length} of 104 matches</div>

        {error && <div style={{ border: '1px solid #ff3333', padding: '8px 12px', marginBottom: 16, color: '#ff3333', fontSize: 12 }}>[ERROR] {error}</div>}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 20 }}>
          <button className="terminal-btn active" onClick={() => setStage('all')} style={stage === 'all' ? { color: c.text, borderColor: c.text } : {}}>all</button>
          {STAGES.map(s => (
            <button key={s} className="terminal-btn" onClick={() => setStage(s)} style={stage === s ? { color: c.text, borderColor: c.text } : {}}>{s}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map((m: any) => {
            const home = getTeam(m.home); const away = getTeam(m.away)
            return (
              <div key={m.id} className="terminal-card" style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', fontSize: 12 }}>
                <span style={{ width: 80, color: '#004d1a', fontSize: 11, flexShrink: 0 }}>{m.date}</span>
                <span style={{ width: 40, color: '#003300', fontSize: 10, flexShrink: 0 }}>{m.time}</span>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ width: 120, textAlign: 'right', color: '#88cc88' }}>{home?.name || 'TBD'}</span>
                  <span style={{ fontSize: 16 }}>{home?.flag || '⚽'}</span>
                  <span style={{ color: '#003300', margin: '0 8px', fontSize: 10 }}>vs</span>
                  <span style={{ fontSize: 16 }}>{away?.flag || '⚽'}</span>
                  <span style={{ width: 120, color: '#88cc88' }}>{away?.name || 'TBD'}</span>
                </div>
                <span style={{ width: 100, textAlign: 'right', color: c.text, fontSize: 11, flexShrink: 0 }}>{m.stage}</span>
                <span style={{ width: 50, textAlign: 'right', color: '#003300', fontSize: 10, flexShrink: 0 }}>v{m.venue}</span>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', color: '#003300', fontSize: 10, marginTop: 24 }}>
          j/k scroll · / search · :q back to home
        </div>
      </div>
    </div>
  )
}
