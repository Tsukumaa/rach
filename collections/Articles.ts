import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    group: 'Contenu',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
    preview: (doc) => `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${doc.slug}`,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: {
        description: 'Généré automatiquement depuis le titre',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Résumé',
      admin: {
        description: 'Court résumé affiché dans les listes d\'articles',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Catégorie',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      label: 'Auteur',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Contenu (Markdown)',
      required: true,
      admin: {
        description: 'Supporte le Markdown : **gras**, *italique*, ## titre, etc.',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Temps de lecture (minutes)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Article à la une',
      defaultValue: false,
    },
    {
      name: 'exclusive',
      type: 'checkbox',
      label: 'Réservé aux abonnés',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
