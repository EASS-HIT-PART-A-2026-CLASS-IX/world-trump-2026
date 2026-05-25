import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

interface Market { id: number; category: string; badge?: string; entries: any[] }

function HelpTooltip({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 2, cursor: 'help' }}>
      <span tabIndex={0} role="button" aria-label="View explanation" style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>ⓘ</span>
      <span style={{
        position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
        padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 6, fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap',
        opacity: 0, visibility: 'hidden', transition: 'opacity 0.15s, visibility 0.15s',
        zIndex: 50, pointerEvents: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      }}
        className="pm-tooltip-hover"
      >
        {text}
      </span>
      <style>{`.pm-tooltip-hover, span:hover > .pm-tooltip-hover, span:focus-within > .pm-tooltip-hover { opacity: 1; visibility: visible; }`}</style>
    </span>
  )
}

export default function Betting({ trumpMode }: { trumpMode: boolean }) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('odds').then(d => setMarkets(d.markets || [])).catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4B7BF5, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
            Betting Exchange
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
            Polymarket-style odds · UK fractional · US moneyline · hover <HelpTooltip text="UK = fractional (5/1 means win&nbsp;₪5 for every&nbsp;₪1). US = moneyline (+450 = bet&nbsp;$100&nbsp;→ win&nbsp;$450, −200 = bet&nbsp;$200&nbsp;→ win&nbsp;$100)." /> for help
          </p>
        </header>

        {error && (
          <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }} role="alert">
            Error: {error}
          </div>
        )}

        {markets.length === 0 && !error && (
          <div className="pm-empty" aria-live="polite">Loading markets…</div>
        )}

        {markets.map(market => (
          <section key={market.id} className="pm-card" style={{ marginBottom: 16 }} aria-label={market.category}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 className="pm-section-title" style={{ marginBottom: 0 }}>
                {market.badge && <span className="pm-badge blue" style={{ marginRight: 8 }}>{market.badge}</span>}
                {market.category}
              </h2>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{market.entries.length}&nbsp;entries</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="pm-table" role="table">
                <caption className="sr-only">{market.category} betting odds</caption>
                <thead>
                  <tr>
                    <th scope="col">{market.id >= 2 && market.id <= 3 ? 'Player' : 'Entry'}</th>
                    <th scope="col">Nation</th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      UK <HelpTooltip text="Fractional odds. 9/2 = win&nbsp;₪9 for every&nbsp;₪2 bet. Return = stake&nbsp;+&nbsp;winnings." />
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      US Moneyline <HelpTooltip text="+450 = underdog (bet&nbsp;$100&nbsp;→ win&nbsp;$450). −200 = favorite (bet&nbsp;$200&nbsp;→ win&nbsp;$100). + = bigger payout, − = safer." />
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Implied&nbsp;% <HelpTooltip text="Market-implied probability. 18% means ~1 in 5.5 chance." />
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
                    const isNum = typeof prob === 'number'

                    return (
                      <tr key={i} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') { /* select row */ } }}>
                        <td style={{ fontWeight: isFav ? 600 : 400 }}>
                          {isFav && <span style={{ color: 'var(--green)', marginRight: 4 }} aria-label="Favorite">★</span>}
                          {name}
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{nation}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'SF Mono, ui-monospace, monospace', color: 'var(--gold)', fontVariantNumeric: 'tabular-nums' }}>{entry.fractional}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'SF Mono, ui-monospace, monospace', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
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
                              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{prob}%</span>
                            </div>
                          ) : '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
