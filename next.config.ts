import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp', 'pg', 'pg-native'],
  images: {
    remotePatterns: [
      { hostname: 'i.ytimg.com' },
      { hostname: 'img.youtube.com' },
    ],
  },
}

export default withPayload(nextConfig)
