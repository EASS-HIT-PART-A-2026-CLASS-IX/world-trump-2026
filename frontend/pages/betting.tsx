import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

interface Market { id: number; category: string; badge?: string; entries: any[] }

export default function Betting({ trumpMode }: { trumpMode: boolean }) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('odds').then(d => setMarkets(d.markets || [])).catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <div style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4B7BF5, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Betting Exchange
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
            Polymarket-style odds · UK fractional · US moneyline · hover <span style={{ color: 'var(--text-muted)', cursor: 'help', borderBottom: '1px dotted var(--text-muted)' }} title="UK = fractional (5/1 = win 5 for 1). US = moneyline (+450 = bet 100 win 450).">?</span> for help
          </p>
        </div>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }}>Error: {error}</div>}

        {markets.map(market => (
          <div key={market.id} className="pm-card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div className="pm-section-title" style={{ marginBottom: 0 }}>
                {market.badge && <span className="pm-badge blue" style={{ marginRight: 8 }}>{market.badge}</span>}
                {market.category}
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{market.entries.length} entries</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>{market.id >= 2 && market.id <= 3 ? 'Player' : 'Entry'}</th>
                    <th>Nation</th>
                    <th style={{ textAlign: 'right' }}>UK <span style={{ cursor: 'help' }} title="Fractional: 9/2 = win £9 for every £2 bet">ⓘ</span></th>
                    <th style={{ textAlign: 'right' }}>US Moneyline <span style={{ cursor: 'help' }} title="+450 = underdog (bet $100→win $450). -200 = favorite (bet $200→win $100)">ⓘ</span></th>
                    <th style={{ textAlign: 'right' }}>Implied %</th>
                  </tr>
                </thead>
                <tbody>
                  {market.entries.map((entry: any, i: number) => {
                    const name = entry.player || entry.team || entry.entry || entry.group || entry.favorite
                    const nation = entry.nation || entry.group || entry.fifa_code || ''
                    const ml = entry.moneyline
                    const isFav = ml && ml.startsWith('-')
                    const prob = entry.probability_pct
                    const isNum = typeof prob === 'number'

                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: isFav ? 600 : 400 }}>
                          {isFav && <span style={{ color: 'var(--green)', marginRight: 4 }}>★</span>}
                          {name}
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{nation}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'SF Mono, monospace', color: 'var(--gold)' }}>{entry.fractional}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'SF Mono, monospace', fontWeight: 600 }}>
                          <span className={isFav ? 'pm-price green' : 'pm-price red'} style={{ display: 'inline-flex', fontSize: 12 }}>
                            {ml}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: 12 }}>
                          {entry.type && !isNum ? entry.type : isNum ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                              <div className="pm-odds-bar" style={{ width: 60 }}>
                                <div className="pm-odds-bar-fill blue" style={{ width: `${prob}%` }} />
                              </div>
                              <span>{prob}%</span>
                            </div>
                          ) : '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
