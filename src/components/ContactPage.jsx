import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Send, CheckCircle2, Building2, Anchor, Award, Loader2 } from 'lucide-react';
import { saveInquiry } from '../firebase/config';

export const ContactPage = () => {
  const { t, addInquiryLead } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: 'General Export Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiryPayload = {
      ...formData,
      stockNo: 'GENERAL_CONTACT',
      model: 'General Inquiry / Custom Order Request',
      priceUsd: 0,
      priceJpy: 0,
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
      console.warn("Contact form fallback local:", err);
      addInquiryLead(inquiryPayload);
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <section style={{ padding: '40px 16px 80px', background: 'var(--bg-obsidian)', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Page Banner Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge-orange" style={{ marginBottom: '8px', display: 'inline-block' }}>
            GLOBAL EXPORT DESK
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.7rem, 4.5vw, 3rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.5px',
            marginBottom: '10px'
          }}>
            CONTACT US & <span style={{ color: 'var(--primary-orange)' }}>ABOUT OUR GARAGE</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', maxWidth: '720px', margin: '0 auto', fontWeight: 500 }}>
            Connect with our Tokyo export managers for custom vehicle sourcing, CIF shipping quotes, and inspection certificate verification.
          </p>
        </div>

        {/* 2-Column Main Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* LEFT COLUMN: ABOUT US & OFFICES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* About Us Card */}
            <div className="glass-panel" style={{ padding: '20px', borderColor: 'var(--border-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Building2 size={22} color="var(--primary-orange)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                    Ash Garage Japan Co., Ltd.
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-orange)', fontWeight: 700 }}>
                    {t('dealerLicense')}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', lineHeight: 1.5, marginBottom: '14px', fontWeight: 500 }}>
                {t('footerDesc')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
                  <CheckCircle2 size={14} />
                  <span>150-Pt Inspection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
                  <CheckCircle2 size={14} />
                  <span>Real Mileage Docs</span>
                </div>
              </div>
            </div>

            {/* Tokyo HQ Location */}
            <div className="glass-panel" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <MapPin size={20} color="var(--primary-orange)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {t('tokyoOffice')}
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '10px', lineHeight: 1.4 }}>
                {t('tokyoAddress')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} color="var(--primary-orange)" />
                  <span>{t('phone')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} color="var(--primary-orange)" />
                  <span>{t('email')}</span>
                </div>
              </div>
            </div>

            {/* Yokohama Port Yard Location */}
            <div className="glass-panel" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Anchor size={20} color="var(--primary-red)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {t('yokohamaYard')}
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '10px', lineHeight: 1.4 }}>
                {t('yokohamaAddress')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Clock size={14} color="var(--primary-red)" />
                <span>{t('hours')}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: FIREBASE INQUIRY & CONTACT FORM */}
          <div className="glass-panel" style={{ padding: '24px 20px', borderColor: 'var(--border-orange)' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Send Direct Inquiry
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                {t('inquirySubtitle')}
              </p>
            </div>

            {isSuccess ? (
              <div style={{ padding: '30px 16px', textAlign: 'center' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
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
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Thank you for contacting Ash Garage Tokyo. Our export manager will review your request and reply to your email within 2 hours.
                </p>
                <button onClick={() => setIsSuccess(false)} className="btn-gradient" style={{ padding: '10px 20px' }}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
                
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                    {t('fullNameLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Wright"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div className="mobile-stack-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                      {t('emailLabel')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.88rem',
                        fontWeight: 600
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                      {t('phoneLabel')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
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

                {/* Country */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                    {t('destinationCountry')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom (Southampton Port)"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                    {t('commentsLabel')} *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the Japanese car model, year range, or CIF port shipping details you require..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient"
                  style={{ padding: '12px', justifyContent: 'center', fontSize: '0.9rem', marginTop: '4px' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending to Firebase Cloud...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Inquiry to Tokyo HQ</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
