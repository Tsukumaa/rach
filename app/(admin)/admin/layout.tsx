import Link from 'next/link'
import { auth, signOut } from '@/lib/auth'

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#e2e2e2', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#1a1a1a', borderRight: '1px solid #2a2a2a', padding: '24px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #2a2a2a', marginBottom: 16 }}>
          <span style={{ color: '#e8b84b', fontFamily: 'Oswald, sans-serif', fontSize: 20, fontWeight: 700 }}>Rach!</span>
          <span style={{ color: '#555', fontSize: 12, display: 'block', marginTop: 2 }}>Admin</span>
        </div>
        <nav style={{ flex: 1 }}>
          <NavLink href="/admin">Tableau de bord</NavLink>
          <NavLink href="/admin/articles">Articles</NavLink>
          <NavLink href="/admin/articles/new">+ Nouvel article</NavLink>
          <NavLink href="/admin/categories">Catégories</NavLink>
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #2a2a2a' }}>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{session?.user?.email}</p>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
            <button type="submit" style={{ color: '#888', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      {/* Main */}
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ display: 'block', padding: '10px 20px', color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
      {children}
    </Link>
  )
}
