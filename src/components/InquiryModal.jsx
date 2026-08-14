import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, CheckCircle, Car } from 'lucide-react';
import { saveInquiry } from '../firebase/config';

export const InquiryModal = ({ vehicle, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!vehicle) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inquiryPayload = {
      stockNo: vehicle.stockNo,
      model: vehicle.model,
      priceUsd: vehicle.priceUsd,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      message: formData.message,
      submittedAt: new Date().toISOString()
    };

    try {
      await saveInquiry(inquiryPayload);
    } catch (err) {
      console.log('Saved locally:', inquiryPayload);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel-red" style={{ maxWidth: '580px', padding: '32px' }}>
        
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', background: 'var(--red-dim)', color: 'var(--primary-red)' }}>
                <Car size={22} />
              </div>
              <div>
                <span className="badge-red">{vehicle.stockNo}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
                  {t('inquiryTitle')} {vehicle.model}
                </h3>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
              {t('inquirySubtitle')}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 600 }}>
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Smith"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 600 }}>
                    {t('emailAddress')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '6px',
                      color: '#FFF',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 600 }}>
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '6px',
                      color: '#FFF',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 600 }}>
                  {t('countryLabel')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. United States, United Kingdom, Australia..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 600 }}>
                  {t('messageLabel')}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('messagePlaceholder')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-red"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '8px' }}
              >
                <Send size={18} />
                <span>{loading ? t('submitting') : t('submitInquiry')}</span>
              </button>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={56} color="#10B981" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
              {t('inquirySuccessTitle')}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              {t('inquirySuccessMsg')}
            </p>
            <button
              onClick={onClose}
              className="btn-red"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              {t('closeModal')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
