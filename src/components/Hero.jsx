import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, ShieldCheck, Globe2, Award, Flame, Sparkles } from 'lucide-react';

export const Hero = ({ searchQuery, setSearchQuery, onBrowseClick, onInquireClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '60px 20px 80px',
      background: 'radial-gradient(circle at 50% 25%, rgba(255, 87, 34, 0.18) 0%, rgba(229, 9, 20, 0.12) 40%, rgba(10, 10, 12, 0.95) 80%), url("https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderBottom: '1px solid var(--border-orange)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* PROMINENT CENTRAL HERO LOGO EMBLEM WITH GLOWING HALO */}
        <div style={{
          marginBottom: '20px',
          display: 'inline-block',
          position: 'relative'
        }}>
          <img
            src="/ash-garage-logo.png"
            alt="Ash Garage Japan Logo"
            style={{
              height: '140px',
              width: 'auto',
              filter: 'drop-shadow(0 0 35px rgba(255, 87, 34, 0.55)) drop-shadow(0 0 15px rgba(229, 9, 20, 0.4))',
              transition: 'transform 0.4s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Top Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '30px',
          background: 'rgba(18, 18, 22, 0.85)',
          border: '1px solid var(--border-orange)',
          color: 'var(--primary-orange)',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          marginBottom: '20px',
          boxShadow: '0 4px 18px rgba(255, 87, 34, 0.25)'
        }}>
          <span className="pulse-dot-orange"></span>
          <span>{t('heroBadge')}</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.1rem, 5.5vw, 4rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
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
          maxWidth: '780px',
          margin: '0 auto 36px',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          color: 'var(--text-sub)',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          {t('heroSubtitle')}
        </p>

        {/* Central Red/Orange Glass Search Bar */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 48px',
          position: 'relative'
        }}>
          <div className="glass-panel-orange hero-search-box" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px 8px 20px',
            borderRadius: '50px',
            gap: '10px',
            background: 'rgba(18, 18, 24, 0.92)',
            boxShadow: '0 14px 40px -5px rgba(255, 87, 34, 0.25)'
          }}>
            <Search size={22} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
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
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600
              }}
            />
            <button 
              onClick={onBrowseClick}
              className="btn-gradient"
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
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderColor: 'var(--border-orange)' }}>
            <Globe2 size={28} color="var(--primary-orange)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>85+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('quickStatsCountries')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderColor: 'var(--border-orange)' }}>
            <Award size={28} color="var(--primary-orange)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>100%</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('quickStatsRating')}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderColor: 'var(--border-red)' }}>
            <ShieldCheck size={28} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>FOB / CIF</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-red)', fontWeight: 700 }}>{t('quickStatsCars')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
