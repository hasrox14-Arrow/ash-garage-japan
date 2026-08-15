import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, ShieldCheck, Globe2, Award, Flame, Sparkles } from 'lucide-react';

export const Hero = ({ searchQuery, setSearchQuery, onBrowseClick, onInquireClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '50px 16px 70px',
      background: 'radial-gradient(circle at 50% 25%, rgba(255, 87, 34, 0.18) 0%, rgba(229, 9, 20, 0.12) 40%, rgba(10, 10, 12, 0.95) 80%), url("https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderBottom: '1px solid var(--border-orange)',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        position: 'relative',
        zIndex: 2,
        width: '100%'
      }}>
        
        {/* PROMINENT PERFECTLY CENTERED HERO LOGO EMBLEM */}
        <div style={{
          marginBottom: '16px',
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <img
            src="/ash-garage-logo.png"
            alt="Ash Garage Japan Logo"
            className="hero-logo-emblem"
            style={{
              height: '130px',
              width: 'auto',
              filter: 'drop-shadow(0 0 35px rgba(255, 87, 34, 0.55)) drop-shadow(0 0 15px rgba(229, 9, 20, 0.4))',
              transition: 'transform 0.4s ease',
              margin: '0 auto'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Top Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 16px',
          borderRadius: '30px',
          background: 'rgba(18, 18, 22, 0.85)',
          border: '1px solid var(--border-orange)',
          color: 'var(--primary-orange)',
          fontSize: '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          marginBottom: '16px',
          maxWidth: '100%',
          boxShadow: '0 4px 18px rgba(255, 87, 34, 0.25)'
        }}>
          <span className="pulse-dot-orange"></span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t('heroBadge')}</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#FFFFFF'
        }}>
          {t('heroTitleLine1')} <br />
          <span style={{
            background: 'var(--gradient-red-orange)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255, 87, 34, 0.3))'
          }}>
            {t('heroTitleLine2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: '760px',
          margin: '0 auto 30px',
          fontSize: 'clamp(0.88rem, 2.5vw, 1.1rem)',
          color: 'var(--text-sub)',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          {t('heroSubtitle')}
        </p>

        {/* Central Red/Orange Glass Search Bar */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 40px',
          position: 'relative',
          width: '100%'
        }}>
          <div className="glass-panel-orange hero-search-box" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px 8px 16px',
            borderRadius: '50px',
            gap: '8px',
            background: 'rgba(18, 18, 24, 0.92)',
            boxShadow: '0 14px 40px -5px rgba(255, 87, 34, 0.25)',
            width: '100%'
          }}>
            <Search size={20} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
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
                color: '#FFFFFF',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600
              }}
            />
            <button 
              onClick={onBrowseClick}
              className="btn-gradient"
              style={{ borderRadius: '30px', padding: '10px 20px', flexShrink: 0, fontSize: '0.85rem' }}
            >
              {t('viewInventoryBtn')}
            </button>
          </div>
        </div>

        {/* Key Exporter Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderColor: 'var(--border-orange)' }}>
            <Globe2 size={24} color="var(--primary-orange)" style={{ marginBottom: '6px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>85+</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('quickStatsCountries')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderColor: 'var(--border-orange)' }}>
            <Award size={24} color="var(--primary-orange)" style={{ marginBottom: '6px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>100%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('quickStatsRating')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderColor: 'var(--border-red)' }}>
            <ShieldCheck size={24} color="var(--primary-red)" style={{ marginBottom: '6px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>FOB / CIF</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-red)', fontWeight: 700 }}>{t('quickStatsCars')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
