import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

const ASCII_BANNER = `
 __     __         _     _   _____                           ____   ___   ___   ___
 \\ \\   / /__  _ __| | __| | |_   _|_ __ _ __ ___  _ __     |___ \\ / _ \\ / _ \\ / _ \\
  \\ \\ / / _ \\| '__| |/ _\` |   | | | '__| '_ \` _ \\| '_ \\ _____ __) | | | | | | | | |
   \\ \\ / (_) | |  | | (_| |   | | | |  | | | | | | |_) |_____/ __/| |_| | |_| | |_| |
    \\_/ \\___/|_|  |_|\\__,_|   |_| |_|  |_| |_| |_| .__/     |_____|\\___/ \\___/ \\___/
                                                  |_|
`

export default function Home({ hackerMode }: { hackerMode: boolean }) {
  const [teams, setTeams] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])
  const [error, setError] = useState('')
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 200)
    Promise.all([
      fetchAPI('teams'),
      fetchAPI('matches?stage=group'),
      fetchAPI('usa250'),
      fetchAPI('trump-quotes'),
    ]).then(([t, m, u, q]) => {
      setTeams(t.teams || [])
      setMatches(m.matches || [])
      setUsa250(u)
      setQuotes(q.quotes || [])
    }).catch(e => setError(e.message))
    return () => clearTimeout(timer)
  }, [])

  const c = hackerMode ? { text: '#ffb000', dim: '#664400', accent: '#ff3333', bg: '#0a0000' } : { text: '#00cc44', dim: '#006622', accent: '#00cc44', bg: '#0a0a0a' }

  return (
    <div style={{ background: c.bg, minHeight: 'calc(100vh - 40px)', paddingBottom: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>

        <pre style={{ color: c.dim, fontSize: 8, lineHeight: '9px', margin: '16px 0', overflow: 'hidden' }}>
          {ASCII_BANNER}
        </pre>

        <div style={{ color: c.dim, fontSize: 11, marginBottom: 8 }}>
          <span style={{ color: c.text }}>$</span> ./world-trump-2026 --fifa-wc --usa250 --polymarket
        </div>

        <div style={{ color: c.text, fontSize: 11, marginBottom: 24 }}>
          {booted ? (
            <>
              <span style={{ color: c.text }}>▸</span> boot: 48 teams loaded · 16 venues · 104 matches · 6 markets
              <br />
              <span style={{ color: c.text }}>▸</span> kernel: June 11 → July 19 · USA · CAN · MEX
              <span className="cursor-blink" style={{ width: 8, height: 13, marginLeft: 4 }} />
            </>
          ) : (
            <><span style={{ color: c.text }}>▸</span> booting...<span className="cursor-blink" style={{ width: 8, height: 13 }} /></>
          )}
        </div>

        {error && (
          <div style={{ border: '1px solid #ff3333', padding: '8px 12px', marginBottom: 16, color: '#ff3333', fontSize: 12 }}>
            [ERROR] {error}
          </div>
        )}

        <div style={{ borderTop: '1px solid #1a3a1a', borderBottom: '1px solid #1a3a1a', background: '#080c08', padding: '6px 0', marginBottom: 20, overflow: 'hidden' }}>
          <div style={{ animation: 'marquee 35s linear infinite', whiteSpace: 'nowrap', color: c.dim, fontSize: 11 }}>
            {quotes.length > 0 ? quotes.join(' │ ') : '> INIT: President Trump welcomes the world to the GREATEST World Cup │ 250 years of American greatness │ MAKE SOCCER GREAT AGAIN │ USA! USA! USA!'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'TEAMS', value: '48', icon: '🌍' },
            { label: 'VENUES', value: '16', icon: '🏟️' },
            { label: 'MATCHES', value: '104', icon: '⚽' },
            { label: 'MARKETS', value: '6', icon: '📊' },
          ].map(s => (
            <div key={s.label} className="terminal-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: c.text, textShadow: `0 0 10px ${c.text}` }}>{s.value}</div>
              <div style={{ fontSize: 10, color: c.dim, letterSpacing: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div className="terminal-card">
            <div style={{ fontSize: 12, fontWeight: 'bold', color: c.text, marginBottom: 12, letterSpacing: 1 }}>
              ╔══ TOURNAMENT WINNER ══╗
            </div>
            {[
              { team: 'Spain', odds: '+450', pct: 18 },
              { team: 'France', odds: '+500', pct: 16 },
              { team: 'England', odds: '+600', pct: 14 },
              { team: 'Brazil', odds: '+800', pct: 11 },
              { team: 'Argentina', odds: '+800', pct: 11 },
              { team: 'Portugal', odds: '+1000', pct: 9 },
              { team: 'Germany', odds: '+1400', pct: 7 },
              { team: 'USA', odds: '+6600', pct: 1.5 },
            ].map((o, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, fontSize: 12 }}>
                <span style={{ width: 90, color: '#88cc88', textAlign: 'right' }}>{o.team}</span>
                <div style={{ flex: 1, height: 4, background: '#0f1a0f' }}>
                  <div style={{ height: 4, background: c.text, boxShadow: `0 0 6px ${c.text}`, width: `${o.pct * 3.5}%` }} />
                </div>
                <span style={{ width: 55, color: c.text, fontFamily: 'inherit', fontWeight: 'bold', textAlign: 'right' }}>{o.odds}</span>
              </div>
            ))}
          </div>

          <div className="terminal-card">
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#ffb000', marginBottom: 12, letterSpacing: 1 }}>
              ╔══ GOLDEN BOOT ══╗
            </div>
            {[
              { player: 'K. Mbappe', nation: 'FRA', odds: '+600', pct: 22 },
              { player: 'H. Kane', nation: 'ENG', odds: '+700', pct: 20 },
              { player: 'E. Haaland', nation: 'NOR', odds: '+1000', pct: 16 },
              { player: 'L. Messi', nation: 'ARG', odds: '+1200', pct: 14 },
              { player: 'L. Yamal', nation: 'ESP', odds: '+1400', pct: 12 },
              { player: 'C. Ronaldo', nation: 'POR', odds: '+1800', pct: 9 },
              { player: 'Vinicius Jr', nation: 'BRA', odds: '+2000', pct: 8 },
              { player: 'C. Pulisic', nation: 'USA', odds: '+10000', pct: 2 },
            ].map((o, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, fontSize: 12 }}>
                <span style={{ width: 90, color: '#88cc88', textAlign: 'right' }}>{o.player}</span>
                <span style={{ width: 32, fontSize: 10, color: '#006622' }}>{o.nation}</span>
                <div style={{ flex: 1, height: 4, background: '#1a1a0f' }}>
                  <div style={{ height: 4, background: '#ffb000', boxShadow: '0 0 6px #ffb000', width: `${o.pct * 3}%` }} />
                </div>
                <span style={{ width: 55, color: '#ffb000', fontFamily: 'inherit', fontWeight: 'bold', textAlign: 'right' }}>{o.odds}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="terminal-card" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 'bold', color: c.text, marginBottom: 12, letterSpacing: 1 }}>
            ╔══ UPCOMING MATCHES ══╗
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
            {matches.slice(0, 12).map((m: any) => (
              <div key={m.id} style={{ padding: '6px 8px', border: '1px solid #0f1a0f', fontSize: 11 }}>
                <span style={{ color: '#004d1a' }}>{m.date} {m.time}</span>
                <span style={{ marginLeft: 8, color: '#88cc88' }}>{m.stage}</span>
                <span style={{ marginLeft: 8, color: c.dim }}>v{m.venue}</span>
              </div>
            ))}
          </div>
        </div>

        {usa250 && (
          <div className="terminal-card" style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#ffb000', marginBottom: 8, letterSpacing: 1 }}>
              ╔══ USA 250th · SEMIQUINCENTENNIAL ══╗
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
              {usa250.facts.slice(0, 6).map((f: any) => (
                <div key={f.id} style={{ padding: '6px 8px', border: '1px solid #1a150a', fontSize: 11 }}>
                  <span style={{ color: '#ffb000' }}>[{f.year}]</span>
                  <span style={{ marginLeft: 6, color: '#aa8833' }}>{f.colony}</span>
                  <div style={{ color: '#665522', marginTop: 3 }}>{f.fact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#003300', fontSize: 10, marginTop: 32 }}>
          <a href="/matches" className="nav-link" style={{ padding: '2px 8px' }}>[all matches]</a>
          <span style={{ margin: '0 8px' }}>│</span>
          <a href="/betting" className="nav-link" style={{ padding: '2px 8px' }}>[betting exchange]</a>
          <span style={{ margin: '0 8px' }}>│</span>
          <a href="/trump" className="nav-link" style={{ padding: '2px 8px', color: '#664400' }}>[MAGA mode]</a>
          <br /><br />
          <span style={{ color: '#001a00' }}>github.com/EASS-HIT-PART-A-2026-CLASS-IX/world-trump-2026</span>
        </div>
      </div>
    </div>
  )
}
