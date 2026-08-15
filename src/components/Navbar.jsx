import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, DollarSign, Menu, X, ShieldCheck, ChevronDown, ShieldAlert } from 'lucide-react';

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
      background: 'rgba(10, 10, 12, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-dark)'
    }}>
      {/* Top Banner Notice */}
      <div style={{
        background: isAdminLoggedIn ? 'rgba(229, 9, 20, 0.2)' : 'var(--bg-surface)',
        borderBottom: '1px solid #1F1F28',
        padding: '6px 24px',
        fontSize: '0.75rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="var(--primary-red)" />
          <span>{t('dealerLicense')}</span>
        </div>

        {isAdminLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-red)', fontWeight: 800 }}>
            <span className="pulse-dot"></span>
            <span>ADMINISTRATOR MODE ACTIVE</span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Tokyo & Yokohama Port Loading</span>
            <span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>JST 09:00 - 19:00</span>
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          {/* New Custom Transparent Logo */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            <img
              src="/ash-garage-logo.png"
              alt="Ash Garage Logo"
              style={{
                height: '52px',
                width: 'auto',
                filter: 'drop-shadow(0 0 10px rgba(229, 9, 20, 0.3))',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 900,
              letterSpacing: '1px',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              ASH <span style={{ color: 'var(--primary-red)' }}>GARAGE</span>
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              JAPAN VEHICLE EXPORTER
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'home' ? 'var(--primary-red)' : 'var(--text-sub)',
              fontWeight: 700,
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
              color: activeTab === 'inventory' ? 'var(--primary-red)' : 'var(--text-sub)',
              fontWeight: 700,
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
              color: activeTab === 'process' ? 'var(--primary-red)' : 'var(--text-sub)',
              fontWeight: 700,
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

        {/* Right Tools: Admin Trigger + Currency Switcher + Header Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Admin Login Trigger */}
          {!isAdminLoggedIn && (
            <button
              onClick={onAdminClick}
              style={{
                background: 'var(--red-dim)',
                border: '1px solid var(--border-red)',
                color: 'var(--primary-red)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Admin Security Portal"
            >
              <ShieldAlert size={14} />
              <span>Admin</span>
            </button>
          )}

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            className="btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
            title="Toggle USD / JPY"
          >
            <DollarSign size={14} color="var(--primary-red)" />
            <span>{currency}</span>
          </button>

          {/* Header Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-red)',
                borderRadius: '6px',
                padding: '6px 12px',
                color: 'var(--text-white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              <Globe size={16} color="var(--primary-red)" />
              <span>{lang === 'en' ? 'EN' : '日本語'}</span>
              <ChevronDown size={14} />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-dark)',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                width: '150px',
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
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: lang === 'en' ? 'var(--red-dim)' : 'transparent',
                    border: 'none',
                    color: lang === 'en' ? 'var(--primary-red)' : 'var(--text-white)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: lang === 'ja' ? 'var(--red-dim)' : 'transparent',
                    border: 'none',
                    color: lang === 'ja' ? 'var(--primary-red)' : 'var(--text-white)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#FFF',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
