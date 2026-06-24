import Link from 'next/link'

export default function AProposPage() {
  return (
    <div style={{ backgroundColor: '#1a0f07', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#130c05', padding: '80px 0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="label" style={{ color: '#e8b84b', fontSize: '0.55rem', marginBottom: 16 }}>— Qui sommes-nous —</p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
            Le journalisme<br />qui <span style={{ color: '#e8b84b' }}>dérange.</span>
          </h1>
          <p style={{ color: '#d4a882', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 600 }}>
            Rach! est un média indépendant de reportage social et d'enquête de terrain, né du constat simple que le journalisme qui compte est de moins en moins visible dans les grands médias.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="grid-cols-1 lg:grid-cols-2">
          <div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.8rem', fontWeight: 700, marginBottom: 20 }}>Notre mission</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { titre: 'Indépendance totale', texte: 'Aucune publicité, aucun actionnaire. Nos seuls commanditaires, ce sont nos abonnés.' },
                { titre: 'Le terrain avant tout', texte: 'Nous ne faisons pas du journalisme depuis un bureau. Chaque sujet commence par une présence sur place.' },
                { titre: 'Accessibilité', texte: "Nos vidéos sont gratuites sur YouTube. L'abonnement finance les formats longs et exclusifs." },
                { titre: 'Transparence', texte: "Sources, méthodes, financement — nous publions tout ce qui nous permet d'être vérifiables." },
              ].map((item) => (
                <div key={item.titre} style={{ paddingLeft: 16, borderLeft: '2px solid rgba(232,184,75,0.3)' }}>
                  <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{item.titre}</p>
                  <p style={{ color: '#d4a882', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.texte}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.8rem', fontWeight: 700, marginBottom: 20 }}>L'équipe</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { nom: 'Rachida M.', role: 'Fondatrice & rédactrice en chef', bio: "Journaliste depuis 10 ans, ex-presse régionale. Elle a fondé Rach! pour faire le journalisme qu'elle ne pouvait plus faire ailleurs." },
                { nom: 'Thomas Riva', role: 'Reportage & terrain', bio: 'Spécialiste des questions sociales et du monde du travail. Il sillonne la France pour nos enquêtes de fond.' },
                { nom: 'Sofia Amara', role: 'Enquêtes & data', bio: 'Ancienne analyste reconvertie au journalisme. Elle croise chiffres et témoignages pour nos investigations.' },
              ].map((p) => (
                <div key={p.nom} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#241508', border: '1px solid rgba(232,184,75,0.2)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1rem', fontWeight: 600 }}>{p.nom}</p>
                    <p style={{ color: '#e8b84b', fontSize: '0.7rem', fontFamily: 'IBM Plex Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{p.role}</p>
                    <p style={{ color: '#d4a882', fontSize: '0.8rem', lineHeight: 1.6 }}>{p.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, padding: 40, border: '1px solid rgba(232,184,75,0.2)', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#f2e8dc', fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>
            Soutenir Rach!
          </h3>
          <p style={{ color: '#d4a882', fontSize: '0.875rem', marginBottom: 24 }}>
            Un abonnement à partir de 8€/mois suffit à nous garder indépendants.
          </p>
          <Link
            href="/abonnement"
            style={{ display: 'inline-block', backgroundColor: '#e8b84b', color: '#1a0f07', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 32px', textDecoration: 'none' }}
          >
            Voir les abonnements
          </Link>
        </div>
      </div>
    </div>
  )
}
