import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#130c05', borderTop: '1px solid rgba(232,184,75,0.1)' }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div style={{ fontFamily: 'Oswald, sans-serif', color: '#e8b84b', fontSize: '1.5rem', fontWeight: 700 }} className="mb-4">
              Rach!
            </div>
            <p style={{ color: '#d4a882', fontSize: '0.875rem', lineHeight: 1.6 }} className="mb-4">
              Média indépendant de reportage social et d'enquête de terrain. Fondé en 2022. Aucun actionnaire, aucune publicité.
            </p>
            <div className="flex gap-4">
              {['YouTube', 'Instagram', 'X'].map((social) => (
                <a key={social} href="#" style={{ color: '#d4a882', fontSize: '0.75rem' }} className="hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="label mb-4" style={{ color: '#e8b84b' }}>Contenus</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Enquêtes', href: '/enquetes' },
                { label: 'Reportages', href: '/reportages' },
                { label: 'Articles', href: '/articles' },
                { label: 'Vidéos', href: '/videos' },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: '#d4a882', fontSize: '0.875rem' }} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="label mb-4" style={{ color: '#e8b84b' }}>Rach!</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'À propos', href: '/a-propos' },
                { label: "L'équipe", href: '/equipe' },
                { label: 'Manifeste', href: '/manifeste' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: '#d4a882', fontSize: '0.875rem' }} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="label mb-4" style={{ color: '#e8b84b' }}>Newsletter</div>
            <p style={{ color: '#d4a882', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Recevoir nos nouvelles enquêtes directement.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="votre@email.fr"
                style={{
                  backgroundColor: '#1a0f07',
                  border: '1px solid rgba(232,184,75,0.3)',
                  color: '#f2e8dc',
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  flex: 1,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{ backgroundColor: '#e8b84b', color: '#1a0f07', padding: '8px 12px', fontWeight: 700 }}
              >
                →
              </button>
            </form>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(232,184,75,0.1)', paddingTop: '1.5rem' }} className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p style={{ color: 'rgba(212,168,130,0.4)', fontSize: '0.75rem' }}>
            © 2026 Rach! · Tous droits réservés
          </p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" style={{ color: 'rgba(212,168,130,0.4)', fontSize: '0.75rem' }} className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" style={{ color: 'rgba(212,168,130,0.4)', fontSize: '0.75rem' }} className="hover:text-white transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
