import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Articles } from './collections/Articles'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Rach! Admin',
    },
  },
  collections: [Articles, Authors, Categories, Media, Users],
  secret: process.env.PAYLOAD_SECRET || 'rach-secret-change-me',
  typescript: {
    outputFile: './payload-types.ts',
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: true,
  }),
})
