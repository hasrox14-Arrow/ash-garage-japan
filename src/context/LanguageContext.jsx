import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';
import { vehiclesData as initialVehicles } from '../data/vehicles';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [showLangModal, setShowLangModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Dynamic Inventory State (Initial mock merged with localStorage)
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('ash_garage_custom_vehicles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialVehicles;
      }
    }
    return initialVehicles;
  });

  // Dynamic Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('ash_garage_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('ash_garage_lang');
    const modalDismissed = localStorage.getItem('ash_garage_lang_modal_dismissed');

    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }

    if (!modalDismissed) {
      setShowLangModal(true);
    }
  }, []);

  // Save vehicles to local storage on update
  const saveVehiclesToStore = (updatedVehicles) => {
    setVehicles(updatedVehicles);
    localStorage.setItem('ash_garage_custom_vehicles', JSON.stringify(updatedVehicles));
  };

  // Add or Edit Vehicle Handler
  const handleSaveVehicle = (vehicleData) => {
    const existingIndex = vehicles.findIndex(v => v.id === vehicleData.id || v.stockNo === vehicleData.stockNo);
    let updated;
    if (existingIndex >= 0) {
      updated = [...vehicles];
      updated[existingIndex] = { ...updated[existingIndex], ...vehicleData };
    } else {
      const newVehicle = {
        ...vehicleData,
        id: vehicleData.id || `AG-${Math.floor(1000 + Math.random() * 9000)}`,
        stockNo: vehicleData.stockNo || `AG-${Math.floor(1000 + Math.random() * 9000)}`
      };
      updated = [newVehicle, ...vehicles];
    }
    saveVehiclesToStore(updated);
  };

  // Delete Vehicle Handler
  const handleDeleteVehicle = (vehicleId) => {
    const updated = vehicles.filter(v => v.id !== vehicleId && v.stockNo !== vehicleId);
    saveVehiclesToStore(updated);
  };

  // Toggle Vehicle Status (Available / Reserved / Sold)
  const handleToggleStatus = (vehicleId, newStatus) => {
    const updated = vehicles.map(v => {
      if (v.id === vehicleId || v.stockNo === vehicleId) {
        return { ...v, status: newStatus };
      }
      return v;
    });
    saveVehiclesToStore(updated);
  };

  // Record new inquiry lead
  const addInquiryLead = (newInquiry) => {
    const updatedInquiries = [newInquiry, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem('ash_garage_inquiries', JSON.stringify(updatedInquiries));
  };

  const selectLanguage = (selectedLang) => {
    if (translations[selectedLang]) {
      setLang(selectedLang);
      localStorage.setItem('ash_garage_lang', selectedLang);
      localStorage.setItem('ash_garage_lang_modal_dismissed', 'true');
      setShowLangModal(false);
    }
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'JPY' : 'USD'));
  };

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations['en']?.[key] || key;
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(`{${paramKey}}`, params[paramKey]);
    });
    return text;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: selectLanguage,
        currency,
        setCurrency,
        toggleCurrency,
        showLangModal,
        setShowLangModal,
        t,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        vehicles,
        handleSaveVehicle,
        handleDeleteVehicle,
        handleToggleStatus,
        inquiries,
        addInquiryLead
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
