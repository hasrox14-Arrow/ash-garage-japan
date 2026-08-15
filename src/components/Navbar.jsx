import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, DollarSign, Menu, X, ShieldCheck, ChevronDown, ShieldAlert, Home, Car, Settings } from 'lucide-react';

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
        padding: '6px 16px',
        fontSize: '0.75rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="var(--primary-red)" />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t('dealerLicense')}</span>
        </div>

        {isAdminLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-red)', fontWeight: 800 }}>
            <span className="pulse-dot"></span>
            <span>ADMIN MODE</span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>JST 09:00 - 19:00</span>
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <img
            src="/ash-garage-logo.png"
            alt="Ash Garage Logo"
            style={{
              height: '46px',
              width: 'auto',
              filter: 'drop-shadow(0 0 10px rgba(229, 9, 20, 0.3))'
            }}
          />

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '1px',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              ASH <span style={{ color: 'var(--primary-red)' }}>GARAGE</span>
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '1.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              JAPAN EXPORTER
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

        {/* Right Controls: Currency Switcher + Language + Admin + Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Admin Login Trigger */}
          {!isAdminLoggedIn && (
            <button
              onClick={onAdminClick}
              style={{
                background: 'var(--red-dim)',
                border: '1px solid var(--border-red)',
                color: 'var(--primary-red)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Admin Security Portal"
            >
              <ShieldAlert size={13} />
              <span>Admin</span>
            </button>
          )}

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            className="btn-outline"
            style={{ padding: '6px 10px', fontSize: '0.75rem', gap: '2px', minHeight: '36px' }}
            title="Toggle USD / JPY"
          >
            <DollarSign size={13} color="var(--primary-red)" />
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
                padding: '6px 10px',
                color: 'var(--text-white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                minHeight: '36px'
              }}
            >
              <Globe size={15} color="var(--primary-red)" />
              <span>{lang === 'en' ? 'EN' : 'JA'}</span>
              <ChevronDown size={12} />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-dark)',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
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
                    padding: '10px 12px',
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
                    padding: '10px 12px',
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
              background: 'none',
              border: 'none',
              color: '#FFF',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu" style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-dark)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: activeTab === 'home' ? 'var(--red-dim)' : 'transparent',
              border: activeTab === 'home' ? '1px solid var(--border-red)' : '1px solid transparent',
              color: activeTab === 'home' ? 'var(--primary-red)' : '#FFF',
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {t('navHome')}
          </button>

          <button
            onClick={() => handleNavClick('inventory')}
            style={{
              background: activeTab === 'inventory' ? 'var(--red-dim)' : 'transparent',
              border: activeTab === 'inventory' ? '1px solid var(--border-red)' : '1px solid transparent',
              color: activeTab === 'inventory' ? 'var(--primary-red)' : '#FFF',
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {t('navInventory')}
          </button>

          <button
            onClick={() => handleNavClick('process')}
            style={{
              background: activeTab === 'process' ? 'var(--red-dim)' : 'transparent',
              border: activeTab === 'process' ? '1px solid var(--border-red)' : '1px solid transparent',
              color: activeTab === 'process' ? 'var(--primary-red)' : '#FFF',
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {t('navExportProcess')}
          </button>

          {isAdminLoggedIn && (
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                background: activeTab === 'admin' ? 'var(--red-dim)' : 'transparent',
                border: activeTab === 'admin' ? '1px solid var(--border-red)' : '1px solid transparent',
                color: activeTab === 'admin' ? 'var(--primary-red)' : '#FFF',
                padding: '12px 16px',
                borderRadius: '8px',
                fontWeight: 800,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {t('navAdmin')}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
