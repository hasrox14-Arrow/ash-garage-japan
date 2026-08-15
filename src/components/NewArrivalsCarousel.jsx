import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VehicleCard } from './VehicleCard';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export const NewArrivalsCarousel = ({ vehicles, onViewDetails, onInquire }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter new arrivals or take top 8 vehicles
  const newArrivals = vehicles.filter(v => v.isNewArrival || v.isFeatured).slice(0, 8);

  // 2-Second Automatic Sliding Interval for both Desktop and Mobile
  useEffect(() => {
    if (newArrivals.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newArrivals.length);
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [newArrivals.length, isPaused]);

  if (newArrivals.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newArrivals.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === newArrivals.length - 1 ? 0 : prev + 1));
  };

  return (
    <section style={{
      padding: '36px 12px',
      background: 'linear-gradient(180deg, var(--bg-obsidian) 0%, rgba(255,87,34,0.04) 50%, var(--bg-obsidian) 100%)',
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
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-orange" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', padding: '3px 8px' }}>
                <Flame size={12} />
                NEW ARRIVALS — JAPAN EXPORT YARD
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: 800 }}>
                ● 3-Cars Mobile Auto-Slide
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.3rem, 3.5vw, 2.1rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '0.5px'
            }}>
              RECENTLY ADDED <span style={{ color: 'var(--primary-orange)' }}>JDM INVENTORY</span>
            </h2>
          </div>

          {/* Arrow Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handlePrev}
                className="btn-outline"
                style={{ padding: '6px', borderRadius: '50%', minHeight: '34px', width: '34px', justifyContent: 'center' }}
                title="Previous Car"
              >
                <ChevronLeft size={18} color="var(--primary-orange)" />
              </button>

              <button
                onClick={handleNext}
                className="btn-outline"
                style={{ padding: '6px', borderRadius: '50%', minHeight: '34px', width: '34px', justifyContent: 'center' }}
                title="Next Car"
              >
                <ChevronRight size={18} color="var(--primary-orange)" />
              </button>
            </div>
          </div>
        </div>

        {/* Seamless Track Slider (3 cards per row on both Desktop & Mobile) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ position: 'relative', overflow: 'hidden', borderRadius: '14px', width: '100%' }}
        >
          <div className="carousel-track-wrapper" style={{
            display: 'flex',
            gap: '8px',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            transform: `translateX(calc(-${currentIndex} * (var(--carousel-card-width) + 8px)))`
          }}>
            {newArrivals.map((vehicle, idx) => (
              <div 
                key={vehicle.id || idx}
                className="carousel-card-slide"
                style={{ flexShrink: 0 }}
              >
                <VehicleCard
                  vehicle={vehicle}
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
          gap: '8px',
          marginTop: '20px'
        }}>
          {newArrivals.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: currentIndex === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '8px',
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
