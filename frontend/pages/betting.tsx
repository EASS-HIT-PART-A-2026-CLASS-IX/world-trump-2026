import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Betting({ trumpMode }: { trumpMode: boolean }) {
  const [markets, setMarkets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('odds')
      .then(d => { setMarkets(d.markets || []); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  if (loading) return <div style={{ background: 'var(--bg)', minHeight: '100vh' }}><div className="pm-container"><div className="pm-empty">Loading markets…</div></div></div>

  if (error) return <div style={{ background: 'var(--bg)', minHeight: '100vh' }}><div className="pm-container"><div className="pm-card" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>Error: {error}</div></div></div>

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">

        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px' }}>
            Betting Exchange
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
            Hover <span className="pm-has-tip"><span className="pm-tip-trigger">ⓘ</span>
              <span className="pm-tip-content">
                <b>UK (9/2):</b> Win ₪9 for every ₪2 bet<br />
                <b>US (+450):</b> Underdog — bet $100 → win $450<br />
                <b>US (−200):</b> Favorite — bet $200 → win $100<br />
                <b>Prob:</b> How likely the market thinks it is
              </span>
            </span> for odds guide · Shekel examples below
          </p>
        </header>

        <div className="pm-card" style={{ marginBottom: 20, borderColor: 'rgba(245,166,35,0.2)' }}>
          <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, marginBottom: 8 }}>₪ Quick Guide for Israelis</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10, fontSize: 12, color: 'var(--muted)' }}>
            <div>
              <b style={{ color: 'var(--text)' }}>5/1 =</b> put ₪100 → win ₪500 + get your ₪100 back = ₪600 total
            </div>
            <div>
              <b style={{ color: 'var(--text)' }}>+1000 =</b> put $10 → win $100 profit. Higher number = bigger win, smaller chance
            </div>
            <div>
              <b style={{ color: 'var(--text)' }}>−200 =</b> put ₪200 → win ₪100. Favorite team, smaller profit
            </div>
            <div>
              <b style={{ color: 'var(--text)' }}>18% =</b> about 1 in 5.5 chance. Don't bet the house on this
            </div>
          </div>
        </div>

        {markets.map(market => (
          <section key={market.id} className="pm-card" style={{ marginBottom: 16 }} aria-label={market.category}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 className="pm-section-title" style={{ margin: 0 }}>
                {market.badge && <span className="pm-badge blue" style={{ marginRight: 8 }}>{market.badge}</span>}
                {market.category}
              </h2>
              <span style={{ fontSize: 11, color: 'var(--dim)' }}>{market.entries.length} entries</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>{market.id >= 2 && market.id <= 3 ? 'Player' : 'Entry / Team'}</th>
                    <th>Nat</th>
                    <th style={{ textAlign: 'right' }}>
                      UK&nbsp;
                      <span className="pm-has-tip"><span className="pm-tip-trigger">ⓘ</span>
                        <span className="pm-tip-content">9/2 = put ₪2 → get ₪11 back (₪9 win + ₪2 stake)</span>
                      </span>
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      US Moneyline&nbsp;
                      <span className="pm-has-tip"><span className="pm-tip-trigger">ⓘ</span>
                        <span className="pm-tip-content">+ big number = underdog (big win, risky). − = favorite (safe, small win)</span>
                      </span>
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      Prob&nbsp;
                      <span className="pm-has-tip"><span className="pm-tip-trigger">ⓘ</span>
                        <span className="pm-tip-content">% chance implied by the market. 50% = coin flip. 1% = long shot.</span>
                      </span>
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
                      <tr key={i} tabIndex={0}>
                        <td style={{ fontWeight: isFav ? 600 : 400 }}>
                          {isFav && <span style={{ color: 'var(--green)', marginRight: 4 }}>★</span>}
                          {name}
                        </td>
                        <td style={{ color: 'var(--dim)', fontSize: 12 }}>{nation}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'ui-monospace,monospace', color: 'var(--gold)' }}>
                          {entry.fractional}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <span className={`pm-price ${isFav ? 'green' : 'red'}`}>
                            {ml}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', color: 'var(--muted)', fontSize: 12 }}>
                          {entry.type && !isNum ? entry.type : isNum ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                              <div className="pm-odds-bar" style={{ width: 50 }}>
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
          </section>
        ))}

      </div>
    </div>
  )
}
