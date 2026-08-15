import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ArrowRight } from 'lucide-react';

export const LanguageModal = () => {
  const { setLang } = useLanguage();

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel-red" style={{ maxWidth: '480px', padding: '32px 28px', textAlign: 'center', background: '#FFFFFF' }}>
        
        {/* Brand Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--red-dim)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 8px 24px rgba(229, 9, 20, 0.15)'
        }}>
          <Globe size={36} color="var(--primary-red)" />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.4rem',
          fontWeight: 900,
          marginBottom: '8px',
          color: 'var(--text-dark)'
        }}>
          Select Preferred Language
        </h2>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-sub)',
          marginBottom: '28px',
          lineHeight: 1.5,
          fontWeight: 500
        }}>
          Welcome to Ash Garage Japan. Please select your browsing language / 言語を選択してください。
        </p>

        {/* Language Options Grid */}
        <div style={{ display: 'grid', gap: '14px' }}>
          
          <button
            onClick={() => setLang('en')}
            className="btn-outline"
            style={{
              width: '100%',
              padding: '16px 20px',
              justify: 'space-between',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 800,
              background: '#F8FAFC',
              borderColor: '#E2E8F0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>🇬🇧</span>
              <span>English (International)</span>
            </div>
            <ArrowRight size={18} color="var(--primary-red)" />
          </button>

          <button
            onClick={() => setLang('ja')}
            className="btn-outline"
            style={{
              width: '100%',
              padding: '16px 20px',
              justify: 'space-between',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 800,
              background: '#F8FAFC',
              borderColor: '#E2E8F0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>🇯🇵</span>
              <span>日本語 (Japanese)</span>
            </div>
            <ArrowRight size={18} color="var(--primary-red)" />
          </button>

        </div>

      </div>
    </div>
  );
};
