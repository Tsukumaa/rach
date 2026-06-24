'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const res = await signIn('credentials', {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      redirect: false,
    })
    if (res?.error) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, zIndex: 9999 }}>
      <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: 40, width: 360 }}>
        <h1 style={{ color: '#e8b84b', fontFamily: 'Oswald, sans-serif', fontSize: 24, marginBottom: 8 }}>Rach! Admin</h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 32 }}>Connecte-toi pour gérer le contenu</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#ccc', fontSize: 13, marginBottom: 6 }}>Email</label>
            <input
              name="email"
              type="email"
              required
              style={{ width: '100%', background: '#222', border: '1px solid #444', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#ccc', fontSize: 13, marginBottom: 6 }}>Mot de passe</label>
            <input
              name="password"
              type="password"
              required
              style={{ width: '100%', background: '#222', border: '1px solid #444', borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 16 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#e8b84b', color: '#111', border: 'none', borderRadius: 4, padding: '12px', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
