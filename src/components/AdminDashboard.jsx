import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VehicleFormModal } from './VehicleFormModal';
import {
  Car,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  ShieldCheck,
  LogOut,
  Sliders,
  Mail,
  Phone,
  Building,
  Save
} from 'lucide-react';

export const AdminDashboard = ({ onExitAdmin }) => {
  const {
    t,
    currency,
    vehicles,
    handleSaveVehicle,
    handleDeleteVehicle,
    handleToggleStatus,
    inquiries,
    setIsAdminLoggedIn
  } = useLanguage();

  const [activeTab, setActiveTab] = useState('inventory'); // 'overview' | 'inventory' | 'inquiries' | 'settings'
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [inquirySearch, setInquirySearch] = useState('');

  // Settings local state
  const [garageSettings, setGarageSettings] = useState({
    dealerLicense: 'Japan Authorized Dealer #45192008122',
    phone: '+81 (0)3 5482 9901',
    email: 'export@ashgarage-jp.com',
    announcement: 'DIRECT SHIPMENTS FROM TOKYO & YOKOHAMA PORTS WORLDWIDE'
  });

  const [settingsSaved, setSettingsSaved] = useState(false);

  // Metrics Calculations
  const totalFobUsd = vehicles.reduce((sum, v) => sum + (v.priceUsd || 0), 0);
  const totalFobJpy = vehicles.reduce((sum, v) => sum + (v.priceJpy || 0), 0);
  const reservedCount = vehicles.filter(v => v.status === 'Reserved' || v.status === 'Sold').length;

  const formattedTotalFob = currency === 'USD'
    ? `$${totalFobUsd.toLocaleString()} USD`
    : `¥${totalFobJpy.toLocaleString()} JPY`;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Top Admin Header */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-dark)'
      }}>
        <div>
          <div className="badge-red" style={{ marginBottom: '6px', display: 'inline-block' }}>ADMIN CONTROL PANEL</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
            {t('adminTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
            {t('adminSubtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              setVehicleToEdit(null);
              setShowFormModal(true);
            }}
            className="btn-red"
          >
            <Plus size={18} />
            <span>{t('addVehicleBtn')}</span>
          </button>

          <button
            onClick={() => {
              setIsAdminLoggedIn(false);
              onExitAdmin();
            }}
            className="btn-outline"
          >
            <LogOut size={16} />
            <span>{t('logoutBtn')}</span>
          </button>
        </div>
      </div>

      {/* Executive Overview Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <Car size={24} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('totalStockCount')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
            {vehicles.length} Units
          </div>
        </div>

        <div className="glass-panel-red" style={{ padding: '20px' }}>
          <DollarSign size={24} color="var(--primary-red)" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('totalFobValue')}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
            {formattedTotalFob}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <Users size={24} color="#10B981" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('pendingLeads')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-heading)' }}>
            {inquiries.length} Quotes
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <Clock size={24} color="#F59E0B" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('reservedCount')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
            {reservedCount} Cars
          </div>
        </div>

      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--border-dark)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            background: activeTab === 'inventory' ? 'var(--primary-red)' : 'transparent',
            border: 'none',
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {t('tabInventory')} ({vehicles.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          style={{
            background: activeTab === 'inquiries' ? 'var(--primary-red)' : 'transparent',
            border: 'none',
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {t('tabInquiries')} ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          style={{
            background: activeTab === 'settings' ? 'var(--primary-red)' : 'transparent',
            border: 'none',
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {t('tabSettings')}
        </button>
      </div>

      {/* TAB 1: INVENTORY CONTROL TABLE (CRUD) */}
      {activeTab === 'inventory' && (
        <div className="glass-panel" style={{ overflowX: 'auto', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-dark)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Photo</th>
                <th style={{ padding: '12px' }}>Stock #</th>
                <th style={{ padding: '12px' }}>Make & Model</th>
                <th style={{ padding: '12px' }}>Year</th>
                <th style={{ padding: '12px' }}>FOB Price</th>
                <th style={{ padding: '12px' }}>Grade</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => {
                const price = currency === 'USD' ? `$${v.priceUsd.toLocaleString()}` : `¥${v.priceJpy.toLocaleString()}`;
                return (
                  <tr key={v.id} style={{ borderBottom: '1px solid #1A1A22' }}>
                    <td style={{ padding: '12px' }}>
                      <img src={v.image} alt={v.model} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>

                    <td style={{ padding: '12px', fontWeight: 800, color: 'var(--primary-red)' }}>{v.stockNo}</td>

                    <td style={{ padding: '12px', fontWeight: 700, color: '#FFF' }}>
                      {v.make} {v.model}
                    </td>

                    <td style={{ padding: '12px', color: 'var(--text-sub)' }}>{v.year}</td>

                    <td style={{ padding: '12px', fontWeight: 800, color: '#FFF' }}>{price}</td>

                    <td style={{ padding: '12px' }}>
                      <span className="badge-grade">{v.auctionGrade}</span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <select
                        value={v.status}
                        onChange={(e) => handleToggleStatus(v.id, e.target.value)}
                        style={{
                          background: v.status === 'Available' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                          color: v.status === 'Available' ? '#10B981' : '#EF4444',
                          border: '1px solid var(--border-dark)',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => {
                            setVehicleToEdit(v);
                            setShowFormModal(true);
                          }}
                          className="btn-outline"
                          style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(t('confirmDelete', { stock: v.stockNo }))) {
                              handleDeleteVehicle(v.id);
                            }
                          }}
                          style={{
                            background: 'rgba(239,68,68,0.15)',
                            color: '#EF4444',
                            border: '1px solid rgba(239,68,68,0.3)',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: CUSTOMER INQUIRIES LEADS TABLE */}
      {activeTab === 'inquiries' && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          {inquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <Mail size={40} color="var(--primary-red)" style={{ marginBottom: '12px' }} />
              <p>No customer quote inquiries submitted yet.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-dark)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px' }}>{t('buyerName')}</th>
                    <th style={{ padding: '12px' }}>{t('requestedStock')}</th>
                    <th style={{ padding: '12px' }}>Email & Phone</th>
                    <th style={{ padding: '12px' }}>{t('countryLabel')}</th>
                    <th style={{ padding: '12px' }}>{t('dateSubmitted')}</th>
                    <th style={{ padding: '12px' }}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #1A1A22' }}>
                      <td style={{ padding: '12px', fontWeight: 800, color: '#FFF' }}>{inq.customerName}</td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge-red">{inq.stockNo}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{inq.model}</div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-sub)' }}>
                        <div>{inq.email}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inq.phone}</div>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary-red)' }}>{inq.country}</td>
                      <td style={{ padding: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(inq.submittedAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-sub)', maxWidth: '240px' }}>
                        {inq.message || 'Standard CIF quotation requested.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GARAGE SETTINGS & CREDENTIALS */}
      {activeTab === 'settings' && (
        <div className="glass-panel" style={{ padding: '32px', maxWidth: '640px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '20px' }}>
            Garage & Dealer Credentials Setup
          </h3>

          <form onSubmit={handleSaveSettings} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Japan Dealer License Number</label>
              <input
                type="text"
                value={garageSettings.dealerLicense}
                onChange={(e) => setGarageSettings({ ...garageSettings, dealerLicense: e.target.value })}
                style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Tokyo HQ Contact Phone</label>
              <input
                type="text"
                value={garageSettings.phone}
                onChange={(e) => setGarageSettings({ ...garageSettings, phone: e.target.value })}
                style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Export Desk Email</label>
              <input
                type="email"
                value={garageSettings.email}
                onChange={(e) => setGarageSettings({ ...garageSettings, email: e.target.value })}
                style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <button type="submit" className="btn-red" style={{ justifyContent: 'center', padding: '12px', marginTop: '8px' }}>
              <Save size={18} />
              <span>{t('saveChanges')}</span>
            </button>

            {settingsSaved && (
              <div style={{ color: '#10B981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginTop: '6px' }}>
                <CheckCircle size={16} />
                <span>Garage settings saved successfully!</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Add / Edit Vehicle Modal */}
      {showFormModal && (
        <VehicleFormModal
          vehicleToEdit={vehicleToEdit}
          onClose={() => setShowFormModal(false)}
          onSave={(data) => handleSaveVehicle(data)}
        />
      )}

    </div>
  );
};
