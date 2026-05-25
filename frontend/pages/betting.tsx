import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

interface Market { id: number; category: string; badge?: string; entries: any[] }

export default function Betting({ hackerMode }: { hackerMode: boolean }) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('odds').then(d => setMarkets(d.markets || [])).catch(e => setError(e.message))
  }, [])

  const c = hackerMode ? { text: '#ffb000', dim: '#664400', bg: '#0a0000', border: '#2a1515', cardBg: '#0c0808' } : { text: '#00cc44', dim: '#006622', bg: '#0a0a0a', border: '#1a3a1a', cardBg: '#0c0f0c' }

  return (
    <div style={{ background: c.bg, minHeight: 'calc(100vh - 40px)', paddingBottom: 24, fontFamily: 'inherit' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>

        <div style={{ color: c.dim, fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: c.text }}>$</span> cat /markets/world-cup-2026.json
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 'bold', color: c.text, textShadow: `0 0 10px ${c.text}`, margin: 0, letterSpacing: 2 }}>
              ╔══ BETTING EXCHANGE ══╗
            </h1>
            <div style={{ fontSize: 11, color: c.dim, marginTop: 4 }}>
              Live odds · UK fractional · US moneyline · hover any <span style={{ color: c.text }}>?</span> for help
            </div>
          </div>
        </div>

        {error && (
          <div style={{ border: '1px solid #ff3333', padding: '8px 12px', marginBottom: 16, color: '#ff3333', fontSize: 12 }}>
            [ERROR] {error}
          </div>
        )}

        <div className="terminal-card" style={{ marginBottom: 20, borderColor: '#332200' }}>
          <div style={{ fontSize: 12, fontWeight: 'bold', color: '#ffb000', marginBottom: 10, letterSpacing: 1 }}>
            ╔══ HELP: HOW TO READ THE ODDS ══╗
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, fontSize: 11 }}>
            <div style={{ padding: '8px 10px', border: '1px solid #1a200a' }}>
              <span style={{ color: '#ffb000', fontWeight: 'bold' }}>UK Fractional (5/1):</span>
              <div style={{ color: '#668844', marginTop: 4 }}>
                Bet $1 → win $5 + get your $1 back = $6 total<br />
                Smaller right = favorite. <span style={{ color: '#00cc44' }}>1/10</span> = heavy favorite
              </div>
            </div>
            <div style={{ padding: '8px 10px', border: '1px solid #1a200a' }}>
              <span style={{ color: '#ffb000', fontWeight: 'bold' }}>US Moneyline (+450 / -200):</span>
              <div style={{ color: '#668844', marginTop: 4 }}>
                <span style={{ color: '#00cc44' }}>+</span> = underdog. $100 → win $X<br />
                <span style={{ color: '#ff3333' }}>-</span> = favorite. Bet $X → win $100
              </div>
            </div>
          </div>
        </div>

        {markets.map(market => (
          <div key={market.id} className="terminal-card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: c.text, marginBottom: 10, letterSpacing: 1 }}>
              {market.badge && <span style={{ marginRight: 6 }}>{market.badge}</span>}
              ╔══ {market.category.toUpperCase()} ══╗
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="terminal-table" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>{market.id >= 2 && market.id <= 3 ? 'PLAYER' : 'ENTRY'}</th>
                    <th style={{ textAlign: 'left' }}>NAT</th>
                    <th style={{ textAlign: 'right' }}>
                      UK
                      <Tooltip text="Fractional: 9/2 means win £9 for every £2 bet. Return = stake + winnings." />
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      US MONEYLINE
                      <Tooltip text="+450 = underdog (bet $100→win $450). -200 = favorite (bet $200→win $100)." />
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      PROB
                      <Tooltip text="Implied probability from the market. 18% ≈ 1 in 5.5 chance." />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {market.entries.map((entry: any, i: number) => {
                    const name = entry.player || entry.team || entry.entry || entry.group || entry.favorite
                    const nation = entry.nation || entry.group || entry.fifa_code || ''
                    const ml = entry.moneyline
                    const isFav = ml && ml.startsWith('-')
                    const prob = entry.probability_pct
                    return (
                      <tr key={i}>
                        <td style={{ textAlign: 'left', color: '#88cc88' }}>
                          {isFav && <span style={{ color: '#00cc44', marginRight: 4 }}>★</span>}
                          {name}
                        </td>
                        <td style={{ textAlign: 'left', color: '#446644', fontSize: 11 }}>{nation}</td>
                        <td style={{ textAlign: 'right', color: '#ffb000', fontFamily: 'inherit' }}>{entry.fractional}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'inherit', fontWeight: 'bold', color: isFav ? '#00cc44' : '#ff6666' }}>{ml}</td>
                        <td style={{ textAlign: 'right', color: '#446644' }}>
                          {entry.type || prob ? (prob ? `${prob}%` : entry.type) : '--'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', color: '#003300', fontSize: 10, marginTop: 24 }}>
          ╔══════════════════════════════════════╗<br />
          ║  :help for odds explanation  ║<br />
          ╚══════════════════════════════════════╝
        </div>

      </div>
    </div>
  )
}

function Tooltip({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 14, height: 14, borderRadius: '50%',
        background: 'rgba(0,204,68,0.1)', color: '#00cc44',
        fontSize: 9, cursor: 'help',
      }}>?</span>
      <span style={{
        position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
        marginBottom: 6, padding: '6px 10px',
        background: '#0f1a0f', border: '1px solid #1a3a1a',
        fontSize: 10, color: '#668844', width: 260, textAlign: 'left',
        opacity: 0, visibility: 'hidden', transition: 'all 0.15s', zIndex: 50,
        pointerEvents: 'none',
        fontFamily: 'inherit', fontWeight: 'normal', letterSpacing: '0',
      }}
        className="tooltip-hover"
      >
        {text}
      </span>
      <style>{`.tooltip-hover, span:hover > .tooltip-hover { opacity: 1 !important; visibility: visible !important; }`}</style>
    </span>
  )
}
