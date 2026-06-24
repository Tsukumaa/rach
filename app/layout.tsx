import type { Metadata } from 'next'
import { Oswald, Lato, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Rach! — Le journalisme qui dérange',
  description: "Média indépendant de reportage social et d'enquête de terrain. Vidéos YouTube, articles, documentaires inédits.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${oswald.variable} ${lato.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
