import { useState, useEffect } from 'react'
import { fetchAPI } from './_app'

export default function Venues({ trumpMode }: { trumpMode: boolean }) {
  const [venues, setVenues] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAPI('venues').then(d => setVenues(d.venues || [])).catch(e => setError(e.message))
  }, [])

  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'
  const gold = trumpMode ? '#FFD700' : '#C5A333'

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: gold }}>🏟️ World Cup 2026 Venues</h1>
        <p className="text-sm text-gray-400 mb-6">16 Stadiums across 3 Host Nations</p>
        {error && <div className="card mb-4 border-red-500/50 text-red-400 text-sm">Error: {error}</div>}

        {[
          { country: '🇺🇸 United States', venues: venues.filter((v: any) => v.country === 'USA') },
          { country: '🇲🇽 Mexico', venues: venues.filter((v: any) => v.country === 'Mexico') },
          { country: '🇨🇦 Canada', venues: venues.filter((v: any) => v.country === 'Canada') },
        ].map(c => (
          <div key={c.country} className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: gold }}>{c.country} <span className="text-xs text-gray-500">({c.venues.length} venues)</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.venues.map((v: any) => (
                <div key={v.id} className="card hover:border-vegas-gold/30 transition-colors">
                  <div className="text-sm font-bold text-vegas-gold mb-1">{v.name}</div>
                  <div className="text-xs text-gray-400">{v.city}, {v.state}</div>
                  <div className="text-xs text-gray-500 mt-2">Capacity: {v.capacity.toLocaleString()} · {v.type}</div>
                  <div className="mt-2 flex flex-wrap gap-1">{v.matches.map((m: string) => (<span key={m} className="px-1.5 py-0.5 text-[10px] bg-[#21262D] rounded text-gray-400">{m}</span>))}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
