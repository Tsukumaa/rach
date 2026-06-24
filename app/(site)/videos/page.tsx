import Link from 'next/link'

const VIDEOS = [
  { id: '1', category: 'Reportage', title: 'Les villes fantômes du littoral breton', date: '6 juin 2026', duration: '13:42', views: '42 K' },
  { id: '2', category: 'Enquête', title: "Intérim : les nouveaux serfs de l'industrie", date: '1 juin 2026', duration: '24:15', views: '61 K' },
  { id: '3', category: 'Portrait', title: 'Grévistes : trois semaines à Rouen', date: '22 mai 2026', duration: '31:07', views: '78 K' },
  { id: '4', category: 'Terrain', title: 'Logements insalubres au cœur de Lyon', date: '14 mai 2026', duration: '12:58', views: '35 K' },
  { id: '5', category: 'Enquête', title: "Travailleurs sans papiers : l'envers du bâtiment parisien", date: '12 juin 2026', duration: '23:04', views: '84 K' },
  { id: '6', category: 'Société', title: 'Grève des éboueurs : Paris sous les déchets', date: '3 mai 2026', duration: '18:33', views: '29 K' },
]

export default function VideosPage() {
  return (
    <div style={{ backgroundColor: '#130c05', minHeight: '100vh', paddingTop: 80 }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="#e8b84b"><rect width="20" height="14" rx="3" /><polygon points="8,4 14,7 8,10" fill="#130c05" /></svg>
          <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem' }}>— Chaîne YouTube —</p>
        </div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: 8 }}>
          Toutes nos vidéos
        </h1>
        <p style={{ color: '#d4a882', fontSize: '0.875rem', marginBottom: 48, maxWidth: 500 }}>
          Retrouvez l'ensemble de nos reportages, enquêtes et portraits sur le terrain.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((v) => (
            <Link key={v.id} href={`/videos/${v.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ backgroundColor: '#221408', aspectRatio: '16/9', position: 'relative', marginBottom: 12 }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(232,184,75,0.15)', border: '1.5px solid rgba(232,184,75,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="#e8b84b"><polygon points="0,0 14,8 0,16" /></svg>
                  </div>
                </div>
                <span style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.8)', color: '#f2e8dc', fontSize: '0.65rem', padding: '1px 6px', fontFamily: 'IBM Plex Mono, monospace' }}>
                  {v.duration}
                </span>
              </div>
              <span className="label" style={{ color: '#e8b84b', fontSize: '0.55rem' }}>{v.category}</span>
              <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1rem', fontWeight: 600, lineHeight: 1.3, marginTop: 4, marginBottom: 6 }}>
                {v.title}
              </p>
              <p style={{ color: '#d4a882', fontSize: '0.75rem' }}>{v.date} · {v.views} vues</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 64, textAlign: 'center', padding: '40px', border: '1px solid rgba(232,184,75,0.15)', borderRadius: 4 }}>
          <p style={{ color: '#d4a882', fontSize: '0.875rem', marginBottom: 16 }}>
            Abonnez-vous à la chaîne YouTube pour ne rien manquer
          </p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, padding: '12px 24px', textDecoration: 'none' }}
          >
            <svg width="16" height="11" viewBox="0 0 20 14" fill="#1a0f07"><rect width="20" height="14" rx="3" /><polygon points="8,4 14,7 8,10" fill="#e8b84b" /></svg>
            S'abonner sur YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
