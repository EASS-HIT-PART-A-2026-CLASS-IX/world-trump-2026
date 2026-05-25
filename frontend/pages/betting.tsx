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
            <p className="text-sm text-gray-400">{trumpMode ? 'LAS VEGAS — THE BEST ODDS, THE BIGGEST WINS, FOLKS!' : 'Polymarket-style odds — hover over any ℹ️ for explanations'}</p>
          </div>
        </div>

        <div className="card mb-6 border-vegas-gold/30">
          <h3 className="text-sm font-bold mb-3" style={{ color: gold }}>📖 HOW TO READ THE ODDS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
            <div className="p-3 bg-[#0D1117] rounded">
              <span className="font-bold text-vegas-gold">UK Fractional:</span>
              <ul className="mt-1 space-y-1 ml-3 list-disc">
                <li><code className="text-yellow-300">9/2</code> means: bet $2 → win $9 (+ your $2 back = $11 total)</li>
                <li>Think: &ldquo;win 9 for every 2 you put in&rdquo;</li>
                <li>Smaller right number = bigger favorite. <code className="text-green-400">1/10</code> = heavy favorite</li>
              </ul>
            </div>
            <div className="p-3 bg-[#0D1117] rounded">
              <span className="font-bold text-vegas-gold">US Moneyline:</span>
              <ul className="mt-1 space-y-1 ml-3 list-disc">
                <li><code className="text-green-400">+450</code> = underdog. Bet $100 → win $450 profit</li>
                <li><code className="text-red-400">-200</code> = favorite. Bet $200 → win $100 profit</li>
                <li><code className="text-green-400">+</code> = underdog (big payout). <code className="text-red-400">-</code> = favorite (safer)</li>
              </ul>
            </div>
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
                  <th className="text-right py-2 px-3">
                    <Tooltip text="UK (Fractional) odds: 9/2 means you win £9 for every £2 bet. Example: bet ₪10 on 5/1 → win ₪50 + get your ₪10 back = ₪60 total.">UK 🇬🇧</Tooltip>
                  </th>
                  <th className="text-right py-2 px-3">
                    <Tooltip text="US (Moneyline) odds: +450 means bet $100 to win $450. -200 means bet $200 to win $100. + = underdog (big win), - = favorite (safe). Example: +1000 on ₪10 → win ₪100.">US 🇺🇸</Tooltip>
                  </th>
                  <th className="text-right py-2 px-3">
                    <Tooltip text="Implied probability: the market's estimate of how likely this outcome is. 18% means roughly 1 in 5 chance. Higher % = more likely to happen.">Prob</Tooltip>
                  </th>
                </tr></thead>
                <tbody>
                  {market.entries.map((entry: any, i: number) => {
                    const name = entry.player || entry.team || entry.entry || entry.group || entry.favorite
                    const nation = entry.nation || entry.group || entry.fifa_code || ''
                    const ml = entry.moneyline; const isFav = ml && ml.startsWith('-')
                    const prob = entry.probability_pct
                    return (
                      <tr key={i} className="border-b border-[#21262D] hover:bg-[#1C2129] transition-colors">
                        <td className="py-2.5 px-3 font-medium">{isFav && <span className="text-green-400 mr-1">★</span>}{name}</td>
                        <td className="py-2.5 px-3 text-gray-400">{nation}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-vegas-gold relative group">
                          {entry.fractional}
                          <OddsTooltip uk={entry.fractional} ml={ml} prob={prob} name={name} />
                        </td>
                        <td className={`py-2.5 px-3 text-right font-mono font-bold relative group ${isFav ? 'text-green-400' : 'text-red-400'}`}>
                          {ml}
                          <OddsTooltip uk={entry.fractional} ml={ml} prob={prob} name={name} />
                        </td>
                        <td className="py-2.5 px-3 text-right text-gray-400">
                          {entry.type || prob ? (prob ? `${prob}%` : entry.type) : '—'}
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
            <p className="text-gray-400 mb-4 max-w-lg mx-auto">America turns 250 on July 4, 2026 — right in the middle of the World Cup. Make Soccer Great Again!</p>
            <div className="text-4xl font-black" style={{ color: '#BF0A30' }}>USA! USA! USA!</div>
          </div>
        )}
      </div>
    </div>
  )
}

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <span className="relative group inline-flex items-center gap-1">
      {children}
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-vegas-gold/20 text-[10px] text-vegas-gold cursor-help font-sans">?</span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1f2e] border border-vegas-gold/40 rounded text-xs text-gray-300 w-64 text-left leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-xl">
        {text}
      </span>
    </span>
  )
}

function OddsTooltip({ uk, ml, prob, name }: { uk: string; ml: string; prob?: number; name: string }) {
  const isFav = ml && ml.startsWith('-')
  const num = parseFloat(ml?.replace(/[+-]/, '') || '0')

  let explanation = ''
  if (isFav) {
    explanation = `${name} is the favorite. You must bet $${num} to win $100.`
  } else {
    explanation = `${name} is an underdog. Bet $100 to win $${num}.`
  }
  if (prob) {
    explanation += ` About ${prob}% chance.`
  }
  if (uk && !isFav) {
    explanation += ` UK: ${uk}.`
  }

  return (
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#1a1f2e] border border-vegas-gold/30 rounded text-[10px] text-gray-300 w-56 text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 pointer-events-none whitespace-normal shadow-xl">
      {explanation}
    </span>
  )
}
