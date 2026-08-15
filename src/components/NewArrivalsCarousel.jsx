import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VehicleCard } from './VehicleCard';
import { ChevronLeft, ChevronRight, Flame, Sparkles } from 'lucide-react';

export const NewArrivalsCarousel = ({ vehicles, onViewDetails, onInquire }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter new arrivals or take first 6 vehicles
  const newArrivals = vehicles.filter(v => v.isNewArrival || v.isFeatured).slice(0, 6);

  if (newArrivals.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newArrivals.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === newArrivals.length - 1 ? 0 : prev + 1));
  };

  return (
    <section style={{
      padding: '60px 20px',
      background: 'linear-gradient(180deg, var(--bg-obsidian) 0%, rgba(255,87,34,0.05) 50%, var(--bg-obsidian) 100%)',
      borderTop: '1px solid var(--border-dark)',
      borderBottom: '1px solid var(--border-dark)',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span className="badge-orange" style={{ marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={12} />
              NEW ARRIVALS — JAPAN EXPORT YARD
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '0.5px'
            }}>
              RECENTLY ADDED <span style={{ color: 'var(--primary-orange)' }}>JDM INVENTORY</span>
            </h2>
          </div>

          {/* Navigation Controls (Arrows + Dot Indicators) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Arrow Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePrev}
                className="btn-outline"
                style={{ padding: '8px', borderRadius: '50%', minHeight: '38px', width: '38px', justifyContent: 'center' }}
                title="Previous Car"
              >
                <ChevronLeft size={20} color="var(--primary-orange)" />
              </button>

              <button
                onClick={handleNext}
                className="btn-outline"
                style={{ padding: '8px', borderRadius: '50%', minHeight: '38px', width: '38px', justifyContent: 'center' }}
                title="Next Car"
              >
                <ChevronRight size={20} color="var(--primary-orange)" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Single-Row Viewport */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Display 3 vehicles at a time for desktop, 1 for mobile based on index */}
            {[
              newArrivals[currentIndex],
              newArrivals[(currentIndex + 1) % newArrivals.length],
              newArrivals[(currentIndex + 2) % newArrivals.length]
            ].map((v, idx) => (
              <div key={v.id + idx} style={{ transition: 'all 0.4s ease' }}>
                <VehicleCard
                  vehicle={v}
                  onViewDetails={onViewDetails}
                  onInquire={onInquire}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Panel Dots (● ○ ○ ○) */}
        <div style={{
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '32px'
        }}>
          {newArrivals.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: currentIndex === idx ? '28px' : '10px',
                height: '10px',
                borderRadius: '10px',
                background: currentIndex === idx ? 'var(--gradient-red-orange)' : 'var(--border-dark)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: currentIndex === idx ? '0 0 10px rgba(255, 87, 34, 0.5)' : 'none'
              }}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
