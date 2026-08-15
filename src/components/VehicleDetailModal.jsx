import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Award, Ship, CheckCircle2, Send } from 'lucide-react';

export const VehicleDetailModal = ({ vehicle, onClose, onInquire }) => {
  const { currency, t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(vehicle ? vehicle.image : '');
  const [selectedCountry, setSelectedCountry] = useState('USA');

  if (!vehicle) return null;

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
      <div className="modal-content glass-panel" style={{ maxWidth: '900px', padding: 0, borderColor: 'var(--border-orange)' }}>
        
        {/* Sticky Modal Header Bar - Always Pinned to Top */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '14px 18px',
          background: 'rgba(27, 27, 36, 0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-dark)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span className="badge-orange">{vehicle.stockNo}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--primary-orange)', fontWeight: 800 }}>{vehicle.make}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>
              {vehicle.model}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 87, 34, 0.15)',
              border: '1px solid var(--border-orange)',
              borderRadius: '50%',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              width: '36px',
              height: '36px',
              flexShrink: 0
            }}
            title="Close Specs Modal"
          >
            <X size={20} color="var(--primary-orange)" />
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div style={{ padding: '16px 20px 24px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* Top Section: Gallery + Primary Price Card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            
            {/* Gallery Image */}
            <div>
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                height: '220px',
                marginBottom: '10px',
                border: '1px solid var(--border-dark)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img
                  src={selectedImg || vehicle.image}
                  alt={vehicle.model}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Thumbnails */}
              {vehicle.gallery && vehicle.gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {vehicle.gallery.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Thumb ${idx}`}
                      onClick={() => setSelectedImg(imgUrl)}
                      style={{
                        width: '60px',
                        height: '44px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        flexShrink: 0,
                        border: selectedImg === imgUrl ? '2px solid var(--primary-orange)' : '1px solid var(--border-dark)'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price & Inspection Grade Panel */}
            <div className="glass-panel-orange" style={{ padding: '18px', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 800 }}>{t('fobPrice')}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF' }}>
                  {formattedFob}
                </span>
              </div>

              {/* Auction Grade Rating */}
              <div style={{
                padding: '10px 12px',
                background: 'var(--bg-surface)',
                borderRadius: '8px',
                marginBottom: '14px',
                border: '1px solid var(--border-dark)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Award size={16} color="#10B981" />
                  <span style={{ fontWeight: 800, color: '#10B981', fontSize: '0.82rem' }}>{t('auctionDetails')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                  <span>{t('grade')}: <strong>{vehicle.auctionGrade}</strong></span>
                  <span>Ext: <strong>{vehicle.exteriorGrade}</strong></span>
                  <span>Int: <strong>{vehicle.interiorGrade}</strong></span>
                </div>
              </div>

              {/* Verified Inspection Points */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '16px', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle2 size={14} color="var(--primary-orange)" />
                  <span>150-Point Certified Inspection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle2 size={14} color="var(--primary-orange)" />
                  <span>Japan Odometer Real Mileage Cert</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--primary-orange)" />
                  <span>Export Cancellation Certificate</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onInquire(vehicle);
                }}
                className="btn-gradient"
                style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', padding: '12px' }}
              >
                <Send size={16} />
                <span>{t('sendQuote')}</span>
              </button>

            </div>

          </div>

          {/* Specifications Grid Matrix */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, marginBottom: '12px', color: '#FFFFFF' }}>
              {t('specsOverview')}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '10px'
            }}>
              
              <div style={{ padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('year')}</span>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>{vehicle.year}</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('mileage')}</span>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>{vehicle.mileage}</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('engine')}</span>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>{vehicle.engine}</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('transmission')}</span>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>{vehicle.transmission}</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('drive')}</span>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>{vehicle.drive}</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('steering')}</span>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>{vehicle.steering}</div>
              </div>

            </div>
          </div>

          {/* Interactive Sea Freight Shipping Calculator */}
          <div className="glass-panel" style={{ padding: '18px', background: 'var(--bg-surface)', borderColor: 'var(--border-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Ship size={20} color="var(--primary-orange)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                {t('shippingCalculator')}
              </h3>
            </div>

            <div className="mobile-stack-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-sub)', marginBottom: '4px', fontWeight: 700 }}>
                  {t('destinationCountry')}
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-orange)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    fontWeight: 600
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

              <div style={{ padding: '10px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 700 }}>{t('estFreight')}</span>
                <div style={{ fontWeight: 800, color: 'var(--primary-orange)', fontSize: '1rem' }}>{formattedFreight}</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-red)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-red)', fontWeight: 700 }}>{t('totalCif')}</span>
                <div style={{ fontWeight: 900, color: '#FFFFFF', fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>{formattedCif}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
