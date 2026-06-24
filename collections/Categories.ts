import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL de la catégorie (ex: enquete, reportage...)',
      },
    },
    {
      name: 'color',
      type: 'select',
      label: 'Couleur du badge',
      defaultValue: 'gold',
      options: [
        { label: 'Or', value: 'gold' },
        { label: 'Crème', value: 'cream' },
      ],
    },
  ],
}
