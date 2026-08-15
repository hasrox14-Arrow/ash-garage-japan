import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleFilter } from './components/VehicleFilter';
import { VehicleGrid } from './components/VehicleGrid';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { ExportProcess } from './components/ExportProcess';
import { Footer } from './components/Footer';
import { ContactPage } from './components/ContactPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';

function MainApp() {
  const { vehicles, isAdminLoggedIn, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'inventory' | 'contact' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    bodyType: '',
    transmission: '',
    maxPrice: ''
  });

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [inquiryVehicle, setInquiryVehicle] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      make: '',
      bodyType: '',
      transmission: '',
      maxPrice: ''
    });
  };

  // Dynamic search & multi-parameter filter logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (v.model || '').toLowerCase().includes(q);
        const matchMake = (v.make || '').toLowerCase().includes(q);
        const matchStock = (v.stockNo || '').toLowerCase().includes(q);
        if (!matchTitle && !matchMake && !matchStock) return false;
      }

      if (filters.make && v.make !== filters.make) return false;
      if (filters.bodyType && v.bodyType !== filters.bodyType) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      if (filters.maxPrice && v.priceUsd > parseInt(filters.maxPrice, 10)) return false;

      return true;
    });
  }, [vehicles, searchQuery, filters]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Admin Passcode Login Modal */}
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onLoginSuccess={() => setActiveTab('admin')}
        />
      )}

      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAdminClick={() => setShowAdminLogin(true)}
      />

      {/* PAGE 1: HOMEPAGE */}
      {activeTab === 'home' && (
        <>
          {/* Hero Banner featuring Logo Emblem */}
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onBrowseClick={() => {
              setActiveTab('inventory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onInquireClick={() => setInquiryVehicle(vehicles[0])}
          />

          {/* Featured Preview Inventory Section */}
          <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 20px', flex: 1, width: '100%' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="badge-orange" style={{ marginBottom: '8px', display: 'inline-block' }}>
                FEATURED STOCK
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#FFFFFF' }}>
                PREMIUM JAPANESE INVENTORY
              </h2>
            </div>

            <VehicleGrid
              vehicles={vehicles.slice(0, 6)}
              onViewDetails={(vehicle) => setSelectedVehicle(vehicle)}
              onInquire={(vehicle) => setInquiryVehicle(vehicle)}
            />

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                onClick={() => {
                  setActiveTab('inventory');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-gradient"
                style={{ padding: '12px 32px', fontSize: '0.95rem' }}
              >
                Browse Full Vehicle Inventory ({vehicles.length} Cars)
              </button>
            </div>

          </main>

          {/* Export Process Workflow Guide */}
          <ExportProcess />
        </>
      )}

      {/* PAGE 2: INVENTORY PAGE */}
      {activeTab === 'inventory' && (
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '50px 20px 80px', flex: 1, width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge-orange" style={{ marginBottom: '8px', display: 'inline-block' }}>
              JAPAN EXPORT INVENTORY
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#FFFFFF' }}>
              ALL AVAILABLE VEHICLES
            </h1>
          </div>

          {/* Filter Controls */}
          <VehicleFilter
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            totalResults={filteredVehicles.length}
          />

          {/* Inventory Cards Grid */}
          <VehicleGrid
            vehicles={filteredVehicles}
            onViewDetails={(vehicle) => setSelectedVehicle(vehicle)}
            onInquire={(vehicle) => setInquiryVehicle(vehicle)}
          />

        </main>
      )}

      {/* PAGE 3: CONTACT US PAGE */}
      {activeTab === 'contact' && (
        <ContactPage />
      )}

      {/* ADMIN DASHBOARD WORKSPACE */}
      {activeTab === 'admin' && isAdminLoggedIn && (
        <AdminDashboard onLogout={() => setActiveTab('home')} />
      )}

      {/* Footer */}
      <Footer />

      {/* Specs Detail Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onInquire={(vehicle) => {
            setSelectedVehicle(null);
            setInquiryVehicle(vehicle);
          }}
        />
      )}

      {/* Quote Inquiry Modal */}
      {inquiryVehicle && (
        <InquiryModal
          vehicle={inquiryVehicle}
          onClose={() => setInquiryVehicle(null)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
