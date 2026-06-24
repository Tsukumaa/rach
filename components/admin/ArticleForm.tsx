'use client'
import { useActionState } from 'react'
import { createArticle, updateArticle } from '@/lib/actions/articles'

type Category = { id: string; name: string }
type Article = {
  id: string; title: string; slug: string; excerpt: string | null
  content: string; coverImage: string | null; readTime: number | null
  featured: boolean; exclusive: boolean; published: boolean
  categoryId: string | null; authorId: string
}

export default function ArticleForm({
  article,
  categories,
  authorId,
}: {
  article?: Article
  categories: Category[]
  authorId: string
}) {
  const action = article
    ? updateArticle.bind(null, article.id)
    : createArticle

  const input = (label: string, name: string, defaultValue?: string | number | null, type = 'text') => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ''}
        style={{ width: '100%', background: '#222', border: '1px solid #333', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
      />
    </div>
  )

  const checkbox = (label: string, name: string, defaultChecked = false) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ccc', fontSize: 14, cursor: 'pointer', marginBottom: 12 }}>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} style={{ width: 16, height: 16 }} />
      {label}
    </label>
  )

  return (
    <form action={action as (formData: FormData) => Promise<void>}>
      <input type="hidden" name="authorId" value={authorId} />
      {article && <input type="hidden" name="wasPublished" value={String(article.published)} />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Main column */}
        <div>
          {input('Titre *', 'title', article?.title)}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>Extrait</label>
            <textarea
              name="excerpt"
              defaultValue={article?.excerpt ?? ''}
              rows={3}
              style={{ width: '100%', background: '#222', border: '1px solid #333', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>Contenu (Markdown)</label>
            <textarea
              name="content"
              defaultValue={article?.content ?? ''}
              rows={20}
              required
              style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, padding: '12px', color: '#e2e2e2', fontSize: 14, fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Sidebar column */}
        <div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontSize: 15, marginBottom: 16 }}>Publication</h3>
            {checkbox('Publié', 'published', article?.published)}
            {checkbox('À la une', 'featured', article?.featured)}
            {checkbox('Contenu exclusif', 'exclusive', article?.exclusive)}
            <button
              type="submit"
              style={{ width: '100%', background: '#e8b84b', color: '#111', border: 'none', borderRadius: 4, padding: '12px', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}
            >
              {article ? 'Mettre à jour' : 'Créer l\'article'}
            </button>
          </div>

          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontSize: 15, marginBottom: 16 }}>Métadonnées</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>Catégorie</label>
              <select
                name="categoryId"
                defaultValue={article?.categoryId ?? ''}
                style={{ width: '100%', background: '#222', border: '1px solid #333', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
              >
                <option value="">Sans catégorie</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            {input('Temps de lecture (min)', 'readTime', article?.readTime, 'number')}
            {input("URL image de couverture", 'coverImage', article?.coverImage)}
          </div>
        </div>
      </div>
    </form>
  )
}
