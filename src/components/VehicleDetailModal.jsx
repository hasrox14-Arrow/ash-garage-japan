import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Award, Ship, Calculator, CheckCircle2, Send, Calendar, Gauge, Shield, Cog, Fuel } from 'lucide-react';

export const VehicleDetailModal = ({ vehicle, onClose, onInquire }) => {
  const { currency, t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(vehicle ? vehicle.image : '');
  const [selectedCountry, setSelectedCountry] = useState('USA');

  if (!vehicle) return null;

  // Freight estimation logic based on destination country
  const freightRates = {
    USA: 2200,
    UK: 1950,
    Australia: 1750,
    Germany: 2100,
    UAE: 1800,
    Canada: 2400,
    Kenya: 2600,
    NewZealand: 1850
  };

  const currentFreightUsd = freightRates[selectedCountry] || 2000;
  const currentFreightJpy = currentFreightUsd * 155;

  const totalCifUsd = vehicle.priceUsd + currentFreightUsd;
  const totalCifJpy = vehicle.priceJpy + currentFreightJpy;

  const formattedFob = currency === 'USD' ? `$${vehicle.priceUsd.toLocaleString()} USD` : `¥${vehicle.priceJpy.toLocaleString()} JPY`;
  const formattedFreight = currency === 'USD' ? `$${currentFreightUsd.toLocaleString()} USD` : `¥${currentFreightJpy.toLocaleString()} JPY`;
  const formattedCif = currency === 'USD' ? `$${totalCifUsd.toLocaleString()} USD` : `¥${totalCifJpy.toLocaleString()} JPY`;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '900px', padding: 0 }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '20px 28px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-dark)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge-red">{vehicle.stockNo}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-red)', fontWeight: 800 }}>{vehicle.make}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginTop: '4px' }}>
              {vehicle.model}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }}>
          
          {/* Top Section: Gallery + Primary Price Card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Gallery Image */}
            <div>
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                height: '280px',
                marginBottom: '12px',
                border: '1px solid var(--border-dark)'
              }}>
                <img
                  src={selectedImg || vehicle.image}
                  alt={vehicle.model}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Thumbnails */}
              {vehicle.gallery && vehicle.gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  {vehicle.gallery.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Thumb ${idx}`}
                      onClick={() => setSelectedImg(imgUrl)}
                      style={{
                        width: '70px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: selectedImg === imgUrl ? '2px solid var(--primary-red)' : '1px solid var(--border-dark)'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price & Inspection Grade Panel */}
            <div className="glass-panel-red" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('fobPrice')}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
                  {formattedFob}
                </span>
              </div>

              {/* Auction Grade Rating */}
              <div style={{
                padding: '14px',
                background: 'var(--bg-surface)',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid var(--border-dark)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Award size={18} color="#10B981" />
                  <span style={{ fontWeight: 800, color: '#10B981', fontSize: '0.9rem' }}>{t('auctionDetails')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                  <span>{t('grade')}: <strong>{vehicle.auctionGrade}</strong></span>
                  <span>{t('exteriorGrade')}: <strong>{vehicle.exteriorGrade}</strong></span>
                  <span>{t('interiorGrade')}: <strong>{vehicle.interiorGrade}</strong></span>
                </div>
              </div>

              {/* Verified Inspection Points */}
              <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} color="var(--primary-red)" />
                  <span>150-Point Certified Mechanic Inspection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} color="var(--primary-red)" />
                  <span>Japan Odometer Real Mileage Document</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--primary-red)" />
                  <span>Export Cancellation Certificate Ready</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onInquire(vehicle);
                }}
                className="btn-red"
                style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', padding: '14px' }}
              >
                <Send size={18} />
                <span>{t('sendQuote')}</span>
              </button>

            </div>

          </div>

          {/* Specifications Grid Matrix */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', color: '#FFF' }}>
              {t('specsOverview')}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              
              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('year')}</span>
                <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{vehicle.year}</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('mileage')}</span>
                <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{vehicle.mileage}</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('engine')}</span>
                <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{vehicle.engine}</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('transmission')}</span>
                <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{vehicle.transmission}</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('drive')}</span>
                <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{vehicle.drive}</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('steering')}</span>
                <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{vehicle.steering}</div>
              </div>

            </div>
          </div>

          {/* Interactive Sea Freight Shipping Calculator */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Ship size={22} color="var(--primary-red)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                {t('shippingCalculator')}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {t('destinationCountry')}
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-red)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="USA">United States (Long Beach / Tacoma)</option>
                  <option value="UK">United Kingdom (Southampton / Felixstowe)</option>
                  <option value="Australia">Australia (Sydney / Melbourne)</option>
                  <option value="Germany">Germany (Bremerhaven)</option>
                  <option value="UAE">United Arab Emirates (Jebel Ali, Dubai)</option>
                  <option value="Canada">Canada (Vancouver)</option>
                  <option value="Kenya">Kenya (Mombasa)</option>
                  <option value="NewZealand">New Zealand (Auckland)</option>
                </select>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('estFreight')}</span>
                <div style={{ fontWeight: 800, color: 'var(--primary-red)', fontSize: '1.1rem' }}>{formattedFreight}</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-red)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('totalCif')}</span>
                <div style={{ fontWeight: 900, color: '#FFF', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{formattedCif}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
