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
    <section style={{ padding: '60px 20px 90px', background: 'var(--bg-obsidian)', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Page Banner Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge-orange" style={{ marginBottom: '10px', display: 'inline-block' }}>
            GLOBAL EXPORT DESK
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '1px',
            marginBottom: '12px'
          }}>
            CONTACT US & <span style={{ color: 'var(--primary-orange)' }}>ABOUT OUR GARAGE</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-sub)', maxWidth: '720px', margin: '0 auto', fontWeight: 500 }}>
            Connect with our Tokyo export managers for custom vehicle sourcing, CIF shipping quotes, and inspection certificate verification.
          </p>
        </div>

        {/* 2-Column Main Section: Left = About & Locations, Right = Contact Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
          
          {/* LEFT COLUMN: ABOUT US & OFFICES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* About Us Card */}
            <div className="glass-panel" style={{ padding: '28px', borderColor: 'var(--border-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={24} color="var(--primary-orange)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                    Ash Garage Japan Co., Ltd.
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 700 }}>
                    {t('dealerLicense')}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 500 }}>
                {t('footerDesc')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#10B981', fontWeight: 700 }}>
                  <CheckCircle2 size={16} />
                  <span>150-Point Inspection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#10B981', fontWeight: 700 }}>
                  <CheckCircle2 size={16} />
                  <span>Real Mileage Docs</span>
                </div>
              </div>
            </div>

            {/* Tokyo HQ Location */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <MapPin size={22} color="var(--primary-orange)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {t('tokyoOffice')}
                </h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginBottom: '12px', lineHeight: 1.5 }}>
                {t('tokyoAddress')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={16} color="var(--primary-orange)" />
                  <span>{t('phone')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={16} color="var(--primary-orange)" />
                  <span>{t('email')}</span>
                </div>
              </div>
            </div>

            {/* Yokohama Port Yard Location */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Anchor size={22} color="var(--primary-red)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {t('yokohamaYard')}
                </h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginBottom: '12px', lineHeight: 1.5 }}>
                {t('yokohamaAddress')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Clock size={16} color="var(--primary-red)" />
                <span>{t('hours')}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: FIREBASE INQUIRY & CONTACT FORM */}
          <div className="glass-panel" style={{ padding: '32px', borderColor: 'var(--border-orange)' }}>
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                Send Direct Inquiry
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
                {t('inquirySubtitle')}
              </p>
            </div>

            {isSuccess ? (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--orange-dim)',
                  color: 'var(--primary-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you for contacting Ash Garage Tokyo. Our export manager will review your request and reply to your email within 2 hours.
                </p>
                <button onClick={() => setIsSuccess(false)} className="btn-gradient" style={{ padding: '10px 24px' }}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
                
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
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
                      padding: '12px 14px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
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
                        padding: '12px 14px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
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
                        padding: '12px 14px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
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
                      padding: '12px 14px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
                    {t('commentsLabel')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the Japanese car model, year range, or CIF port shipping details you require..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient"
                  style={{ padding: '14px', justifyContent: 'center', fontSize: '0.95rem', marginTop: '8px' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending to Firebase Cloud...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
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
