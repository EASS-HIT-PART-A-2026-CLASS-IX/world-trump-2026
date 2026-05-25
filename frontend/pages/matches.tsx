import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Matches({ trumpMode }: { trumpMode: boolean }) {
  const [matches, setMatches] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [stage, setStage] = useState('all')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/matches`).then(r => r.json()),
      fetch(`${API}/teams`).then(r => r.json()),
    ]).then(([m, t]) => {
      setMatches(m.matches || [])
      setTeams(t.teams || [])
    }).catch(console.error)
  }, [])

  const getTeam = (id: number) => teams.find(t => t.id === id)
  const stages = ['Group', 'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Third Place', 'Final']
  const filtered = stage === 'all' ? matches : matches.filter(m => m.stage.includes(stage))

  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: trumpMode ? '#FFD700' : '#C5A333' }}>
          📅 Match Schedule
        </h1>
        <p className="text-sm text-gray-400 mb-6">June 11 — July 19, 2026 · 104 Matches</p>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setStage('all')} className="stage-btn active">All (104)</button>
          {stages.map(s => (
            <button key={s} onClick={() => setStage(s)} className="stage-btn">{s}</button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((m: any) => {
            const home = getTeam(m.home)
            const away = getTeam(m.away)
            return (
              <div key={m.id} className="card flex items-center gap-4 hover:border-vegas-gold/30 transition-colors">
                <div className="w-20 text-xs text-gray-500">
                  <div>{m.date}</div>
                  <div>{m.time}</div>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-2 w-40 justify-end">
                    <span className="text-sm font-bold">{home?.name || 'TBD'}</span>
                    <span className="text-lg">{home?.flag || ''}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">VS</span>
                  <div className="flex items-center gap-2 w-40">
                    <span className="text-lg">{away?.flag || ''}</span>
                    <span className="text-sm font-bold">{away?.name || 'TBD'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-vegas-gold">{m.stage}</div>
                  <div className="text-xs text-gray-500">Venue #{m.venue}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .stage-btn {
          padding: 4px 12px;
          font-size: 12px;
          border: 1px solid #30363D;
          border-radius: 6px;
          background: #161B22;
          color: #E6EDF3;
          cursor: pointer;
          transition: all 0.2s;
        }
        .stage-btn:hover, .stage-btn.active {
          border-color: #C5A333;
          color: #C5A333;
        }
      `}</style>
    </div>
  )
}
