import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    include: { category: true, author: { select: { name: true } } },
  })

  if (!article) notFound()

  const paragraphs = article.content.split('\n').filter(Boolean)

  return (
    <div style={{ backgroundColor: '#1a0f07', minHeight: '100vh', paddingTop: 80 }}>
      {/* Header */}
      <div style={{ backgroundColor: '#130c05', padding: '60px 0 48px' }}>
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/articles" style={{ color: '#e8b84b', fontSize: '0.75rem', fontFamily: 'IBM Plex Mono, monospace', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Tous les articles
          </Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {article.category && <span className="badge">{article.category.name}</span>}
            {article.exclusive && <span className="badge" style={{ backgroundColor: 'transparent', border: '1px solid #e8b84b' }}>Exclusif abonnés</span>}
          </div>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
            {article.title}
          </h1>
          {article.excerpt && (
            <p style={{ color: '#d4a882', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 620, marginBottom: 20 }}>
              {article.excerpt}
            </p>
          )}
          <p style={{ color: 'rgba(212,168,130,0.6)', fontSize: '0.8rem', fontFamily: 'IBM Plex Mono, monospace' }}>
            {article.author?.name}
            {article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}
            {article.readTime ? ` · ${article.readTime} min de lecture` : ''}
          </p>
        </div>
      </div>

      {/* Cover image */}
      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-6" style={{ marginTop: -24 }}>
          <img src={article.coverImage} alt={article.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6" style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {paragraphs.map((p, i) => {
            if (p.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.6rem', fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{p.slice(3)}</h2>
            if (p.startsWith('# ')) return <h1 key={i} style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '2rem', fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{p.slice(2)}</h1>
            if (p.startsWith('> ')) return <blockquote key={i} style={{ borderLeft: '3px solid #e8b84b', paddingLeft: 20, margin: '24px 0', color: '#d4a882', fontStyle: 'italic', fontSize: '1.05rem' }}>{p.slice(2)}</blockquote>
            return <p key={i} style={{ color: '#d4a882', fontSize: '1rem', lineHeight: 1.85, marginBottom: 20 }}>{p}</p>
          })}
        </div>
      </div>
    </div>
  )
}
