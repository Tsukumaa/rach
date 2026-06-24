import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import ArticleForm from '@/components/admin/ArticleForm'

export default async function NewArticlePage() {
  const session = await auth()
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, color: '#fff', marginBottom: 24 }}>Nouvel article</h1>
      <ArticleForm categories={categories} authorId={session!.user!.id!} />
    </div>
  )
}
