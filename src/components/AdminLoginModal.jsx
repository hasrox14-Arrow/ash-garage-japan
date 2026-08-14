import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, KeyRound, X, LogIn } from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const { setIsAdminLoggedIn, t } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default passcode is admin123 (configurable in settings)
    if (password === 'admin123' || password === 'admin') {
      setIsAdminLoggedIn(true);
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel-red" style={{ maxWidth: '440px', padding: '32px' }}>
        
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'var(--red-dim)', color: 'var(--primary-red)', marginBottom: '12px' }}>
            <ShieldAlert size={36} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>
            {t('adminLoginTitle')}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            {t('adminLoginSub')}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} color="var(--primary-red)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passcode (Default: admin123)"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px',
                  background: 'var(--bg-surface)',
                  border: error ? '1px solid var(--primary-red)' : '1px solid var(--border-dark)',
                  borderRadius: '6px',
                  color: '#FFF',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            {error && (
              <p style={{ color: 'var(--primary-red)', fontSize: '0.8rem', marginTop: '6px' }}>
                Incorrect passcode. Please enter "admin123".
              </p>
            )}
          </div>

          <button type="submit" className="btn-red" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            <LogIn size={18} />
            <span>{t('loginBtn')}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
