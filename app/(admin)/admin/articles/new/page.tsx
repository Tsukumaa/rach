import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import ArticleForm from '@/components/admin/ArticleForm'
import { redirect } from 'next/navigation'

export default async function NewArticlePage() {
  const session = await auth()
  if (!session?.user?.email) redirect('/admin/login')

  const [categories, author] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.user.findUnique({ where: { email: session.user.email } }),
  ])

  if (!author) redirect('/admin/login')

  return (
    <div>
      <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, color: '#fff', marginBottom: 24 }}>Nouvel article</h1>
      <ArticleForm categories={categories} authorId={author.id} />
    </div>
  )
}
