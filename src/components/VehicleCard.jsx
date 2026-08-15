import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Gauge, Cog, Shield, ArrowUpRight, Award } from 'lucide-react';

export const VehicleCard = ({ vehicle, onViewDetails, onInquire }) => {
  const { currency, t } = useLanguage();

  const formattedPrice = currency === 'USD'
    ? `$${vehicle.priceUsd.toLocaleString()} USD`
    : `¥${vehicle.priceJpy.toLocaleString()} JPY`;

  const handleCardClick = (e) => {
    // If click target is inside or is the inquire button, don't trigger view details
    if (e.target.closest('.btn-gradient-inquire')) {
      return;
    }
    onViewDetails(vehicle);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-panel" 
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition-smooth)',
        position: 'relative',
        background: 'var(--bg-card)',
        borderRadius: '14px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-dark)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
        e.currentTarget.style.borderColor = 'var(--border-orange)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--border-dark)';
      }}
    >
      {/* Top Image Container */}
      <div style={{ position: 'relative', height: '175px', overflow: 'hidden' }}>
        <img
          src={vehicle.image}
          alt={vehicle.model}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Top Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          gap: '6px'
        }}>
          <span className="badge-orange" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>{vehicle.stockNo}</span>
          {vehicle.isFeatured && (
            <span className="badge-red" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>FEATURED</span>
          )}
        </div>

        {/* Auction Grade Rating */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(10,10,12,0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #10B981',
          borderRadius: '6px',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.72rem',
          fontWeight: 800,
          color: '#10B981',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          <Award size={13} />
          <span>GRADE {vehicle.auctionGrade}</span>
        </div>

        {/* FOB Price Tag Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(0deg, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0) 100%)',
          padding: '20px 12px 8px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end'
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px' }}>
            {t('fobPrice')}
          </span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 900,
            color: '#FFFFFF'
          }}>
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Make & Model Title */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            {vehicle.make}
          </div>
          <h3 style={{
            fontSize: '1.02rem',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginTop: '2px',
            fontFamily: 'var(--font-heading)'
          }}>
            {vehicle.model}
          </h3>
        </div>

        {/* Spec Chips Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '14px',
          padding: '10px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-dark)',
          borderRadius: '8px',
          fontSize: '0.78rem',
          color: 'var(--text-sub)',
          fontWeight: 700
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} color="var(--primary-orange)" />
            <span>{vehicle.year}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Gauge size={13} color="var(--primary-orange)" />
            <span>{vehicle.mileage}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Cog size={13} color="var(--primary-orange)" />
            <span>{vehicle.transmission}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Shield size={13} color="var(--primary-orange)" />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vehicle.drive}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(vehicle);
            }}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.8rem', minHeight: '36px' }}
          >
            {t('viewDetails')}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onInquire(vehicle);
            }}
            className="btn-gradient btn-gradient-inquire"
            style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.8rem', minHeight: '36px' }}
          >
            <span>{t('quickInquire')}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
