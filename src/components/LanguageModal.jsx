import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, Car } from 'lucide-react';

export const LanguageModal = () => {
  const { lang, setLang, showLangModal, setShowLangModal, t } = useLanguage();

  if (!showLangModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel-red" style={{ padding: '36px', textAlign: 'center' }}>
        
        {/* Header Icon */}
        <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'var(--red-dim)', color: 'var(--primary-red)', marginBottom: '16px' }}>
          <Globe size={40} />
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-white)' }}>
          {t('popupTitle')}
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
          {t('popupSub')}
        </p>

        {/* Language Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          
          <button
            onClick={() => setLang('en')}
            style={{
              padding: '20px',
              borderRadius: '10px',
              border: lang === 'en' ? '2px solid var(--primary-red)' : '1px solid var(--border-dark)',
              background: lang === 'en' ? 'rgba(229, 9, 20, 0.12)' : 'var(--bg-surface)',
              color: 'var(--text-white)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)'
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>🇬🇧</span>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>English</span>
            {lang === 'en' && <Check size={18} color="var(--primary-red)" />}
          </button>

          <button
            onClick={() => setLang('ja')}
            style={{
              padding: '20px',
              borderRadius: '10px',
              border: lang === 'ja' ? '2px solid var(--primary-red)' : '1px solid var(--border-dark)',
              background: lang === 'ja' ? 'rgba(229, 9, 20, 0.12)' : 'var(--bg-surface)',
              color: 'var(--text-white)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)'
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>🇯🇵</span>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>日本語</span>
            {lang === 'ja' && <Check size={18} color="var(--primary-red)" />}
          </button>

        </div>

        {/* Confirm Action Button */}
        <button
          onClick={() => {
            localStorage.setItem('ash_garage_lang_modal_dismissed', 'true');
            setShowLangModal(false);
          }}
          className="btn-red"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
        >
          <Car size={20} />
          {t('confirmLang')}
        </button>

        <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {t('changeLaterNote')}
        </p>

      </div>
    </div>
  );
};
