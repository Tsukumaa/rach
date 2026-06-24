'use client'
import { deleteArticle } from '@/lib/actions/articles'

export default function DeleteArticleButton({ id }: { id: string }) {
  return (
    <button
      onClick={async () => {
        if (confirm('Supprimer cet article définitivement ?')) {
          await deleteArticle(id)
        }
      }}
      style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}
    >
      Supprimer
    </button>
  )
}
