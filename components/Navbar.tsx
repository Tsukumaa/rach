'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{ backgroundColor: '#1a0f07', borderBottom: '1px solid rgba(232,184,75,0.2)' }} className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" style={{ fontFamily: 'Oswald, sans-serif', color: '#e8b84b', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            Rach!
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Enquêtes', href: '/enquetes' },
              { label: 'Vidéos', href: '/videos' },
              { label: 'Reportages', href: '/reportages' },
              { label: 'À propos', href: '/a-propos' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label hover:text-white transition-colors"
                style={{ color: '#f2e8dc' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/abonnement"
          style={{ backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, padding: '6px 14px' }}
          className="hidden md:block hover:opacity-90 transition-opacity"
        >
          S'abonner
        </Link>
        <button
          className="md:hidden"
          style={{ color: '#e8b84b' }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div style={{ backgroundColor: '#1a0f07', borderTop: '1px solid rgba(232,184,75,0.15)' }} className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {[
            { label: 'Enquêtes', href: '/enquetes' },
            { label: 'Vidéos', href: '/videos' },
            { label: 'Reportages', href: '/reportages' },
            { label: 'À propos', href: '/a-propos' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="label" style={{ color: '#f2e8dc' }}>
              {link.label}
            </Link>
          ))}
          <Link href="/abonnement" style={{ backgroundColor: '#e8b84b', color: '#1a0f07' }} className="label text-center py-2 px-4">
            S'abonner
          </Link>
        </div>
      )}
    </nav>
  )
}
