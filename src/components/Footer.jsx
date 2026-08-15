import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: '#F8FAFC',
      borderTop: '1px solid var(--border-light)',
      color: 'var(--text-sub)',
      paddingTop: '60px',
      paddingBottom: '30px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/ash-garage-logo.png"
                alt="Ash Garage Logo"
                style={{ height: '48px', width: 'auto' }}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-dark)' }}>
                ASH <span style={{ color: 'var(--primary-red)' }}>GARAGE</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 500 }}>
              {t('footerDesc')}
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-red)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>{t('dealerLicense')}</span>
            </div>
          </div>

          {/* Tokyo HQ Office */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
              {t('tokyoOffice')}
            </h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', marginBottom: '10px', fontWeight: 500 }}>
              <MapPin size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{t('tokyoAddress')}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', marginBottom: '10px', fontWeight: 500 }}>
              <Phone size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              <span>{t('phone')}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', fontWeight: 500 }}>
              <Mail size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              <span>{t('email')}</span>
            </div>
          </div>

          {/* Yokohama Port Yard & Hours */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
              {t('yokohamaYard')}
            </h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', marginBottom: '12px', fontWeight: 500 }}>
              <MapPin size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{t('yokohamaAddress')}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', fontWeight: 500 }}>
              <Clock size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              <span>{t('hours')}</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontWeight: 600
        }}>
          {t('copyright')}
        </div>

      </div>
    </footer>
  );
};
