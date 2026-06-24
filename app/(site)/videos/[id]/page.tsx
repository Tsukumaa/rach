import Link from 'next/link'
import { notFound } from 'next/navigation'

const VIDEOS: Record<string, { category: string; title: string; date: string; duration: string; views: string; description: string }> = {
  '1': { category: 'Reportage', title: 'Les villes fantômes du littoral breton', date: '6 juin 2026', duration: '13:42', views: '42 K', description: "Sur les côtes bretonnes, des communes entières se vident de leurs habitants permanents. Résidences secondaires, Airbnb, spéculation — enquête sur un littoral qui étouffe." },
  '2': { category: 'Enquête', title: "Intérim : les nouveaux serfs de l'industrie", date: '1 juin 2026', duration: '24:15', views: '61 K', description: "Derrière les façades des grandes usines françaises, des milliers de travailleurs intérimaires enchaînent les contrats courts, sans filets. Témoignages et chiffres." },
  '3': { category: 'Portrait', title: 'Grévistes : trois semaines à Rouen', date: '22 mai 2026', duration: '31:07', views: '78 K', description: "Nous avons suivi pendant trois semaines les grévistes d'une usine rouennaise. De la cantine aux piquets de grève, voici ce que la presse nationale n'a pas montré." },
  '4': { category: 'Terrain', title: 'Logements insalubres au cœur de Lyon', date: '14 mai 2026', duration: '12:58', views: '35 K', description: "Dans le centre de Lyon, des propriétaires louent des logements sans eau chaude, sans chauffage, avec des moisissures au plafond. Enquête dans les oubliés du parc locatif." },
  '5': { category: 'Enquête', title: "Travailleurs sans papiers : l'envers du bâtiment parisien", date: '12 juin 2026', duration: '23:04', views: '84 K', description: "Qui construit vraiment Paris ? Pendant six mois, nous avons suivi des travailleurs sans papiers sur les chantiers de la capitale. Une plongée dans le travail invisible." },
  '6': { category: 'Société', title: 'Grève des éboueurs : Paris sous les déchets', date: '3 mai 2026', duration: '18:33', views: '29 K', description: "Quand les éboueurs font grève, la ville se révèle. Rencontre avec ces travailleurs essentiels que Paris préfère ignorer, jusqu'à ce que les ordures débordent." },
}

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const video = VIDEOS[id]
  if (!video) notFound()

  return (
    <div style={{ backgroundColor: '#130c05', minHeight: '100vh', paddingTop: 80 }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/videos" style={{ color: '#e8b84b', fontSize: '0.75rem', fontFamily: 'IBM Plex Mono, monospace', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          ← Toutes les vidéos
        </Link>

        {/* Player placeholder */}
        <div style={{ backgroundColor: '#221408', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: 'rgba(232,184,75,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a0f07"><polygon points="6,4 20,12 6,20" /></svg>
            </div>
            <p style={{ color: '#d4a882', fontSize: '0.8rem' }}>Voir sur YouTube</p>
          </div>
          <span style={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.8)', color: '#f2e8dc', fontSize: '0.75rem', padding: '2px 8px', fontFamily: 'IBM Plex Mono, monospace' }}>
            {video.duration}
          </span>
        </div>

        <span className="badge" style={{ marginBottom: 12 }}>{video.category}</span>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, marginTop: 12, marginBottom: 12 }}>
          {video.title}
        </h1>
        <p style={{ color: 'rgba(212,168,130,0.6)', fontSize: '0.8rem', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 24 }}>
          {video.date} · {video.views} vues
        </p>
        <p style={{ color: '#d4a882', fontSize: '1rem', lineHeight: 1.8, maxWidth: 680 }}>
          {video.description}
        </p>
      </div>
    </div>
  )
}
