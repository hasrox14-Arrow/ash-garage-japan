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
      status: 'NEW_LEAD',
      submittedAt: new Date().toISOString()
    };

    try {
      // 1. Write to Cloud Firebase Firestore
      await saveInquiry(inquiryPayload);
      
      // 2. Record lead in global context
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
      <div className="modal-content glass-panel" style={{ maxWidth: '620px', padding: 0, background: '#FFFFFF' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge-red" style={{ marginBottom: '4px', display: 'inline-block' }}>{t('proformaInvoice')}</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-dark)' }}>
              {t('inquireHeading', { stockNo: vehicle.stockNo })}
            </h2>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Success Confirmation View */}
        {isSuccess ? (
          <div style={{ padding: '40px 28px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--red-dim)',
              color: 'var(--primary-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
              {t('quoteSubmittedSuccess')}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {t('quoteSubmittedDesc')}
            </p>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 700, marginBottom: '24px', border: '1px solid #E2E8F0' }}>
              Vehicle: {vehicle.make} {vehicle.model} ({vehicle.stockNo}) — {formattedPrice}
            </div>

            <button onClick={onClose} className="btn-red" style={{ padding: '12px 32px' }}>
              {t('closeBtn')}
            </button>
          </div>
        ) : (
          /* Inquiry Form */
          <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'grid', gap: '16px' }}>
            
            {/* Vehicle Summary Card */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              padding: '12px 16px',
              background: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}>
              <img
                src={vehicle.image}
                alt={vehicle.model}
                style={{ width: '80px', height: '54px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)' }}>{vehicle.model}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stock #{vehicle.stockNo} • {vehicle.year}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary-red)' }}>
                {formattedPrice}
              </div>
            </div>

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '6px', fontWeight: 700 }}>
                {t('fullNameLabel')} *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alexander Wright"
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

            {/* Email & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '6px', fontWeight: 700 }}>
                  {t('emailLabel')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
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

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '6px', fontWeight: 700 }}>
                  {t('phoneLabel')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
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
            </div>

            {/* Country */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '6px', fontWeight: 700 }}>
                {t('destinationCountry')} *
              </label>
              <div style={{ position: 'relative' }}>
                <Globe size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. United Kingdom (Southampton Port)"
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

            {/* Special Instructions Message */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '6px', fontWeight: 700 }}>
                {t('commentsLabel')}
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Requesting CIF shipping cost, inspection report, or export documents..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  color: 'var(--text-dark)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-red"
              style={{ padding: '14px', justifyContent: 'center', marginTop: '6px', fontSize: '0.95rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Connecting to Firebase Cloud...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
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
