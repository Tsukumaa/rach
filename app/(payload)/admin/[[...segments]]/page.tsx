import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  // @ts-expect-error - dynamic import is the correct pattern for Payload v3
  generatePageMetadata({ config: import('../../../../payload.config'), params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  // @ts-expect-error - dynamic import is the correct pattern for Payload v3
  RootPage({ config: import('../../../../payload.config'), importMap, params, searchParams })

export default Page
