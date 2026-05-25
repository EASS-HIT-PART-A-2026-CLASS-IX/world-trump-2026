import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

interface Market { id: number; category: string; badge?: string; entries: any[] }

export default function Betting({ trumpMode }: { trumpMode: boolean }) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('odds').then(d => setMarkets(d.markets || [])).catch(e => setError(e.message))
  }, [])

  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'
  const gold = trumpMode ? '#FFD700' : '#C5A333'

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: gold }}>{trumpMode ? '🇺🇸 TRUMP BETTING PLAZA' : '🎰 WORLD CUP BETTING MARKETS'}</h1>
            <p className="text-sm text-gray-400">{trumpMode ? 'LAS VEGAS — THE BEST ODDS, THE BIGGEST WINS, FOLKS!' : 'Polymarket-style odds — fractional & moneyline'}</p>
          </div>
        </div>
        {error && <div className="card mb-4 border-red-500/50 text-red-400 text-sm">Error: {error}</div>}

        {markets.map(market => (
          <div key={market.id} className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold" style={{ color: gold }}>{market.badge && <span className="mr-2">{market.badge}</span>}{market.category}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-xs text-gray-500 border-b border-[#30363D]">
                  <th className="text-left py-2 px-3">{market.id === 2 || market.id === 3 ? 'Player' : 'Entry'}</th>
                  <th className="text-left py-2 px-3">Nation</th>
                  <th className="text-right py-2 px-3">UK</th>
                  <th className="text-right py-2 px-3">US Moneyline</th>
                  <th className="text-right py-2 px-3">Prob</th>
                </tr></thead>
                <tbody>
                  {market.entries.map((entry: any, i: number) => {
                    const name = entry.player || entry.team || entry.entry || entry.group || entry.favorite
                    const nation = entry.nation || entry.group || entry.fifa_code || ''
                    const ml = entry.moneyline; const isFav = ml && ml.startsWith('-')
                    return (
                      <tr key={i} className="border-b border-[#21262D] hover:bg-[#1C2129] transition-colors">
                        <td className="py-2.5 px-3 font-medium">{isFav && <span className="text-green-400 mr-1">★</span>}{name}</td>
                        <td className="py-2.5 px-3 text-gray-400">{nation}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-vegas-gold">{entry.fractional}</td>
                        <td className={`py-2.5 px-3 text-right font-mono font-bold ${isFav ? 'text-green-400' : 'text-red-400'}`}>{ml}</td>
                        <td className="py-2.5 px-3 text-right text-gray-400">{entry.type || entry.probability_pct ? (typeof entry.probability_pct === 'number' ? `${entry.probability_pct}%` : entry.type) : '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {trumpMode && (
          <div className="card text-center py-8 border-trump-gold/50">
            <div className="text-4xl mb-4">🇺🇸</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#FFD700' }}>250 YEARS OF WINNING!</h2>
            <p className="text-gray-400 mb-4 max-w-lg mx-auto">America turns 250 on July 4, 2026 — right in the middle of the World Cup. Make Soccer Great Again!</p>
            <div className="text-4xl font-black" style={{ color: '#BF0A30' }}>USA! USA! USA!</div>
          </div>
        )}
      </div>
    </div>
  )
}
