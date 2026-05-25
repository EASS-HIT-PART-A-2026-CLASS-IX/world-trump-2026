import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Matches({ trumpMode }: { trumpMode: boolean }) {
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
  const stages = ['Group', 'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Third Place', 'Final']
  const filtered = stage === 'all' ? matches : matches.filter((m: any) => m.stage.includes(stage))
  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: trumpMode ? '#FFD700' : '#C5A333' }}>📅 Match Schedule</h1>
        <p className="text-sm text-gray-400 mb-6">June 11 — July 19, 2026 · {filtered.length} Matches</p>
        {error && <div className="card mb-4 border-red-500/50 text-red-400 text-sm">Error: {error}</div>}

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setStage('all')} className="stage-btn active" style={stage==='all'?{borderColor:'#C5A333',color:'#C5A333'}:{}}>All</button>
          {stages.map(s => (
            <button key={s} onClick={() => setStage(s)} className="stage-btn" style={stage===s?{borderColor:'#C5A333',color:'#C5A333'}:{}}>{s}</button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((m: any) => {
            const home = getTeam(m.home); const away = getTeam(m.away)
            return (
              <div key={m.id} className="card flex items-center gap-3 hover:border-vegas-gold/30 transition-colors">
                <div className="w-24 text-xs text-gray-500"><div>{m.date}</div><div>{m.time}</div></div>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-sm w-28 text-right">{home?.name || 'TBD'}</span>
                  <span className="text-lg">{home?.flag || '⚽'}</span>
                  <span className="text-xs text-gray-500 font-mono">vs</span>
                  <span className="text-lg">{away?.flag || '⚽'}</span>
                  <span className="text-sm w-28">{away?.name || 'TBD'}</span>
                </div>
                <div className="text-right"><div className="text-xs font-bold text-vegas-gold">{m.stage}</div><div className="text-xs text-gray-500">{m.group || ''}</div></div>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .stage-btn { padding: 4px 12px; font-size: 12px; border: 1px solid #30363D; border-radius: 6px; background: #161B22; color: #E6EDF3; cursor: pointer; transition: all 0.2s; }
        .stage-btn:hover { border-color: #C5A333; color: #C5A333; }
      `}</style>
    </div>
  )
}
