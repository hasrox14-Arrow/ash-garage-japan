import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Lock, ShieldAlert, KeyRound } from 'lucide-react';

export const AdminLoginModal = ({ onClose, onLoginSuccess }) => {
  const { setIsAdminLoggedIn, t } = useLanguage();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      setIsAdminLoggedIn(true);
      onLoginSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '440px', padding: 0, background: '#FFFFFF' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'var(--red-dim)', color: 'var(--primary-red)' }}>
              <Lock size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {t('adminAuthModalTitle')}
            </h2>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: 1.5, fontWeight: 500 }}>
            {t('adminAuthDesc')}
          </p>

          {error && (
            <div style={{
              padding: '10px 14px',
              background: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              color: '#DC2626',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldAlert size={16} />
              <span>{t('adminAuthError')}</span>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '6px', fontWeight: 700 }}>
              {t('adminPasscodeLabel')} *
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                required
                autoFocus
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passcode (e.g. admin123)"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  color: 'var(--text-dark)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          <button type="submit" className="btn-red" style={{ padding: '12px', justifyContent: 'center', marginTop: '6px' }}>
            <span>{t('adminLoginBtn')}</span>
          </button>

        </form>

      </div>
    </div>
  );
};
