import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    include: { category: true, author: { select: { name: true } } },
  })

  return (
    <div style={{ backgroundColor: '#1a0f07', minHeight: '100vh', paddingTop: 80 }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div style={{ marginBottom: 48 }}>
          <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem', marginBottom: 12 }}>— Toutes nos enquêtes —</p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700 }}>
            Articles &amp; Reportages
          </h1>
        </div>

        {articles.length === 0 ? (
          <p style={{ color: '#d4a882', fontSize: '1rem' }}>Aucun article publié pour l'instant. Revenez bientôt.</p>
        ) : (
          <div style={{ display: 'grid', gap: 0 }}>
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, padding: '28px 0', borderBottom: '1px solid rgba(232,184,75,0.12)', textDecoration: 'none' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    {a.category && (
                      <span className="badge" style={{ fontSize: '0.5rem' }}>{a.category.name}</span>
                    )}
                    {a.exclusive && (
                      <span className="badge" style={{ backgroundColor: '#1a0f07', border: '1px solid #e8b84b', fontSize: '0.5rem' }}>Exclusif</span>
                    )}
                  </div>
                  <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.3rem', fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p style={{ color: '#d4a882', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: 600 }}>{a.excerpt}</p>
                  )}
                  <p style={{ color: 'rgba(212,168,130,0.5)', fontSize: '0.75rem', marginTop: 10, fontFamily: 'IBM Plex Mono, monospace' }}>
                    {a.author?.name} · {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}{a.readTime ? ` · ${a.readTime} min` : ''}
                  </p>
                </div>
                <div style={{ color: '#e8b84b', fontSize: '1.5rem', alignSelf: 'center' }}>→</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
