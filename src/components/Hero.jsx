import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, ShieldCheck, Globe2, Award, ArrowRight } from 'lucide-react';

export const Hero = ({ searchQuery, setSearchQuery, onBrowseClick, onInquireClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '80px 24px 100px',
      background: 'linear-gradient(180deg, rgba(10,10,12,0.6) 0%, rgba(10,10,12,1) 100%), url("https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderBottom: '1px solid var(--border-dark)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Top Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '30px',
          background: 'var(--red-dim)',
          border: '1px solid var(--border-red)',
          color: 'var(--primary-red)',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '1px',
          marginBottom: '24px'
        }}>
          <span className="pulse-dot"></span>
          <span>{t('heroBadge')}</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {t('heroTitleLine1')} <br />
          <span style={{
            color: 'var(--primary-red)',
            textShadow: '0 0 30px var(--red-glow)'
          }}>
            {t('heroTitleLine2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: '760px',
          margin: '0 auto 40px',
          fontSize: '1.1rem',
          color: 'var(--text-sub)',
          lineHeight: 1.6
        }}>
          {t('heroSubtitle')}
        </p>

        {/* Central Search Bar */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 48px',
          position: 'relative'
        }}>
          <div className="glass-panel-red" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px 8px 20px',
            borderRadius: '50px'
          }}>
            <Search size={22} color="var(--primary-red)" style={{ marginRight: '12px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFF',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)'
              }}
            />
            <button 
              onClick={onBrowseClick}
              className="btn-red"
              style={{ borderRadius: '30px', padding: '10px 24px', flexShrink: 0 }}
            >
              {t('viewInventoryBtn')}
            </button>
          </div>
        </div>

        {/* Key Exporter Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <Globe2 size={28} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>85+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('quickStatsCountries')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <Award size={28} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>100%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('quickStatsRating')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <ShieldCheck size={28} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>FOB / CIF</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('quickStatsCars')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
