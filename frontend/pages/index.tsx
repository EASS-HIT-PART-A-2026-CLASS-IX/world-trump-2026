import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Home({ trumpMode }: { trumpMode: boolean }) {
  const [teams, setTeams] = useState<any[]>([])
  const [venues, setVenues] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])

  useEffect(() => {
    Promise.all([
      fetch(`${API}/teams`).then(r => r.json()),
      fetch(`${API}/venues`).then(r => r.json()),
      fetch(`${API}/matches?stage=group`).then(r => r.json()),
      fetch(`${API}/usa250`).then(r => r.json()),
      fetch(`${API}/trump-quotes`).then(r => r.json()),
    ]).then(([t, v, m, u, q]) => {
      setTeams(t.teams || [])
      setVenues(v.venues || [])
      setMatches(m.matches || [])
      setUsa250(u)
      setQuotes(q.quotes || [])
    }).catch(console.error)
  }, [])

  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2" style={{ color: trumpMode ? '#FFD700' : '#C5A333' }}>
            WORLD CUP 2026
          </h1>
          <p className="text-lg text-gray-400 mb-1">June 11 — July 19 · USA · Canada · Mexico</p>
          <p className="text-sm text-gray-500">48 Teams · 16 Venues · 104 Matches · 1 Champion</p>
          {trumpMode && (
            <div className="mt-4 text-2xl font-bold" style={{ color: '#FFD700' }}>
              MAKE SOCCER GREAT AGAIN! 🇺🇸
            </div>
          )}
        </div>

        <div className="overflow-hidden bg-[#111]/50 border border-yellow-600/30 rounded-lg mb-8">
          <div className="ticker py-2 text-sm text-yellow-500/70 font-mono">
            {quotes.length > 0 ? quotes.join(' · ') : 'Loading...'} &nbsp;&nbsp;
            {quotes.length > 0 ? quotes.join(' · ') : 'Loading...'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Teams" value="48" icon="🌍" trumpMode={trumpMode} />
          <StatCard label="Venues" value="16" icon="🏟️" trumpMode={trumpMode} />
          <StatCard label="Matches" value="104" icon="⚽" trumpMode={trumpMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-lg font-bold mb-4 text-vegas-gold">🏆 Tournament Winner Odds</h2>
            <div className="space-y-2">
              {[
                { team: 'Spain', odds: '+450', pct: 18, color: '#C60B1E' },
                { team: 'France', odds: '+500', pct: 16, color: '#002395' },
                { team: 'England', odds: '+600', pct: 14, color: '#CF081F' },
                { team: 'Brazil', odds: '+800', pct: 11, color: '#009C3B' },
                { team: 'Argentina', odds: '+800', pct: 11, color: '#75AADB' },
              ].map((o, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-24 text-gray-300">{o.team}</span>
                  <div className="flex-1 h-3 bg-[#21262D] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: o.color }} />
                  </div>
                  <span className="w-16 text-right font-mono text-vegas-gold">{o.odds}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4 text-vegas-gold">🎯 Golden Boot Odds</h2>
            <div className="space-y-2">
              {[
                { player: 'Kylian Mbappe', nation: 'FRA', odds: '+600', pct: 22 },
                { player: 'Harry Kane', nation: 'ENG', odds: '+700', pct: 20 },
                { player: 'Erling Haaland', nation: 'NOR', odds: '+1000', pct: 16 },
                { player: 'Lionel Messi', nation: 'ARG', odds: '+1200', pct: 14 },
                { player: 'Lamine Yamal', nation: 'ESP', odds: '+1400', pct: 12 },
              ].map((o, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-36 text-gray-300">{o.player}</span>
                  <span className="w-8 text-xs text-gray-500">{o.nation}</span>
                  <div className="flex-1 h-3 bg-[#21262D] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-vegas-gold/60" style={{ width: `${o.pct}%` }} />
                  </div>
                  <span className="w-16 text-right font-mono text-vegas-gold">{o.odds}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {usa250 && (
          <div className="card mb-8">
            <h2 className="text-lg font-bold mb-4">
              🇺🇸 {usa250.title} — {usa250.date}
            </h2>
            <p className="text-sm text-gray-400 mb-4">{usa250.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {usa250.facts.slice(0, 6).map((f: any) => (
                <div key={f.id} className="p-3 bg-[#0D1117] rounded border border-[#30363D]">
                  <div className="text-xs font-bold text-vegas-gold mb-1">{f.colony} ({f.year})</div>
                  <div className="text-xs text-gray-400">{f.fact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card mb-8">
          <h2 className="text-lg font-bold mb-4 text-vegas-gold">📅 First Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matches.slice(0, 6).map((m: any) => (
              <div key={m.id} className="flex items-center gap-3 p-3 bg-[#0D1117] rounded border border-[#30363D]">
                <div className="text-xs text-gray-500 w-20">{m.date}</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-vegas-gold">{m.stage}</div>
                  <div className="text-xs text-gray-400">Venue #{m.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, trumpMode }: { label: string; value: string; icon: string; trumpMode: boolean }) {
  return (
    <div className={`card text-center ${trumpMode ? 'border-trump-gold/50' : ''}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-4xl font-bold font-mono ${trumpMode ? 'text-trump-gold' : 'text-vegas-gold'}`}>{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}
