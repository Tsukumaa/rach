import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Contenu',
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 225, position: 'centre' },
      { name: 'card', width: 800, height: 450, position: 'centre' },
      { name: 'hero', width: 1200, height: 675, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende',
    },
  ],
}
