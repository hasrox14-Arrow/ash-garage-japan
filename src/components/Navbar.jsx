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
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Banner Notice */}
      <div style={{
        background: isAdminLoggedIn ? 'rgba(229, 9, 20, 0.1)' : 'linear-gradient(90deg, #F0FDFA 0%, #FFFFFF 50%, #FFF5F5 100%)',
        borderBottom: '1px solid #E2E8F0',
        padding: '6px 20px',
        fontSize: '0.75rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="var(--primary-teal)" />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 700, color: 'var(--primary-teal)' }}>
            {t('dealerLicense')}
          </span>
        </div>

        {isAdminLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-red)', fontWeight: 800 }}>
            <span className="pulse-dot-red"></span>
            <span>ADMIN MODE</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge-gradient" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              <Sparkles size={11} style={{ display: 'inline', marginRight: '3px' }} />
              JAPAN EXPORT DESK
            </span>
            <span style={{ color: 'var(--primary-red)', fontWeight: 800 }}>JST 09:00 - 19:00</span>
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <img
            src="/ash-garage-logo.png"
            alt="Ash Garage Logo"
            style={{
              height: '48px',
              width: 'auto',
              filter: 'drop-shadow(0 4px 10px rgba(13, 148, 136, 0.2))'
            }}
          />

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              color: 'var(--text-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              ASH <span style={{ color: 'var(--primary-red)' }}>GARAGE</span>
            </div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '1.5px', color: 'var(--primary-teal)', textTransform: 'uppercase', fontWeight: 800 }}>
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
              color: activeTab === 'home' ? 'var(--primary-teal)' : 'var(--text-sub)',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'var(--transition-fast)'
            }}
          >
            {t('navHome')}
          </button>

          <button 
            onClick={() => handleNavClick('inventory')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'inventory' ? 'var(--primary-teal)' : 'var(--text-sub)',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'var(--transition-fast)'
            }}
          >
            {t('navInventory')}
          </button>

          <button 
            onClick={() => handleNavClick('process')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'process' ? 'var(--primary-teal)' : 'var(--text-sub)',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'var(--transition-fast)'
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

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Admin Login Trigger */}
          {!isAdminLoggedIn && (
            <button
              onClick={onAdminClick}
              style={{
                background: 'var(--red-dim)',
                border: '1px solid var(--border-red)',
                color: 'var(--primary-red)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
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
            style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '2px', minHeight: '38px', borderColor: 'var(--primary-teal)', color: 'var(--primary-teal)' }}
            title="Toggle JPY / USD"
          >
            <DollarSign size={14} color="var(--primary-teal)" />
            <span style={{ fontWeight: 800 }}>{currency}</span>
          </button>

          {/* Header Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-teal)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: 'var(--text-dark)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 800,
                minHeight: '38px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Globe size={16} color="var(--primary-teal)" />
              <span>{lang === 'en' ? 'EN' : '日本語'}</span>
              <ChevronDown size={14} />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: '#FFFFFF',
                border: '1px solid var(--border-teal)',
                borderRadius: '10px',
                boxShadow: '0 10px 25px rgba(13, 148, 136, 0.15)',
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
                    background: lang === 'en' ? 'var(--teal-dim)' : 'transparent',
                    border: 'none',
                    color: lang === 'en' ? 'var(--primary-teal)' : 'var(--text-dark)',
                    fontWeight: 700,
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
                    background: lang === 'ja' ? 'var(--teal-dim)' : 'transparent',
                    border: 'none',
                    color: lang === 'ja' ? 'var(--primary-teal)' : 'var(--text-dark)',
                    fontWeight: 700,
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
              color: 'var(--text-dark)',
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
          background: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: activeTab === 'home' ? 'var(--teal-dim)' : 'transparent',
              border: activeTab === 'home' ? '1px solid var(--border-teal)' : '1px solid transparent',
              color: activeTab === 'home' ? 'var(--primary-teal)' : 'var(--text-dark)',
              padding: '12px 16px',
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
              background: activeTab === 'inventory' ? 'var(--teal-dim)' : 'transparent',
              border: activeTab === 'inventory' ? '1px solid var(--border-teal)' : '1px solid transparent',
              color: activeTab === 'inventory' ? 'var(--primary-teal)' : 'var(--text-dark)',
              padding: '12px 16px',
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
              background: activeTab === 'process' ? 'var(--teal-dim)' : 'transparent',
              border: activeTab === 'process' ? '1px solid var(--border-teal)' : '1px solid transparent',
              color: activeTab === 'process' ? 'var(--primary-teal)' : 'var(--text-dark)',
              padding: '12px 16px',
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
