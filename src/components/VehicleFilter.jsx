import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Filter, RotateCcw } from 'lucide-react';

export const VehicleFilter = ({
  filters,
  setFilters,
  resetFilters,
  totalResults
}) => {
  const { t } = useLanguage();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', borderColor: 'var(--border-orange)' }}>
      
      {/* Title Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        marginBottom: '18px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border-dark)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={20} color="var(--primary-orange)" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
            {t('filterTitle')}
          </h3>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-orange)', fontWeight: 700, background: 'var(--orange-dim)', padding: '4px 10px', borderRadius: '6px' }}>
            {t('showingResults', { count: totalResults })}
          </span>
          <button
            onClick={resetFilters}
            className="btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '4px', minHeight: '36px', borderColor: 'var(--primary-orange)', color: 'var(--primary-orange)' }}
          >
            <RotateCcw size={13} />
            {t('resetFilters')}
          </button>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="filter-controls-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '14px'
      }}>
        
        {/* Make Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
            {t('makeLabel')}
          </label>
          <select
            value={filters.make}
            onChange={(e) => handleFilterChange('make', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="">{t('allMakes')}</option>
            <option value="Toyota">Toyota</option>
            <option value="Nissan">Nissan</option>
            <option value="Honda">Honda</option>
            <option value="Mazda">Mazda</option>
            <option value="Subaru">Subaru</option>
          </select>
        </div>

        {/* Body Type Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
            {t('bodyLabel')}
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => handleFilterChange('bodyType', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="">{t('allBodies')}</option>
            <option value="Sports">Sports / JDM</option>
            <option value="SUV">SUV / 4WD</option>
            <option value="Sedan">Sedan / Luxury</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        {/* Transmission Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
            {t('transLabel')}
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => handleFilterChange('transmission', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="">{t('allTrans')}</option>
            <option value="Manual">{t('manual')}</option>
            <option value="Automatic">{t('automatic')}</option>
          </select>
        </div>

        {/* Max Price Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '6px', fontWeight: 700 }}>
            {t('priceLabel')}
          </label>
          <select
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="">{t('allPrices')}</option>
            <option value="35000">Under $35,000 USD</option>
            <option value="50000">Under $50,000 USD</option>
            <option value="75000">Under $75,000 USD</option>
            <option value="100000">Under $100,000 USD</option>
          </select>
        </div>

      </div>
    </div>
  );
};
