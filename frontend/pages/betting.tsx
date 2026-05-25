import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Market {
  id: number
  category: string
  badge?: string
  entries: any[]
}

export default function Betting({ trumpMode }: { trumpMode: boolean }) {
  const [markets, setMarkets] = useState<Market[]>([])

  useEffect(() => {
    fetch(`${API}/odds`).then(r => r.json())
      .then(data => setMarkets(data.markets || []))
      .catch(console.error)
  }, [])

  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'
  const gold = trumpMode ? '#FFD700' : '#C5A333'

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: gold }}>
              {trumpMode ? '🇺🇸 TRUMP BETTING PLAZA' : '🎰 WORLD CUP BETTING MARKETS'}
            </h1>
            <p className="text-sm text-gray-400">
              {trumpMode ? 'LAS VEGAS — THE BEST ODDS, THE BIGGEST WINS, FOLKS!' : 'Polymarket-style odds — fractional & moneyline'}
            </p>
          </div>
          <a href="/trump" className="px-4 py-2 rounded text-xs font-bold" style={{ background: gold, color: '#000' }}>
            {trumpMode ? 'PLACE BETS NOW' : 'GO TO MAGA MARKET'}
          </a>
        </div>

        {markets.map(market => (
          <div key={market.id} className="card mb-6" style={trumpMode ? { borderColor: '#4a2828' } : {}}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold" style={{ color: gold }}>
                {market.badge && <span className="mr-2">{market.badge}</span>}
                {market.category}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-[#30363D]">
                    <th className="text-left py-2 px-3">{market.id === 2 || market.id === 3 ? 'Player' : 'Entry / Team'}</th>
                    <th className="text-left py-2 px-3">Nation / Group</th>
                    <th className="text-right py-2 px-3">Fractional (UK)</th>
                    <th className="text-right py-2 px-3">Moneyline (US)</th>
                    <th className="text-right py-2 px-3">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {market.entries.map((entry: any, i: number) => {
                    const name = entry.player || entry.team || entry.entry || entry.group || entry.favorite
                    const nation = entry.nation || entry.group || entry.fifa_code || ''
                    const fracOdds = entry.fractional
                    const mlOdds = entry.moneyline
                    const prob = entry.type || entry.probability_pct
                    const isFavorite = i === 0 && (mlOdds.startsWith('-') || parseFloat(mlOdds.replace('+', '')) < 500)

                    return (
                      <tr key={i} className={`border-b border-[#21262D] hover:bg-[#1C2129] transition-colors ${isFavorite ? 'bg-green-900/10' : ''}`}>
                        <td className="py-2.5 px-3 font-medium">
                          {isFavorite && <span className="text-green-400 mr-1">★</span>}
                          {name}
                        </td>
                        <td className="py-2.5 px-3 text-gray-400">{nation}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-vegas-gold">{fracOdds}</td>
                        <td className={`py-2.5 px-3 text-right font-mono font-bold ${mlOdds.startsWith('-') ? 'text-green-400' : 'text-red-400'}`}>
                          {mlOdds}
                        </td>
                        <td className="py-2.5 px-3 text-right text-gray-400">
                          {typeof prob === 'number' ? `${prob}%` : prob || '—'}
                        </td>
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
            <p className="text-gray-400 mb-4 max-w-lg mx-auto">
              America turns 250 on July 4, 2026 — right in the middle of the World Cup.
              We're celebrating with the BIGGEST tournament in history, the BEST odds in Vegas, and the STRONGEST American team ever assembled. 
              Make Soccer Great Again!
            </p>
            <div className="text-4xl font-black" style={{ color: '#BF0A30' }}>USA! USA! USA!</div>
          </div>
        )}
      </div>
    </div>
  )
}
