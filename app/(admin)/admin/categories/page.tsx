import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function createCategory(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  const slug = name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  await prisma.category.create({ data: { name, slug, color: formData.get('color') as string || '#e8b84b' } })
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, color: '#fff', marginBottom: 24 }}>Catégories</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>Nouvelle catégorie</h2>
          <form action={createCategory}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>Nom</label>
              <input name="name" required style={{ width: '100%', background: '#222', border: '1px solid #333', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>Couleur</label>
              <input name="color" type="color" defaultValue="#e8b84b" style={{ height: 40, width: 80, borderRadius: 4, border: '1px solid #333', background: '#222', cursor: 'pointer' }} />
            </div>
            <button type="submit" style={{ background: '#e8b84b', color: '#111', border: 'none', borderRadius: 4, padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}>
              Créer
            </button>
          </form>
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8 }}>
          {categories.length === 0 ? (
            <p style={{ padding: 24, color: '#666' }}>Aucune catégorie.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>NOM</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>SLUG</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', color: '#888', fontSize: 12 }}>COULEUR</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #222' }}>
                    <td style={{ padding: '12px 20px', color: '#e2e2e2', fontSize: 14 }}>{c.name}</td>
                    <td style={{ padding: '12px 20px', color: '#666', fontSize: 13, fontFamily: 'monospace' }}>{c.slug}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ display: 'inline-block', width: 24, height: 24, borderRadius: 4, background: c.color }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
