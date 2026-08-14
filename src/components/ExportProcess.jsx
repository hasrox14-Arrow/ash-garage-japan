import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, FileCheck, Ship, Anchor } from 'lucide-react';

export const ExportProcess = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Search size={28} color="var(--primary-red)" />,
      title: t('step1Title'),
      desc: t('step1Desc')
    },
    {
      icon: <FileCheck size={28} color="var(--primary-red)" />,
      title: t('step2Title'),
      desc: t('step2Desc')
    },
    {
      icon: <Ship size={28} color="var(--primary-red)" />,
      title: t('step3Title'),
      desc: t('step3Desc')
    },
    {
      icon: <Anchor size={28} color="var(--primary-red)" />,
      title: t('step4Title'),
      desc: t('step4Desc')
    }
  ];

  return (
    <section id="process" style={{ padding: '80px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge-red" style={{ marginBottom: '12px', display: 'inline-block' }}>JAPAN EXPORT WORKFLOW</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFF' }}>
            {t('processTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px' }}>
            {t('processSubtitle')}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {steps.map((step, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '28px', position: 'relative' }}>
              <div style={{
                display: 'inline-flex',
                padding: '14px',
                borderRadius: '12px',
                background: 'var(--red-dim)',
                marginBottom: '20px'
              }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginBottom: '10px' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
