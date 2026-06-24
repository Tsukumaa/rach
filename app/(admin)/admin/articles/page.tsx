import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { category: true, author: { select: { name: true } } },
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, color: '#fff' }}>Articles</h1>
        <Link href="/admin/articles/new" style={{ background: '#e8b84b', color: '#111', padding: '10px 20px', borderRadius: 4, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
          + Nouvel article
        </Link>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8 }}>
        {articles.length === 0 ? (
          <p style={{ padding: 32, color: '#666', textAlign: 'center' }}>Aucun article. <Link href="/admin/articles/new" style={{ color: '#e8b84b' }}>Créer le premier ?</Link></p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>TITRE</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>AUTEUR</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>CATÉGORIE</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>STATUT</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>MODIFIÉ</th>
                <th style={{ padding: '12px 20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '12px 20px', color: '#e2e2e2', fontSize: 14 }}>{a.title}</td>
                  <td style={{ padding: '12px 20px', color: '#888', fontSize: 13 }}>{a.author?.name ?? '—'}</td>
                  <td style={{ padding: '12px 20px', color: '#888', fontSize: 13 }}>{a.category?.name ?? '—'}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 99, background: a.published ? '#14532d' : '#292524', color: a.published ? '#4ade80' : '#888' }}>
                      {a.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', color: '#666', fontSize: 13 }}>
                    {new Date(a.updatedAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <Link href={`/admin/articles/${a.id}/edit`} style={{ color: '#e8b84b', fontSize: 13, textDecoration: 'none' }}>
                      Éditer →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
