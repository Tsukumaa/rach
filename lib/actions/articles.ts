'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getAuthorId(): Promise<string> {
  const session = await auth()
  if (!session?.user?.email) throw new Error('Non authentifié')
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) throw new Error('Utilisateur introuvable')
  return user.id
}

export async function createArticle(formData: FormData) {
  const authorId = await getAuthorId()
  const title = formData.get('title') as string
  const slug = slugify(title)

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: (formData.get('excerpt') as string) || null,
      content: formData.get('content') as string,
      coverImage: (formData.get('coverImage') as string) || null,
      readTime: formData.get('readTime') ? parseInt(formData.get('readTime') as string) : null,
      featured: formData.get('featured') === 'on',
      exclusive: formData.get('exclusive') === 'on',
      published: formData.get('published') === 'on',
      publishedAt: formData.get('published') === 'on' ? new Date() : null,
      authorId,
      categoryId: (formData.get('categoryId') as string) || null,
    },
  })
  revalidatePath('/admin/articles')
  revalidatePath('/')
  redirect('/admin/articles')
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const wasPublished = formData.get('wasPublished') === 'true'
  const isPublished = formData.get('published') === 'on'

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      excerpt: (formData.get('excerpt') as string) || null,
      content: formData.get('content') as string,
      coverImage: (formData.get('coverImage') as string) || null,
      readTime: formData.get('readTime') ? parseInt(formData.get('readTime') as string) : null,
      featured: formData.get('featured') === 'on',
      exclusive: formData.get('exclusive') === 'on',
      published: isPublished,
      publishedAt: isPublished && !wasPublished ? new Date() : undefined,
      categoryId: (formData.get('categoryId') as string) || null,
    },
  })
  revalidatePath('/admin/articles')
  revalidatePath('/')
  redirect('/admin/articles')
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } })
  revalidatePath('/admin/articles')
  revalidatePath('/')
  redirect('/admin/articles')
}
