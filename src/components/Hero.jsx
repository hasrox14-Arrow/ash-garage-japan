import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, ShieldCheck, Globe2, Award, Sparkles } from 'lucide-react';

export const Hero = ({ searchQuery, setSearchQuery, onBrowseClick, onInquireClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '70px 20px 90px',
      background: 'radial-gradient(circle at 50% 20%, rgba(13, 148, 136, 0.1) 0%, rgba(229, 9, 20, 0.05) 50%, transparent 80%), linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 60%, #F8FAFC 100%)',
      borderBottom: '1px solid var(--border-light)'
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
          padding: '6px 18px',
          borderRadius: '30px',
          background: 'linear-gradient(90deg, rgba(13, 148, 136, 0.12) 0%, rgba(229, 9, 20, 0.12) 100%)',
          border: '1px solid var(--border-teal)',
          color: 'var(--primary-teal)',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          marginBottom: '24px',
          boxShadow: '0 4px 14px rgba(13, 148, 136, 0.15)'
        }}>
          <Sparkles size={14} color="var(--primary-teal)" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.1rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: '18px',
          textTransform: 'uppercase',
          letterSpacing: '-0.5px',
          color: 'var(--text-dark)'
        }}>
          {t('heroTitleLine1')} <br />
          <span style={{
            background: 'linear-gradient(90deg, #0D9488 0%, #06B6D4 40%, #E50914 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('heroTitleLine2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: '780px',
          margin: '0 auto 36px',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          color: 'var(--text-sub)',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          {t('heroSubtitle')}
        </p>

        {/* Central Elevated Search Bar */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 48px',
          position: 'relative'
        }}>
          <div className="glass-panel-teal hero-search-box" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px 8px 20px',
            borderRadius: '50px',
            gap: '10px',
            background: '#FFFFFF',
            boxShadow: '0 14px 38px -5px rgba(13, 148, 136, 0.18), 0 4px 14px rgba(229, 9, 20, 0.1)'
          }}>
            <Search size={22} color="var(--primary-teal)" style={{ flexShrink: 0 }} />
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
                color: 'var(--text-dark)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600
              }}
            />
            <button 
              onClick={onBrowseClick}
              className="btn-teal"
              style={{ borderRadius: '30px', padding: '10px 24px', flexShrink: 0, fontSize: '0.9rem' }}
            >
              {t('viewInventoryBtn')}
            </button>
          </div>
        </div>

        {/* Key Exporter Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', borderColor: 'var(--border-teal)' }}>
            <Globe2 size={28} color="var(--primary-teal)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>85+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-teal)', fontWeight: 700 }}>{t('quickStatsCountries')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', borderColor: 'var(--border-teal)' }}>
            <Award size={28} color="var(--primary-teal)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>100%</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-teal)', fontWeight: 700 }}>{t('quickStatsRating')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', borderColor: 'var(--border-teal)' }}>
            <ShieldCheck size={28} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>FOB / CIF</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-red)', fontWeight: 700 }}>{t('quickStatsCars')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
