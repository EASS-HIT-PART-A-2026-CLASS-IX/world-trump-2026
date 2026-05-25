import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Home({ trumpMode }: { trumpMode: boolean }) {
  const [teams, setTeams] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAPI('teams'), fetchAPI('matches?stage=group'), fetchAPI('usa250'), fetchAPI('trump-quotes')])
      .then(([t, m, u, q]) => { setTeams(t.teams||[]); setMatches(m.matches||[]); setUsa250(u); setQuotes(q.quotes||[]) })
      .catch(e => setError(e.message))
  }, [])

  const gradient = trumpMode ? 'linear-gradient(135deg, #FFD700, #F5A623)' : 'linear-gradient(135deg, #4B7BF5, #00D4AA)'

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="pm-container">
        <header style={{ padding: '20px 0 12px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            World Cup 2026 Markets
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>June&nbsp;11 – July&nbsp;19 · 48&nbsp;teams · 16&nbsp;venues · 104&nbsp;matches</p>
        </header>

        {error && <div className="pm-card" style={{ marginBottom: 16, borderColor: 'var(--red)', color: 'var(--red)', fontSize: 13 }} role="alert">{error}</div>}

        <div className="pm-ticker"><div className="pm-ticker-inner" aria-live="polite">
          {quotes.join('  ·  ') || 'President Trump welcomes the world to the GREATEST World Cup'}
        </div></div>

        <div className="pm-grid-3" style={{ marginBottom: 24 }}>
          {[{v:'48',l:'Qualified Teams'},{v:'16',l:'Venues'},{v:'104',l:'Total Matches'},{v:'6',l:'Live Markets'}].map(s=>(
            <div key={s.l} className="pm-card pm-stat"><div className="pm-stat-value">{s.v}</div><div className="pm-stat-label">{s.l}</div></div>
          ))}
        </div>

        <div className="pm-grid-2" style={{ marginBottom: 24 }}>
          <section className="pm-card" aria-label="Tournament winner odds">
            <h2 className="pm-section-title"><span className="pm-badge blue">Market</span> Tournament Winner</h2>
            {[{t:'Spain',o:'+450',p:18,f:!0},{t:'France',o:'+500',p:16,f:!0},{t:'England',o:'+600',p:14,f:!0},{t:'Brazil',o:'+800',p:11},{t:'Argentina',o:'+800',p:11},{t:'Portugal',o:'+1000',p:9},{t:'Germany',o:'+1400',p:7},{t:'USA',o:'+6600',p:1.5}].map((o,i)=>(
              <div key={i} className="pm-odds-row" tabIndex={0} role="button" aria-label={`${o.t} ${o.o}`}>
                <span style={{width:90,fontWeight:o.f?600:400}}>{o.t}</span>
                <div className="pm-odds-bar"><div className={`pm-odds-bar-fill ${o.f?'green':'blue'}`} style={{width:`${o.p*3.5}%`}}/></div>
                <span className={`pm-price ${o.f?'green':''}`} style={{justifyContent:'center',width:60}}>{o.o}</span>
              </div>
            ))}
          </section>
          <section className="pm-card" aria-label="Golden boot odds">
            <h2 className="pm-section-title"><span className="pm-badge gold">Market</span> Golden Boot</h2>
            {[{p:'Kylian Mbappé',n:'FRA',o:'+600',v:22},{p:'Harry Kane',n:'ENG',o:'+700',v:20},{p:'Erling Haaland',n:'NOR',o:'+1000',v:16},{p:'Lionel Messi',n:'ARG',o:'+1200',v:14},{p:'Lamine Yamal',n:'ESP',o:'+1400',v:12},{p:'Cristiano Ronaldo',n:'POR',o:'+1800',v:9},{p:'Vinícius Jr',n:'BRA',o:'+2000',v:8},{p:'Christian Pulisic',n:'USA',o:'+10000',v:2}].map((o,i)=>(
              <div key={i} className="pm-odds-row" tabIndex={0} role="button">
                <span style={{width:130}}>{o.p}</span>
                <span style={{width:30,fontSize:10,color:'var(--dim)'}}>{o.n}</span>
                <div className="pm-odds-bar"><div className="pm-odds-bar-fill gold" style={{width:`${o.v*3}%`}}/></div>
                <span className="pm-price" style={{justifyContent:'center',width:60}}>{o.o}</span>
              </div>
            ))}
          </section>
        </div>

        <section className="pm-card" style={{marginBottom:24}} aria-label="Upcoming matches">
          <h2 className="pm-section-title"><span className="pm-badge green">Schedule</span> Upcoming Matches</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:8,marginTop:8}}>
            {matches.slice(0,8).map((m:any)=>(
              <div key={m.id} className="pm-card pm-card-clickable" style={{padding:'10px 12px'}} tabIndex={0}>
                <div style={{fontSize:11,color:'var(--dim)'}}>{m.date} · {m.time}</div>
                <div style={{fontSize:12,fontWeight:600,marginTop:2}}>{m.stage}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Venue&nbsp;#{m.venue}</div>
              </div>
            ))}
          </div>
        </section>

        {usa250 && (
          <section className="pm-card" style={{marginBottom:24}} aria-label="USA 250th">
            <h2 className="pm-section-title"><span className="pm-badge gold">USA&nbsp;250</span> {usa250.title} — {usa250.date}</h2>
            <p style={{color:'var(--muted)',fontSize:12,marginBottom:12}}>{usa250.description}</p>
            <div className="pm-grid-4">
              {usa250.facts.slice(0,4).map((f:any)=>(
                <div key={f.id} className="pm-card" style={{padding:12}}>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--gold)',marginBottom:4}}>{f.colony} · {f.year}</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>{f.fact}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <nav style={{textAlign:'center',padding:'24px 0'}} aria-label="Quick links">
          <a href="/matches" className="pm-btn" style={{marginRight:8}}>Matches →</a>
          <a href="/betting" className="pm-btn">All Odds →</a>
        </nav>
      </div>
    </div>
  )
}
