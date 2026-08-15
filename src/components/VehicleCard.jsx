import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Gauge, Cog, Shield, ArrowUpRight, Award } from 'lucide-react';

export const VehicleCard = ({ vehicle, onViewDetails, onInquire }) => {
  const { currency, t } = useLanguage();

  const formattedPrice = currency === 'USD'
    ? `$${vehicle.priceUsd.toLocaleString()} USD`
    : `¥${vehicle.priceJpy.toLocaleString()} JPY`;

  return (
    <div className="glass-panel" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'var(--transition-smooth)',
      position: 'relative',
      background: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--border-light)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      e.currentTarget.style.borderColor = 'var(--border-teal)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.borderColor = 'var(--border-light)';
    }}
    >
      {/* Top Image Container */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={vehicle.image}
          alt={vehicle.model}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Top Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          <span className="badge-teal">{vehicle.stockNo}</span>
          {vehicle.isFeatured && (
            <span className="badge-red">FEATURED</span>
          )}
        </div>

        {/* Auction Grade Rating */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #059669',
          borderRadius: '8px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#059669',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <Award size={14} />
          <span>GRADE {vehicle.auctionGrade}</span>
        </div>

        {/* FOB Price Tag Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(0deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0) 100%)',
          padding: '24px 16px 10px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#06B6D4', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px' }}>
            {t('fobPrice')}
          </span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            fontWeight: 900,
            color: '#FFFFFF'
          }}>
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Make & Model Title */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary-teal)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            {vehicle.make}
          </div>
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: 'var(--text-dark)',
            lineHeight: 1.3,
            marginTop: '2px',
            fontFamily: 'var(--font-heading)'
          }}>
            {vehicle.model}
          </h3>
        </div>

        {/* Spec Chips Matrix with Soft Mint Background */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '20px',
          padding: '12px',
          background: '#F0FDFA',
          border: '1px solid var(--border-teal)',
          borderRadius: '10px',
          fontSize: '0.82rem',
          color: 'var(--text-sub)',
          fontWeight: 700
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="var(--primary-teal)" />
            <span>{vehicle.year}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Gauge size={14} color="var(--primary-teal)" />
            <span>{vehicle.mileage}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cog size={14} color="var(--primary-teal)" />
            <span>{vehicle.transmission}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={14} color="var(--primary-teal)" />
            <span>{vehicle.drive}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            onClick={() => onViewDetails(vehicle)}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem', borderColor: 'var(--border-teal)', color: 'var(--primary-teal)' }}
          >
            {t('viewDetails')}
          </button>

          <button
            onClick={() => onInquire(vehicle)}
            className="btn-red"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
          >
            <span>{t('quickInquire')}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
