import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, CheckCircle2, ShieldCheck, Mail, User, Phone, Globe, FileText, Loader2 } from 'lucide-react';
import { saveInquiry } from '../firebase/config';

export const InquiryModal = ({ vehicle, onClose }) => {
  const { currency, addInquiryLead, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    port: 'Long Beach Port',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!vehicle) return null;

  const formattedPrice = currency === 'USD'
    ? `$${vehicle.priceUsd.toLocaleString()} USD`
    : `¥${vehicle.priceJpy.toLocaleString()} JPY`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiryPayload = {
      ...formData,
      stockNo: vehicle.stockNo,
      model: vehicle.model,
      priceUsd: vehicle.priceUsd,
      priceJpy: vehicle.priceJpy,
      customerName: formData.name,
      status: 'NEW_LEAD',
      submittedAt: new Date().toISOString()
    };

    try {
      await saveInquiry(inquiryPayload);
      addInquiryLead(inquiryPayload);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.warn("Submission fallback local:", err);
      addInquiryLead(inquiryPayload);
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '620px', padding: 0, background: 'var(--bg-card)', borderColor: 'var(--border-orange)' }}>
        
        {/* Sticky Header Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '14px 18px',
          background: 'rgba(27, 27, 36, 0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-dark)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
        }}>
          <div>
            <span className="badge-orange" style={{ marginBottom: '2px', display: 'inline-block' }}>{t('proformaInvoice')}</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: '#FFFFFF' }}>
              {t('inquireHeading', { stockNo: vehicle.stockNo })}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 87, 34, 0.15)',
              border: '1px solid var(--border-orange)',
              borderRadius: '50%',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              width: '36px',
              height: '36px',
              flexShrink: 0
            }}
            title="Close Inquiry Modal"
          >
            <X size={20} color="var(--primary-orange)" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--orange-dim)',
              color: 'var(--primary-orange)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              {t('quoteSubmittedSuccess')}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', maxWidth: '440px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              {t('quoteSubmittedDesc')}
            </p>

            <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '20px', border: '1px solid var(--border-dark)' }}>
              Vehicle: {vehicle.make} {vehicle.model} ({vehicle.stockNo}) — {formattedPrice}
            </div>

            <button onClick={onClose} className="btn-gradient" style={{ padding: '10px 28px' }}>
              {t('closeBtn')}
            </button>
          </div>
        ) : (
          /* Inquiry Form */
          <form onSubmit={handleSubmit} style={{ padding: '18px 20px', display: 'grid', gap: '14px' }}>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              padding: '10px 12px',
              background: 'var(--bg-surface)',
              borderRadius: '8px',
              border: '1px solid var(--border-dark)'
            }}>
              <img
                src={vehicle.image}
                alt={vehicle.model}
                style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vehicle.model}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stock #{vehicle.stockNo} • {vehicle.year}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: 'var(--primary-orange)', flexShrink: 0 }}>
                {formattedPrice}
              </div>
            </div>

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                {t('fullNameLabel')} *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alexander Wright"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontWeight: 600
                  }}
                />
              </div>
            </div>

            {/* Email & Phone Responsive Grid */}
            <div className="mobile-stack-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                  {t('emailLabel')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                  {t('phoneLabel')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                {t('destinationCountry')} *
              </label>
              <div style={{ position: 'relative' }}>
                <Globe size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. United Kingdom (Southampton Port)"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontWeight: 600
                  }}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                {t('commentsLabel')}
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Requesting CIF shipping cost, inspection report, or export documents..."
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gradient"
              style={{ padding: '12px', justifyContent: 'center', marginTop: '4px', fontSize: '0.9rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Connecting to Firebase Cloud...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>{t('submitQuoteBtn')}</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
