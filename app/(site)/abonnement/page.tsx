export default function AbonnementPage() {
  const plans = [
    {
      name: 'Accès libre',
      price: '0€',
      sub: 'Toujours gratuit',
      highlight: false,
      features: ['Vidéos YouTube', 'Articles en accès libre'],
      missing: ['Contenu exclusif', 'Versions longues', 'Archives & replays'],
      cta: 'Continuer gratuitement',
      ctaHref: '/',
    },
    {
      name: 'Soutien',
      price: '8€',
      sub: 'par mois',
      highlight: true,
      badge: 'Plus populaire',
      features: ["Tout l'accès libre", 'Vidéos exclusives & versions longues', 'Archives & replays Q&A', 'Newsletter abonnés', 'Accès avant-première'],
      missing: [],
      cta: "S'abonner — Ko-fi",
      ctaHref: 'https://ko-fi.com',
    },
    {
      name: 'Mécène',
      price: '20€',
      sub: 'par mois',
      highlight: false,
      features: ["Tout l'accès Soutien", 'Crédit dans les génériques', 'Accès aux brouillons & coulisses', 'Rencontres annuelles', 'Accès direct par email'],
      missing: [],
      cta: 'Devenir mécène — Ko-fi',
      ctaHref: 'https://ko-fi.com',
    },
  ]

  return (
    <div style={{ backgroundColor: '#130c05', minHeight: '100vh', paddingTop: 80 }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem', marginBottom: 16 }}>— Soutenir Rach! —</p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: 16 }}>
            Abonnement
          </h1>
          <p style={{ color: '#d4a882', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Votre abonnement finance directement notre journalisme,<br />indépendant de toute publicité et de tout actionnaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                border: plan.highlight ? '2px solid #e8b84b' : '1px solid rgba(232,184,75,0.2)',
                padding: '32px 28px',
                position: 'relative',
                backgroundColor: plan.highlight ? 'rgba(232,184,75,0.04)' : 'transparent',
              }}
            >
              {plan.badge && (
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, padding: '3px 12px', whiteSpace: 'nowrap' }}>
                  {plan.badge}
                </div>
              )}
              <p className="label" style={{ color: plan.highlight ? '#e8b84b' : '#d4a882', fontSize: '0.55rem', marginBottom: 16 }}>{plan.name}</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '2.8rem', fontWeight: 700, marginBottom: 4 }}>{plan.price}</p>
              <p style={{ color: '#d4a882', fontSize: '0.8rem', marginBottom: 28 }}>{plan.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <p key={f} style={{ color: '#f2e8dc', fontSize: '0.85rem', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#e8b84b', flexShrink: 0 }}>✓</span> {f}
                  </p>
                ))}
                {plan.missing.map((f) => (
                  <p key={f} style={{ color: 'rgba(212,168,130,0.3)', fontSize: '0.85rem', textDecoration: 'line-through', display: 'flex', gap: 8 }}>
                    <span style={{ flexShrink: 0 }}>✗</span> {f}
                  </p>
                ))}
              </div>
              <a
                href={plan.ctaHref}
                target={plan.ctaHref.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  backgroundColor: plan.highlight ? '#e8b84b' : 'transparent',
                  color: plan.highlight ? '#1a0f07' : '#d4a882',
                  border: plan.highlight ? 'none' : '1.5px solid rgba(232,184,75,0.3)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: plan.highlight ? 700 : 500,
                  padding: '12px 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ borderTop: '1px solid rgba(232,184,75,0.15)', paddingTop: 48 }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.8rem', fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>
            Questions fréquentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640, margin: '0 auto' }}>
            {[
              { q: 'Comment fonctionne l'accès au contenu exclusif ?', r: 'Après votre abonnement sur Ko-fi, nous vous donnons accès manuellement au contenu. Un email vous sera envoyé sous 24h.' },
              { q: 'Puis-je annuler à tout moment ?', r: 'Oui, directement depuis Ko-fi. Aucun engagement, aucune pénalité.' },
              { q: 'Pourquoi passer par Ko-fi ?', r: "Ko-fi est une plateforme de soutien aux créateurs indépendants. Elle nous permet de rester indépendants sans intermédiaire publicitaire." },
              { q: 'Les vidéos YouTube resteront-elles gratuites ?', r: 'Oui, toujours. L'abonnement finance les formats longs et exclusifs, pas l'accès aux vidéos publiques.' },
            ].map((item) => (
              <div key={item.q} style={{ borderBottom: '1px solid rgba(232,184,75,0.1)', paddingBottom: 24 }}>
                <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>{item.q}</p>
                <p style={{ color: '#d4a882', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
