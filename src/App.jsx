import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageModal } from './components/LanguageModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleFilter } from './components/VehicleFilter';
import { VehicleGrid } from './components/VehicleGrid';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { ExportProcess } from './components/ExportProcess';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';

function MainApp() {
  const { vehicles, isAdminLoggedIn } = useLanguage();
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'inventory' | 'process' | 'admin'
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
      
      {/* Initial Language Popup Selection Modal */}
      <LanguageModal />

      {/* Admin Passcode Login Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={() => setActiveTab('admin')}
      />

      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAdminClick={() => setShowAdminLogin(true)}
      />

      {/* VIEW 1: ADMIN DASHBOARD (A to Z Control Panel) */}
      {activeTab === 'admin' && isAdminLoggedIn ? (
        <AdminDashboard onExitAdmin={() => setActiveTab('home')} />
      ) : (
        /* VIEW 2: PUBLIC BUYER PORTAL */
        <>
          {/* Hero Banner */}
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onBrowseClick={() => {
              const invSection = document.getElementById('inventory');
              if (invSection) invSection.scrollIntoView({ behavior: 'smooth' });
            }}
            onInquireClick={() => setInquiryVehicle(vehicles[0])}
          />

          {/* Main Inventory Section */}
          <main id="inventory" style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px', flex: 1, width: '100%' }}>
            
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

          {/* Export Process Guide */}
          <ExportProcess />
        </>
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
