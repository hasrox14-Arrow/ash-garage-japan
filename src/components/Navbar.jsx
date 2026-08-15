import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, DollarSign, Menu, X, ShieldCheck, ChevronDown, ShieldAlert, Sparkles } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onAdminClick }) => {
  const { lang, setLang, currency, toggleCurrency, isAdminLoggedIn, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    const section = document.getElementById(tab);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(10, 10, 12, 0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-dark)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {/* Top Banner Notice - Responsive Mobile Layout */}
      <div style={{
        background: isAdminLoggedIn ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 87, 34, 0.12)',
        borderBottom: '1px solid #1E1E28',
        padding: '5px 12px',
        fontSize: '0.72rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <ShieldCheck size={13} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
          <span style={{ fontWeight: 700, color: 'var(--primary-orange)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t('dealerLicense')}
          </span>
        </div>

        {isAdminLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-red)', fontWeight: 800, flexShrink: 0 }}>
            <span className="pulse-dot-orange"></span>
            <span>ADMIN MODE</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span className="desktop-only-badge badge-orange" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
              JAPAN EXPORT DESK
            </span>
            <span style={{ color: 'var(--primary-red)', fontWeight: 800, whiteSpace: 'nowrap' }}>JST 09:00-19:00</span>
          </div>
        )}
      </div>

      {/* Main Navbar Header */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        gap: '8px',
        width: '100%'
      }}>
        {/* Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
        >
          <img
            src="/ash-garage-logo.png"
            alt="Ash Garage Logo"
            className="navbar-brand-logo"
            style={{
              height: '40px',
              width: 'auto',
              filter: 'drop-shadow(0 0 10px rgba(255, 87, 34, 0.4))'
            }}
          />

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1rem, 4vw, 1.35rem)',
              fontWeight: 900,
              letterSpacing: '0.5px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              lineHeight: 1.1
            }}>
              ASH <span style={{ color: 'var(--primary-orange)' }}>GARAGE</span>
            </div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '1px', color: 'var(--primary-red)', textTransform: 'uppercase', fontWeight: 800 }}>
              JAPAN VEHICLE EXPORTER
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <button 
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'home' ? 'var(--primary-orange)' : 'var(--text-sub)',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            {t('navHome')}
          </button>

          <button 
            onClick={() => handleNavClick('inventory')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'inventory' ? 'var(--primary-orange)' : 'var(--text-sub)',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            {t('navInventory')}
          </button>

          <button 
            onClick={() => handleNavClick('process')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'process' ? 'var(--primary-orange)' : 'var(--text-sub)',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            {t('navExportProcess')}
          </button>

          {isAdminLoggedIn && (
            <button 
              onClick={() => handleNavClick('admin')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'admin' ? 'var(--primary-red)' : 'var(--text-sub)',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {t('navAdmin')}
            </button>
          )}
        </nav>

        {/* Right Action Controls Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          
          {/* Admin Login Trigger */}
          {!isAdminLoggedIn && (
            <button
              onClick={onAdminClick}
              style={{
                background: 'var(--red-dim)',
                border: '1px solid var(--border-red)',
                color: 'var(--primary-red)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                minHeight: '34px'
              }}
              title="Admin Security Portal"
            >
              <ShieldAlert size={12} />
              <span>Admin</span>
            </button>
          )}

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            className="btn-outline"
            style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '2px', minHeight: '34px', borderColor: 'var(--primary-orange)', color: 'var(--primary-orange)' }}
            title="Toggle JPY / USD"
          >
            <DollarSign size={12} color="var(--primary-orange)" />
            <span style={{ fontWeight: 800 }}>{currency}</span>
          </button>

          {/* Header Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-orange)',
                borderRadius: '6px',
                padding: '4px 8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.75rem',
                fontWeight: 800,
                minHeight: '34px'
              }}
            >
              <Globe size={13} color="var(--primary-orange)" />
              <span>{lang === 'en' ? 'EN' : 'JA'}</span>
              <ChevronDown size={12} />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-orange)',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                width: '140px',
                overflow: 'hidden',
                zIndex: 1050
              }}>
                <button
                  onClick={() => {
                    setLang('en');
                    setLangDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: lang === 'en' ? 'var(--orange-dim)' : 'transparent',
                    border: 'none',
                    color: lang === 'en' ? 'var(--primary-orange)' : '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>🇬🇧</span> English
                </button>
                <button
                  onClick={() => {
                    setLang('ja');
                    setLangDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: lang === 'ja' ? 'var(--orange-dim)' : 'transparent',
                    border: 'none',
                    color: lang === 'ja' ? 'var(--primary-orange)' : '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>🇯🇵</span> 日本語
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu" style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-dark)',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: activeTab === 'home' ? 'var(--orange-dim)' : 'transparent',
              border: activeTab === 'home' ? '1px solid var(--border-orange)' : '1px solid transparent',
              color: activeTab === 'home' ? 'var(--primary-orange)' : '#FFFFFF',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {t('navHome')}
          </button>

          <button
            onClick={() => handleNavClick('inventory')}
            style={{
              background: activeTab === 'inventory' ? 'var(--orange-dim)' : 'transparent',
              border: activeTab === 'inventory' ? '1px solid var(--border-orange)' : '1px solid transparent',
              color: activeTab === 'inventory' ? 'var(--primary-orange)' : '#FFFFFF',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {t('navInventory')}
          </button>

          <button
            onClick={() => handleNavClick('process')}
            style={{
              background: activeTab === 'process' ? 'var(--orange-dim)' : 'transparent',
              border: activeTab === 'process' ? '1px solid var(--border-orange)' : '1px solid transparent',
              color: activeTab === 'process' ? 'var(--primary-orange)' : '#FFFFFF',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {t('navExportProcess')}
          </button>
        </div>
      )}
    </header>
  );
};
