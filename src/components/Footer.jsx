import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Car, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={{ background: '#050507', borderTop: '1px solid var(--border-dark)', color: 'var(--text-sub)', paddingTop: '60px', paddingBottom: '30px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--primary-red)', padding: '6px', borderRadius: '6px' }}>
                <Car size={20} color="#FFF" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: '#FFF' }}>
                ASH <span style={{ color: 'var(--primary-red)' }}>GARAGE</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              {t('footerDesc')}
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-red)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>{t('dealerLicense')}</span>
            </div>
          </div>

          {/* Tokyo HQ Office */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>
              {t('tokyoOffice')}
            </h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', marginBottom: '10px' }}>
              <MapPin size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{t('tokyoAddress')}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', marginBottom: '10px' }}>
              <Phone size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              <span>{t('phone')}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem' }}>
              <Mail size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              <span>{t('email')}</span>
            </div>
          </div>

          {/* Yokohama Port Yard & Hours */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>
              {t('yokohamaYard')}
            </h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', marginBottom: '12px' }}>
              <MapPin size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{t('yokohamaAddress')}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem' }}>
              <Clock size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              <span>{t('hours')}</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-dark)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          {t('copyright')}
        </div>

      </div>
    </footer>
  );
};
