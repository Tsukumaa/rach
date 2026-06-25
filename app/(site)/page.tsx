import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const MOCK_VIDEOS = [
  { id: '1', category: 'Reportage', title: 'Les villes fantômes du littoral breton', date: '6 juin 2026', duration: '13:42' },
  { id: '2', category: 'Enquête', title: "Intérim : les nouveaux serfs de l'industrie", date: '1 juin 2026', duration: '24:15' },
  { id: '3', category: 'Portrait', title: 'Grévistes : trois semaines à Rouen', date: '22 mai 2026', duration: '31:07' },
  { id: '4', category: 'Terrain', title: 'Logements insalubres au cœur de Lyon', date: '14 mai 2026', duration: '12:58' },
]

const EXCLUSIVE = [
  { tag: 'Documentaire', title: 'Travailleurs sans papiers — version intégrale', sub: 'Version longue · abonnés uniquement', duration: '1:12:04' },
  { tag: 'Inédit', title: 'Coulisses : 3 semaines de tournage à Rouen', sub: 'Behind the scenes · abonnés uniquement', duration: '48:33' },
  { tag: 'Live Replay', title: 'Q&A : réponses à la communauté — mai 2026', sub: 'Replay mensuel · abonnés uniquement', duration: '1:20:11' },
]

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 5,
    include: { category: true, author: { select: { name: true } } },
  })
  const featured = articles[0] ?? null
  const sideArticles = articles.slice(1, 5)
  return (
    <>
      {/* HERO */}
      <section style={{ backgroundColor: '#1a0f07', minHeight: '90vh' }} className="flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 py-20">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 28, height: 2, backgroundColor: '#e8b84b' }} />
              <span className="label" style={{ color: '#e8b84b', fontSize: '0.6rem' }}>
                Reportage · Terrain · Indépendant
              </span>
            </div>
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.05, color: '#f2e8dc', marginBottom: '1.25rem' }}>
              Le journalisme<br />
              qui <span style={{ color: '#e8b84b' }}>dérange.</span>
            </h1>
            <p style={{ color: '#d4a882', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 420, marginBottom: '2rem' }}>
              {"Rach! est un média de reportage social et d'enquête de terrain, indépendant de toute publicité. Vidéos YouTube, articles, documentaires inédits."}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/videos"
                style={{ backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, padding: '12px 20px' }}
              >
                Dernière vidéo
              </Link>
              <Link
                href="/enquetes"
                style={{ border: '1.5px solid rgba(232,184,75,0.5)', color: '#e8b84b', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, padding: '12px 20px' }}
              >
                Nos enquêtes
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div style={{ position: 'relative', backgroundColor: '#241508', aspectRatio: '16/9' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: 'rgba(232,184,75,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a0f07">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(26,15,7,0.95), transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span className="badge" style={{ flexShrink: 0, marginTop: 2 }}>Enquête</span>
                  <div>
                    <p style={{ color: '#f2e8dc', fontSize: '0.9rem', fontFamily: 'Oswald, sans-serif', lineHeight: 1.3 }}>
                      {"Travailleurs sans papiers : l'envers du bâtiment parisien"}
                    </p>
                    <p style={{ color: '#d4a882', fontSize: '0.7rem', marginTop: 4 }}>
                      23 min · 12 juin 2026 · 84 K vues
                    </p>
                  </div>
                </div>
              </div>
              <span style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.75)', color: '#f2e8dc', fontSize: '0.7rem', padding: '1px 5px', fontFamily: 'IBM Plex Mono, monospace' }}>
                23:04
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      <section style={{ backgroundColor: '#130c05', padding: '60px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <svg width="20" height="14" viewBox="0 0 20 14" fill="#e8b84b">
                <rect width="20" height="14" rx="3" />
                <polygon points="8,4 14,7 8,10" fill="#130c05" />
              </svg>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.4rem', fontWeight: 600 }}>
                Sur YouTube
              </h2>
            </div>
            <Link href="/videos" className="label" style={{ color: '#e8b84b', fontSize: '0.6rem' }}>
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_VIDEOS.map((v) => (
              <Link href={`/videos/${v.id}`} key={v.id} className="group block">
                <div style={{ backgroundColor: '#221408', aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }} className="mb-3">
                  <span style={{ position: 'absolute', bottom: 6, right: 6, backgroundColor: 'rgba(0,0,0,0.8)', color: '#f2e8dc', fontSize: '0.65rem', padding: '1px 5px', fontFamily: 'IBM Plex Mono, monospace' }}>
                    {v.duration}
                  </span>
                </div>
                <span className="label" style={{ color: '#e8b84b', fontSize: '0.55rem' }}>{v.category}</span>
                <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.3, marginTop: 4, marginBottom: 4 }}>
                  {v.title}
                </p>
                <p style={{ color: '#d4a882', fontSize: '0.75rem' }}>{v.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      {articles.length > 0 && (
      <section style={{ backgroundColor: '#fdf3d9', padding: '60px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#1a0f07', fontSize: '1.6rem', fontWeight: 700 }}>
              Enquêtes &amp; Articles
            </h2>
            <Link href="/articles" className="label" style={{ color: '#1a0f07', fontSize: '0.6rem' }}>
              Tous les articles →
            </Link>
          </div>
          {sideArticles.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featured?.coverImage ? (
                <img src={featured.coverImage} alt={featured.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              ) : (
                <div style={{ backgroundColor: '#d4a882', aspectRatio: '4/3' }} />
              )}
              <div style={{ borderTop: '1px solid rgba(26,15,7,0.15)' }}>
                {sideArticles.map((a) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} className="block group" style={{ borderBottom: '1px solid rgba(26,15,7,0.1)', padding: '16px 0' }}>
                    <span className="label" style={{ color: '#1a0f07', fontSize: '0.55rem', opacity: 0.6 }}>{a.category?.name}</span>
                    <p style={{ fontFamily: 'Oswald, sans-serif', color: '#1a0f07', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3, marginTop: 4, marginBottom: 4 }}>
                      {a.title}
                    </p>
                    <p style={{ color: '#1a0f07', fontSize: '0.75rem', opacity: 0.5 }}>
                      {a.author?.name} · {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {featured && (
            <>
              {featured.coverImage ? (
                <img src={featured.coverImage} alt={featured.title} style={{ width: '100%', height: 280, objectFit: 'cover', marginBottom: 24 }} />
              ) : (
                <div style={{ backgroundColor: '#d4a882', height: 280 }} className="w-full mb-6" />
              )}
              <span className="badge" style={{ backgroundColor: '#1a0f07', color: '#e8b84b', marginBottom: 12 }}>
                {featured.category?.name ?? 'Article'}
              </span>
              <Link href={`/articles/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#1a0f07', fontSize: '1.6rem', fontWeight: 700, marginBottom: 8, marginTop: 12 }}>
                  {featured.title}
                </h3>
              </Link>
              {featured.excerpt && (
                <p style={{ color: '#1a0f07', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 680, marginBottom: 12, opacity: 0.7 }}>
                  {featured.excerpt}
                </p>
              )}
              <p style={{ color: '#1a0f07', fontSize: '0.75rem', opacity: 0.5 }}>
                {featured.author?.name} · {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}{featured.readTime ? ` · ${featured.readTime} min` : ''}
              </p>
            </>
          )}
        </div>
      </section>
      )}

      {/* EXCLUSIF */}
      <section style={{ backgroundColor: '#1a0f07', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem', marginBottom: 12 }}>— Contenu exclusif —</p>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 12 }}>
              Réservé aux abonnés
            </h2>
            <p style={{ color: '#d4a882', fontSize: '0.875rem', maxWidth: 480, margin: '0 auto' }}>
              Versions longues, documentaires inédits, replays Q&A, archives — tout ce que YouTube ne peut pas accueillir.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {EXCLUSIVE.map((e) => (
              <div key={e.tag} style={{ border: '1px solid rgba(232,184,75,0.2)' }}>
                <div style={{ backgroundColor: '#241508', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span className="badge" style={{ position: 'absolute', top: 12, left: 12 }}>{e.tag}</span>
                  <svg width="28" height="32" viewBox="0 0 28 32" fill="none" stroke="#e8b84b" strokeWidth="1.5">
                    <rect x="4" y="14" width="20" height="16" rx="2" />
                    <path d="M9 14V9a5 5 0 0 1 10 0v5" />
                  </svg>
                  <span style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.75)', color: '#f2e8dc', fontSize: '0.65rem', padding: '1px 5px', fontFamily: 'IBM Plex Mono, monospace' }}>
                    {e.duration}
                  </span>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{e.title}</p>
                  <p style={{ color: '#d4a882', fontSize: '0.7rem' }}>{e.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/abonnement"
              style={{ border: '1.5px solid #e8b84b', color: '#e8b84b', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, padding: '14px 32px', display: 'inline-block' }}
            >
              Accéder à tout le contenu exclusif
            </Link>
          </div>
        </div>
      </section>

      {/* ABONNEMENT */}
      <section style={{ backgroundColor: '#130c05', padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem', marginBottom: 12 }}>— Soutenir Rach! —</p>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 12 }}>
              Abonnement
            </h2>
            <p style={{ color: '#d4a882', fontSize: '0.875rem' }}>
              Votre abonnement finance directement notre journalisme,<br />indépendant de toute publicité.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div style={{ border: '1px solid rgba(232,184,75,0.2)', padding: '28px 24px' }}>
              <p className="label" style={{ color: '#d4a882', fontSize: '0.55rem', marginBottom: 12 }}>Accès libre</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '2.5rem', fontWeight: 700, marginBottom: 4 }}>0€</p>
              <p style={{ color: '#d4a882', fontSize: '0.75rem', marginBottom: 20 }}>Toujours gratuit</p>
              <div className="flex flex-col gap-2 mb-6">
                {['Vidéos YouTube', 'Articles en accès libre'].map((f) => (
                  <p key={f} style={{ color: '#f2e8dc', fontSize: '0.8rem' }}>✓ {f}</p>
                ))}
                {['Contenu exclusif', 'Versions longues'].map((f) => (
                  <p key={f} style={{ color: 'rgba(212,168,130,0.3)', fontSize: '0.8rem', textDecoration: 'line-through' }}>✗ {f}</p>
                ))}
              </div>
              <Link href="/" style={{ display: 'block', border: '1.5px solid rgba(232,184,75,0.3)', color: '#d4a882', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 0', textAlign: 'center' }}>
                Continuer gratuitement
              </Link>
            </div>
            <div style={{ border: '2px solid #e8b84b', padding: '28px 24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, padding: '3px 10px', whiteSpace: 'nowrap' }}>
                Plus populaire
              </div>
              <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem', marginBottom: 12 }}>Soutien</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '2.5rem', fontWeight: 700, marginBottom: 4 }}>8€</p>
              <p style={{ color: '#d4a882', fontSize: '0.75rem', marginBottom: 20 }}>par mois</p>
              <div className="flex flex-col gap-2 mb-6">
                {["Tout l'accès libre", 'Vidéos exclusives & versions longues', 'Archives & replays Q&A', 'Newsletter abonnés'].map((f) => (
                  <p key={f} style={{ color: '#f2e8dc', fontSize: '0.8rem' }}>✓ {f}</p>
                ))}
              </div>
              <Link href="/abonnement" style={{ display: 'block', backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '12px 0', textAlign: 'center' }}>
                {"S'abonner"}
              </Link>
            </div>
            <div style={{ border: '1px solid rgba(232,184,75,0.2)', padding: '28px 24px' }}>
              <p className="label" style={{ color: '#d4a882', fontSize: '0.55rem', marginBottom: 12 }}>Mécène</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '2.5rem', fontWeight: 700, marginBottom: 4 }}>20€</p>
              <p style={{ color: '#d4a882', fontSize: '0.75rem', marginBottom: 20 }}>par mois</p>
              <div className="flex flex-col gap-2 mb-6">
                {["Tout l'accès Soutien", 'Crédit dans les génériques', 'Accès aux brouillons & coulisses', 'Rencontres annuelles'].map((f) => (
                  <p key={f} style={{ color: '#f2e8dc', fontSize: '0.8rem' }}>✓ {f}</p>
                ))}
              </div>
              <Link href="/abonnement" style={{ display: 'block', border: '1.5px solid rgba(232,184,75,0.3)', color: '#d4a882', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 0', textAlign: 'center' }}>
                Devenir mécène
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
