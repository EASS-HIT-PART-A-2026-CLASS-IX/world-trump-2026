import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Trump({ trumpMode }: { trumpMode: boolean }) {
  const [usa250, setUsa250] = useState<any>(null)
  const [quotes, setQuotes] = useState<string[]>([])
  const [prediction, setPrediction] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/usa250`).then(r => r.json()),
      fetch(`${API}/trump-quotes`).then(r => r.json()),
    ]).then(([u, q]) => {
      setUsa250(u)
      setQuotes(q.quotes || [])
    }).catch(console.error)
  }, [])

  const handlePredict = () => {
    if (prediction.trim()) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]" style={{ forcedColorAdjust: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">🇺🇸</div>
          <h1 className="text-5xl font-black mb-2" style={{ color: '#FFD700', textShadow: '2px 2px 0 #BF0A30' }}>
            MAKE SOCCER GREAT AGAIN!
          </h1>
          <p className="text-lg text-yellow-200/60">President Trump's Official World Cup 2026 Hub</p>
          <p className="text-sm text-gray-400 mt-2">America 250 · #MSGA · World Cup 2026 · USA</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card text-center" style={{ borderColor: '#BF0A30' }}>
            <div className="text-5xl mb-3">250</div>
            <div className="text-sm text-gray-400">Years of American Greatness</div>
            <div className="text-xs text-yellow-500 mt-2">July 4, 2026</div>
          </div>
          <div className="card text-center" style={{ borderColor: '#041E42' }}>
            <div className="text-5xl mb-3">🏆</div>
            <div className="text-sm text-gray-400">USA World Cup Host</div>
            <div className="text-xs text-yellow-500 mt-2">3rd time hosting</div>
          </div>
          <div className="card text-center" style={{ borderColor: '#FFD700' }}>
            <div className="text-5xl mb-3">⚽</div>
            <div className="text-sm text-gray-400">USMNT World Cup</div>
            <div className="text-xs text-yellow-500 mt-2">Group D · Making History</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card" style={{ borderColor: '#BF0A30' }}>
            <h2 className="text-xl font-bold mb-1" style={{ color: '#FFD700' }}>TRUMP QUOTES</h2>
            <p className="text-xs text-gray-500 mb-4">Official statements from the 45th & 47th President</p>
            <div className="space-y-3">
              {quotes.map((q, i) => (
                <div key={i} className="p-3 bg-[#0D1117] rounded border border-[#30363D]">
                  <div className="text-xs text-yellow-300 italic">&ldquo;{q}&rdquo;</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ borderColor: '#FFD700' }}>
            <h2 className="text-xl font-bold mb-1" style={{ color: '#FFD700' }}>YOUR PREDICTION</h2>
            <p className="text-xs text-gray-500 mb-4">Tell us who wins — and how!</p>
            {!submitted ? (
              <div className="space-y-4">
                <textarea
                  className="w-full p-3 rounded bg-[#0D1117] border border-[#30363D] text-sm text-gray-200 resize-none"
                  rows={3}
                  placeholder="USA beats Brazil 3-1 in the FINAL at MetLife Stadium. Pulisic hat trick. Trump presents the trophy. HISTORY!"
                  value={prediction}
                  onChange={e => setPrediction(e.target.value)}
                />
                <button
                  onClick={handlePredict}
                  className="w-full py-3 rounded font-bold text-black"
                  style={{ background: '#FFD700' }}
                >
                  SUBMIT PREDICTION — MSGA!
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🇺🇸</div>
                <div className="text-lg font-bold" style={{ color: '#FFD700' }}>PREDICTION LOCKED!</div>
                <p className="text-sm text-gray-400 mt-2">The President has reviewed your prediction.</p>
                <p className="text-xs text-yellow-500 mt-1 italic">Tremendous.</p>
              </div>
            )}
          </div>
        </div>

        {usa250 && (
          <div className="card mb-8" style={{ borderColor: '#041E42' }}>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#FFD700' }}>
              🇺🇸 13 COLONIES · 250 YEARS — {usa250.date}
            </h2>
            <p className="text-sm text-gray-400 mb-4">{usa250.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {usa250.facts.map((f: any) => (
                <div key={f.id} className="p-3 bg-[#0D1117] rounded border border-[#30363D]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">⭐</span>
                    <span className="text-xs font-bold" style={{ color: '#FFD700' }}>{f.colony}</span>
                    <span className="text-xs text-gray-500">({f.year})</span>
                  </div>
                  <div className="text-xs text-gray-400">{f.fact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card text-center py-8" style={{ borderColor: '#FFD700' }}>
          <div className="text-6xl mb-4">🎆</div>
          <p className="text-2xl font-black" style={{ color: '#FFD700' }}>JULY 4, 2026 · PHILADELPHIA & HOUSTON</p>
          <p className="text-sm text-gray-400 mt-2">World Cup hosts special Semiquincentennial ceremonies at Lincoln Financial Field & NRG Stadium</p>
        </div>
      </div>
    </div>
  )
}
