import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VehicleCard } from './VehicleCard';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export const NewArrivalsCarousel = ({ vehicles, onViewDetails, onInquire }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter new arrivals or take first 6 vehicles
  const newArrivals = vehicles.filter(v => v.isNewArrival || v.isFeatured).slice(0, 6);

  // 2-Second Automatic Sliding Interval with Hover Pause
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
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        padding: '36px 16px',
        background: 'linear-gradient(180deg, var(--bg-obsidian) 0%, rgba(255,87,34,0.04) 50%, var(--bg-obsidian) 100%)',
        borderTop: '1px solid var(--border-dark)',
        borderBottom: '1px solid var(--border-dark)',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
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
                ● Auto-Sliding (2s)
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

          {/* Navigation Controls (Arrows) */}
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

        {/* Carousel Viewport: 1 Car on Mobile, 3 Cars on Desktop */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
          <div className="carousel-responsive-grid">
            
            {/* Card 1: Always Visible */}
            <div style={{ transition: 'all 0.4s ease' }}>
              <VehicleCard
                vehicle={newArrivals[currentIndex]}
                onViewDetails={onViewDetails}
                onInquire={onInquire}
              />
            </div>

            {/* Card 2: Visible on Desktop, Hidden on Mobile */}
            <div className="desktop-carousel-card" style={{ transition: 'all 0.4s ease' }}>
              <VehicleCard
                vehicle={newArrivals[(currentIndex + 1) % newArrivals.length]}
                onViewDetails={onViewDetails}
                onInquire={onInquire}
              />
            </div>

            {/* Card 3: Visible on Desktop, Hidden on Mobile */}
            <div className="desktop-carousel-card" style={{ transition: 'all 0.4s ease' }}>
              <VehicleCard
                vehicle={newArrivals[(currentIndex + 2) % newArrivals.length]}
                onViewDetails={onViewDetails}
                onInquire={onInquire}
              />
            </div>

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
