import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ArticleForm from '@/components/admin/ArticleForm'
import DeleteArticleButton from '@/components/admin/DeleteArticleButton'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [article, categories] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])

  if (!article) notFound()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, color: '#fff' }}>Éditer l'article</h1>
        <DeleteArticleButton id={article.id} />
      </div>
      <ArticleForm article={article} categories={categories} authorId={article.authorId} />
    </div>
  )
}
