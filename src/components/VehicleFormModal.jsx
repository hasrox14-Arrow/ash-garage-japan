import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Save, Car, Plus, Trash2, UploadCloud, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { uploadVehicleImageToFirebase } from '../firebase/config';

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
    gallery: [],
    features: ['Service Logbook', 'Certified Mileage', 'Non-Smoker']
  });

  const [featureInput, setFeatureInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        ...vehicleToEdit,
        gallery: vehicleToEdit.gallery || [vehicleToEdit.image],
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

  // Image Upload Handler (Browse or Drag & Drop)
  const processImageFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadVehicleImageToFirebase(file);
      setFormData((prev) => ({
        ...prev,
        image: uploadedUrl,
        gallery: [uploadedUrl, ...prev.gallery.filter(g => g !== uploadedUrl)]
      }));
    } catch (err) {
      console.error("Failed to process image file:", err);
    }
    setUploadingImage(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
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
      <div className="modal-content glass-panel" style={{ maxWidth: '820px', padding: 0 }}>
        
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
          
          {/* DRAG & DROP / FILE BROWSE IMAGE UPLOAD ZONE */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#FFF', marginBottom: '8px', fontWeight: 700 }}>
              Vehicle Main Photo (Drag & Drop or Browse File) *
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              style={{
                border: isDragging ? '2px dashed var(--primary-red)' : '2px dashed var(--border-red)',
                background: isDragging ? 'rgba(229, 9, 20, 0.15)' : 'var(--bg-surface)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              {uploadingImage ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--primary-red)' }}>
                  <Loader2 size={36} className="animate-spin" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Uploading photo to Firebase Storage...</span>
                </div>
              ) : formData.image ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', justifyContent: 'center' }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--primary-red)' }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: '#10B981', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={16} /> Photo Loaded & Ready
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click or drag a new image file here to replace.</span>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ padding: '12px', borderRadius: '50%', background: 'var(--red-dim)', color: 'var(--primary-red)' }}>
                    <UploadCloud size={32} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, color: '#FFF', fontSize: '0.95rem' }}>
                      Drag & Drop your car photo file here
                    </span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      or <span style={{ color: 'var(--primary-red)', textDecoration: 'underline', fontWeight: 700 }}>browse files</span> from your computer (PNG, JPG, WEBP)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

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
          <button type="submit" disabled={uploadingImage} className="btn-red" style={{ justifyContent: 'center', padding: '14px', marginTop: '12px' }}>
            <Save size={18} />
            <span>{t('saveVehicle')}</span>
          </button>

        </form>
      </div>
    </div>
  );
};
