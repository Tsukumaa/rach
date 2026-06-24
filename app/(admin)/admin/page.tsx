import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [totalArticles, published, drafts] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.article.count({ where: { published: false } }),
  ])

  const recent = await prisma.article.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' },
    include: { category: true },
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, color: '#fff' }}>Tableau de bord</h1>
        <Link href="/admin/articles/new" style={{ background: '#e8b84b', color: '#111', padding: '10px 20px', borderRadius: 4, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
          + Nouvel article
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total articles" value={totalArticles} />
        <StatCard label="Publiés" value={published} />
        <StatCard label="Brouillons" value={drafts} />
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2a2a2a' }}>
          <h2 style={{ fontSize: 16, color: '#fff' }}>Articles récents</h2>
        </div>
        {recent.length === 0 ? (
          <p style={{ padding: 20, color: '#666', fontSize: 14 }}>Aucun article pour l'instant.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12, fontWeight: 500 }}>TITRE</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12, fontWeight: 500 }}>CATÉGORIE</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12, fontWeight: 500 }}>STATUT</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12, fontWeight: 500 }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '12px 20px' }}>
                    <Link href={`/admin/articles/${a.id}/edit`} style={{ color: '#e2e2e2', textDecoration: 'none', fontSize: 14 }}>
                      {a.title}
                    </Link>
                  </td>
                  <td style={{ padding: '12px 20px', color: '#888', fontSize: 13 }}>{a.category?.name ?? '—'}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 99, background: a.published ? '#14532d' : '#292524', color: a.published ? '#4ade80' : '#888' }}>
                      {a.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', color: '#666', fontSize: 13 }}>
                    {new Date(a.updatedAt).toLocaleDateString('fr-FR')}
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

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '20px 24px' }}>
      <p style={{ color: '#666', fontSize: 12, marginBottom: 8 }}>{label}</p>
      <p style={{ color: '#fff', fontSize: 32, fontWeight: 700 }}>{value}</p>
    </div>
  )
}
