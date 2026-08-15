import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, FileCheck, Anchor, ShieldCheck } from 'lucide-react';

export const ExportProcess = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: <Search size={26} color="var(--primary-teal)" />,
      title: t('step1Title'),
      desc: t('step1Desc')
    },
    {
      num: '02',
      icon: <FileCheck size={26} color="var(--primary-teal)" />,
      title: t('step2Title'),
      desc: t('step2Desc')
    },
    {
      num: '03',
      icon: <ShieldCheck size={26} color="var(--primary-teal)" />,
      title: t('step3Title'),
      desc: t('step3Desc')
    },
    {
      num: '04',
      icon: <Anchor size={26} color="var(--primary-teal)" />,
      title: t('step4Title'),
      desc: t('step4Desc')
    }
  ];

  return (
    <section id="process" style={{
      padding: '80px 20px',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #F0FDFA 50%, #FFFFFF 100%)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge-teal" style={{ marginBottom: '8px', display: 'inline-block' }}>
            {t('processBadge')}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 900,
            color: 'var(--text-dark)',
            letterSpacing: '-0.5px'
          }}>
            {t('processHeading')}
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-sub)', maxWidth: '640px', margin: '12px auto 0', fontWeight: 500 }}>
            Direct export from Tokyo HQ & Yokohama Port Yard straight to your destination port.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {steps.map((step, idx) => (
            <div key={idx} className="glass-panel" style={{
              padding: '28px',
              position: 'relative',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-md)',
              borderRadius: '16px',
              borderColor: 'var(--border-teal)'
            }}>
              {/* Step Number Tag */}
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'rgba(13, 148, 136, 0.15)',
                position: 'absolute',
                top: '16px',
                right: '20px'
              }}>
                {step.num}
              </div>

              {/* Icon Container */}
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: 'var(--teal-dim)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                marginBottom: '20px'
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-dark)',
                marginBottom: '10px'
              }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: 1.6, fontWeight: 500 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
