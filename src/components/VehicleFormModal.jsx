import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Save, Car, Plus, Trash2 } from 'lucide-react';

export const VehicleFormModal = ({ vehicleToEdit, onClose, onSave }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    id: '',
    stockNo: '',
    make: 'Toyota',
    model: '',
    year: 2000,
    bodyType: 'Sports',
    priceUsd: 45000,
    priceJpy: 7000000,
    mileage: '65,000 km',
    engine: '3.0L 2JZ Turbo',
    transmission: 'Manual',
    drive: 'RWD',
    fuel: 'Petrol / Premium',
    color: 'Super White',
    steering: 'Right Hand',
    auctionGrade: '4.5 / A',
    exteriorGrade: '4.5',
    interiorGrade: 'A',
    status: 'Available',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    features: ['Service Logbook', 'Certified Mileage', 'Non-Smoker']
  });

  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        ...vehicleToEdit,
        features: vehicleToEdit.features || ['Service Logbook', 'Certified Mileage']
      });
    } else {
      const randomStock = `AG-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData((prev) => ({
        ...prev,
        id: randomStock,
        stockNo: randomStock
      }));
    }
  }, [vehicleToEdit]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '780px', padding: 0 }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-dark)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '6px', background: 'var(--red-dim)', color: 'var(--primary-red)' }}>
              <Car size={22} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
              {vehicleToEdit ? `${t('editVehicleBtn')}: ${vehicleToEdit.model}` : t('addVehicleBtn')}
            </h2>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '28px', display: 'grid', gap: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
          
          {/* Row 1: Stock #, Make, Model */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Stock #</label>
              <input
                type="text"
                required
                value={formData.stockNo}
                onChange={(e) => handleChange('stockNo', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Make</label>
              <select
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              >
                <option value="Toyota">Toyota</option>
                <option value="Nissan">Nissan</option>
                <option value="Honda">Honda</option>
                <option value="Mazda">Mazda</option>
                <option value="Subaru">Subaru</option>
                <option value="Lexus">Lexus</option>
                <option value="Mitsubishi">Mitsubishi</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Model Name</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="e.g. Skyline GT-R R34 V-Spec II"
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>
          </div>

          {/* Row 2: Year, Body Type, Transmission, Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Year</label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value, 10))}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Body Type</label>
              <select
                value={formData.bodyType}
                onChange={(e) => handleChange('bodyType', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              >
                <option value="Sports">Sports / JDM</option>
                <option value="SUV">SUV / 4WD</option>
                <option value="Sedan">Sedan / Luxury</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck / Van</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => handleChange('transmission', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-red)', borderRadius: '6px', color: 'var(--primary-red)', fontWeight: 700 }}
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Row 3: Prices (USD & JPY) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>FOB Price ($ USD)</label>
              <input
                type="number"
                required
                value={formData.priceUsd}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  handleChange('priceUsd', val);
                  handleChange('priceJpy', val * 155);
                }}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>FOB Price (¥ JPY)</label>
              <input
                type="number"
                required
                value={formData.priceJpy}
                onChange={(e) => handleChange('priceJpy', parseInt(e.target.value, 10) || 0)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>
          </div>

          {/* Row 4: Mileage, Engine, Drive, Auction Grade */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Mileage</label>
              <input
                type="text"
                value={formData.mileage}
                onChange={(e) => handleChange('mileage', e.target.value)}
                placeholder="e.g. 75,000 km"
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Engine Specs</label>
              <input
                type="text"
                value={formData.engine}
                onChange={(e) => handleChange('engine', e.target.value)}
                placeholder="e.g. 2.6L RB26DETT Twin-Turbo"
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Auction Grade</label>
              <input
                type="text"
                value={formData.auctionGrade}
                onChange={(e) => handleChange('auctionGrade', e.target.value)}
                placeholder="e.g. 4.5 / A"
                style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
            </div>
          </div>

          {/* Row 5: Main Image URL */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Vehicle Photo URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={{ width: '100%', padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
            />
          </div>

          {/* Features Tag Checklist */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Key Vehicle Features</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. Brembo Brakes, Recaro Seats..."
                style={{ flex: 1, padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-dark)', borderRadius: '6px', color: '#FFF' }}
              />
              <button type="button" onClick={handleAddFeature} className="btn-outline" style={{ padding: '8px 16px' }}>
                <Plus size={16} /> Add
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {formData.features.map((feat, idx) => (
                <span key={idx} style={{ padding: '4px 10px', background: 'var(--red-dim)', border: '1px solid var(--border-red)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {feat}
                  <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveFeature(idx)} />
                </span>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button type="submit" className="btn-red" style={{ justifyContent: 'center', padding: '14px', marginTop: '12px' }}>
            <Save size={18} />
            <span>{t('saveVehicle')}</span>
          </button>

        </form>
      </div>
    </div>
  );
};
