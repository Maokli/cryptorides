import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#3563e9"
        ariaLabel="ball-triangle-loading"
      />
    </div>
  );
};

export default LoadingSpinner;