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
      position: 'relative'
    }}>
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
          <span className="badge-red">{vehicle.stockNo}</span>
          {vehicle.isFeatured && (
            <span className="badge-dark" style={{ borderColor: 'var(--primary-red)', color: 'var(--primary-red)' }}>FEATURED</span>
          )}
        </div>

        {/* Auction Grade Rating */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(10,10,12,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #10B981',
          borderRadius: '6px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#10B981'
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
          background: 'linear-gradient(0deg, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0) 100%)',
          padding: '16px 16px 8px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {t('fobPrice')}
          </span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#FFF'
          }}>
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Make & Model Title */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary-red)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {vehicle.make}
          </div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#FFF',
            lineHeight: 1.3,
            marginTop: '2px'
          }}>
            {vehicle.model}
          </h3>
        </div>

        {/* Spec Chips Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '20px',
          padding: '12px',
          background: 'var(--bg-surface)',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: 'var(--text-sub)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="var(--primary-red)" />
            <span>{vehicle.year}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Gauge size={14} color="var(--primary-red)" />
            <span>{vehicle.mileage}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cog size={14} color="var(--primary-red)" />
            <span>{vehicle.transmission}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={14} color="var(--primary-red)" />
            <span>{vehicle.drive}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            onClick={() => onViewDetails(vehicle)}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
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
