import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Venues({ trumpMode }: { trumpMode: boolean }) {
  const [venues, setVenues] = useState<any[]>([])

  useEffect(() => {
    fetch(`${API}/venues`).then(r => r.json())
      .then(data => setVenues(data.venues || []))
      .catch(console.error)
  }, [])

  const bg = trumpMode ? 'bg-gradient-to-b from-[#1a0a0a] to-[#2d1515]' : 'bg-gradient-to-b from-[#0D1117] to-[#161B22]'

  const usVenues = venues.filter(v => v.country === 'USA')
  const mxVenues = venues.filter(v => v.country === 'Mexico')
  const caVenues = venues.filter(v => v.country === 'Canada')

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: trumpMode ? '#FFD700' : '#C5A333' }}>
          🏟️ World Cup 2026 Venues
        </h1>
        <p className="text-sm text-gray-400 mb-6">16 Stadiums across 3 Host Nations</p>

        {[{ country: '🇺🇸 United States', venues: usVenues, count: 11 },
          { country: '🇲🇽 Mexico', venues: mxVenues, count: 3 },
          { country: '🇨🇦 Canada', venues: caVenues, count: 2 },
        ].map(c => (
          <div key={c.country} className="mb-8">
            <h2 className="text-xl font-bold mb-1" style={{ color: trumpMode ? '#FFD700' : '#C5A333' }}>{c.country}</h2>
            <p className="text-xs text-gray-500 mb-4">{c.count} venues</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.venues.map((v: any) => (
                <div key={v.id} className="card hover:border-vegas-gold/30 transition-colors">
                  <div className="text-sm font-bold text-vegas-gold mb-1">{v.name}</div>
                  <div className="text-xs text-gray-400">{v.city}, {v.state}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="mr-3">Capacity: {v.capacity.toLocaleString()}</span>
                    <span>{v.type}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {v.matches.map((m: string) => (
                      <span key={m} className="badge">{m}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .badge {
          display: inline-block;
          padding: 1px 6px;
          margin: 1px 2px;
          background: #21262D;
          border-radius: 3px;
          font-size: 10px;
          color: #8B949E;
        }
      `}</style>
    </div>
  )
}
