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
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      
      {/* Title Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        marginBottom: '16px',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--border-dark)',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--primary-red)" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>
            {t('filterTitle')}
          </h3>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {t('showingResults', { count: totalResults })}
          </span>
          <button
            onClick={resetFilters}
            className="btn-outline"
            style={{ padding: '4px 10px', fontSize: '0.72rem', gap: '4px', minHeight: '34px' }}
          >
            <RotateCcw size={11} />
            {t('resetFilters')}
          </button>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="filter-controls-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px'
      }}>
        
        {/* Make Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
            {t('makeLabel')}
          </label>
          <select
            value={filters.make}
            onChange={(e) => handleFilterChange('make', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '6px',
              color: '#FFF',
              fontSize: '0.85rem',
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
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
            {t('bodyLabel')}
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => handleFilterChange('bodyType', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '6px',
              color: '#FFF',
              fontSize: '0.85rem',
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
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
            {t('transLabel')}
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => handleFilterChange('transmission', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '6px',
              color: '#FFF',
              fontSize: '0.85rem',
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
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
            {t('priceLabel')}
          </label>
          <select
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-dark)',
              borderRadius: '6px',
              color: '#FFF',
              fontSize: '0.85rem',
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
