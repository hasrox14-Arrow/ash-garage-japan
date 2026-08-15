import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';
import { vehiclesData as initialVehicles } from '../data/vehicles';
import {
  saveVehicleToFirestore,
  deleteVehicleFromFirestore,
  subscribeToVehicles
} from '../firebase/config';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('JPY'); // Default currency set to JPY (¥)
  const [showLangModal, setShowLangModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Dynamic Inventory State (Listens to Firestore Real-Time Cloud Updates)
  const [vehicles, setVehicles] = useState(initialVehicles);

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

    // Subscribe to Real-Time Cloud Vehicle Updates from Firebase Firestore
    const unsubscribe = subscribeToVehicles((updatedList) => {
      console.log("Real-time vehicles sync received from Firestore:", updatedList.length, "cars");
      setVehicles(updatedList);
      localStorage.setItem('ash_garage_custom_vehicles', JSON.stringify(updatedList));
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Add or Edit Vehicle Handler (Writes to Cloud Firestore & Local State)
  const handleSaveVehicle = async (vehicleData) => {
    const docId = vehicleData.id || vehicleData.stockNo || `AG-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullVehicle = {
      ...vehicleData,
      id: docId,
      stockNo: vehicleData.stockNo || docId
    };

    const existingIndex = vehicles.findIndex(v => v.id === docId || v.stockNo === docId);
    let updated;
    if (existingIndex >= 0) {
      updated = [...vehicles];
      updated[existingIndex] = fullVehicle;
    } else {
      updated = [fullVehicle, ...vehicles];
    }
    setVehicles(updated);
    localStorage.setItem('ash_garage_custom_vehicles', JSON.stringify(updated));

    await saveVehicleToFirestore(fullVehicle);
  };

  // Delete Vehicle Handler (Deletes from Cloud Firestore & Local State)
  const handleDeleteVehicle = async (vehicleId) => {
    const updated = vehicles.filter(v => v.id !== vehicleId && v.stockNo !== vehicleId);
    setVehicles(updated);
    localStorage.setItem('ash_garage_custom_vehicles', JSON.stringify(updated));

    await deleteVehicleFromFirestore(vehicleId);
  };

  // Toggle Vehicle Status (Available / Reserved / Sold)
  const handleToggleStatus = async (vehicleId, newStatus) => {
    const target = vehicles.find(v => v.id === vehicleId || v.stockNo === vehicleId);
    if (target) {
      const updatedVehicle = { ...target, status: newStatus };
      await handleSaveVehicle(updatedVehicle);
    }
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
    setCurrency((prev) => (prev === 'JPY' ? 'USD' : 'JPY'));
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
