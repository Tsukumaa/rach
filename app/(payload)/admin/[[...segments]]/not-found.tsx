import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = ({ params, searchParams }: Args) =>
  // @ts-expect-error - dynamic import is the correct pattern for Payload v3
  NotFoundPage({ config: import('../../../../payload.config'), importMap, params, searchParams })

export default NotFound
