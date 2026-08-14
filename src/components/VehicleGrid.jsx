import React from 'react';
import { VehicleCard } from './VehicleCard';
import { Car, AlertCircle } from 'lucide-react';

export const VehicleGrid = ({ vehicles, onViewDetails, onInquire }) => {
  if (vehicles.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center', margin: '40px 0' }}>
        <AlertCircle size={48} color="var(--primary-red)" style={{ marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#FFF' }}>
          No Matching Japanese Inventory Found
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto' }}>
          Try resetting your search or filter parameters. We also source vehicles directly from USS / CAA Japan auctions upon custom request.
        </p>
      </div>
    );
  }

  return (
    <div className="grid-vehicles">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onViewDetails={onViewDetails}
          onInquire={onInquire}
        />
      ))}
    </div>
  );
};
