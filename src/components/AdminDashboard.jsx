import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Car,
  Plus,
  Edit2,
  Trash2,
  Users,
  LogOut,
  Settings,
  ShieldCheck,
  Search,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Globe,
  Tag
} from 'lucide-react';
import { VehicleFormModal } from './VehicleFormModal';

export const AdminDashboard = ({ onLogout }) => {
  const {
    vehicles,
    handleDeleteVehicle,
    handleSaveVehicle,
    handleToggleStatus,
    inquiries,
    t
  } = useLanguage();

  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' | 'inquiries' | 'settings'
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered Inventory List
  const filteredVehicles = vehicles.filter(v => 
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.stockNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setShowVehicleModal(true);
  };

  const handleOpenEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowVehicleModal(true);
  };

  const handleSaveVehicleForm = (vehicleData) => {
    handleSaveVehicle(vehicleData);
    setShowVehicleModal(false);
  };

  return (
    <section style={{ padding: '40px 20px 80px', minHeight: '80vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Admin Header Banner */}
        <div className="glass-panel" style={{
          padding: '24px 28px',
          marginBottom: '32px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--red-dim)', color: 'var(--primary-red)' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-red)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                ADMINISTRATION PORTAL
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-dark)' }}>
                {t('adminDashboardTitle')}
              </h1>
            </div>
          </div>

          <button onClick={onLogout} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <LogOut size={16} />
            <span>{t('adminLogout')}</span>
          </button>
        </div>

        {/* Executive Metrics Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          
          <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Total Vehicles</span>
              <Car size={20} color="var(--primary-red)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>
              {vehicles.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
              ● Live Cloud Firestore Sync Active
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Customer Inquiries</span>
              <Users size={20} color="var(--primary-red)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>
              {inquiries.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-red)', fontWeight: 700, marginTop: '4px' }}>
              ● Global Buyer Quotes Received
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '12px'
        }}>
          <button
            onClick={() => setActiveTab('vehicles')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'vehicles' ? 'var(--primary-red)' : '#FFFFFF',
              color: activeTab === 'vehicles' ? '#FFFFFF' : 'var(--text-dark)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === 'vehicles' ? '0 4px 14px rgba(229,9,20,0.3)' : 'var(--shadow-sm)'
            }}
          >
            <Car size={18} />
            <span>{t('tabInventoryManagement')} ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'inquiries' ? 'var(--primary-red)' : '#FFFFFF',
              color: activeTab === 'inquiries' ? '#FFFFFF' : 'var(--text-dark)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === 'inquiries' ? '0 4px 14px rgba(229,9,20,0.3)' : 'var(--shadow-sm)'
            }}
          >
            <Users size={18} />
            <span>{t('tabInquiryLeads')} ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: VEHICLE INVENTORY MANAGEMENT */}
        {activeTab === 'vehicles' && (
          <div>
            <div style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
                <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search stock # or model..."
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    color: 'var(--text-dark)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                />
              </div>

              {/* Add Vehicle CTA */}
              <button onClick={handleOpenAddModal} className="btn-red">
                <Plus size={18} />
                <span>{t('addVehicleBtn')}</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="glass-panel" style={{ overflowX: 'auto', background: '#FFFFFF' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-light)', color: 'var(--text-dark)' }}>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Vehicle</th>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Stock #</th>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Year & Mileage</th>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>FOB Price (USD / JPY)</th>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Grade</th>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Status</th>
                    <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((v) => (
                    <tr key={v.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      
                      {/* Vehicle Model & Image */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={v.image}
                            alt={v.model}
                            style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-dark)', fontSize: '0.92rem' }}>{v.model}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{v.make}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--primary-red)', fontSize: '0.85rem' }}>
                        {v.stockNo}
                      </td>

                      <td style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-sub)', fontWeight: 600 }}>
                        {v.year} • {v.mileage}
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-dark)', fontSize: '0.9rem' }}>${v.priceUsd.toLocaleString()} USD</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>¥{v.priceJpy.toLocaleString()} JPY</div>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span className="badge-grade">{v.auctionGrade}</span>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <select
                          value={v.status || 'Available'}
                          onChange={(e) => handleToggleStatus(v.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: v.status === 'Sold' ? '#EF4444' : v.status === 'Reserved' ? '#F59E0B' : '#10B981',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </td>

                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleOpenEditModal(v)}
                            className="btn-outline"
                            style={{ padding: '6px 10px', fontSize: '0.78rem', minHeight: '34px' }}
                            title="Edit Vehicle"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(v.id)}
                            style={{
                              background: '#FEE2E2',
                              border: '1px solid #FCA5A5',
                              color: '#DC2626',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                            title="Delete Vehicle"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRY LEADS MANAGER */}
        {activeTab === 'inquiries' && (
          <div className="glass-panel" style={{ overflowX: 'auto', background: '#FFFFFF' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-light)', color: 'var(--text-dark)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Buyer Name</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Contact Info</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Target Vehicle</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Destination Country</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800 }}>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    
                    <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                      {inq.customerName || inq.name}
                    </td>

                    <td style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                      <div style={{ fontWeight: 600 }}>{inq.email}</div>
                      <div style={{ color: 'var(--text-muted)' }}>{inq.phone}</div>
                    </td>

                    <td style={{ padding: '14px 18px' }}>
                      <span className="badge-red" style={{ marginRight: '6px' }}>{inq.stockNo}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)' }}>{inq.model}</span>
                    </td>

                    <td style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>
                      {inq.country}
                    </td>

                    <td style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {inq.submittedAt ? new Date(inq.submittedAt).toLocaleDateString() : 'Recent'}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Vehicle Add / Edit Modal */}
      {showVehicleModal && (
        <VehicleFormModal
          vehicleToEdit={editingVehicle}
          onClose={() => setShowVehicleModal(false)}
          onSave={handleSaveVehicleForm}
        />
      )}
    </section>
  );
};
