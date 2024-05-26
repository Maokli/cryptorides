import React, { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import axiosHelper from '../helpers/axios.helpers';

interface LoadingSpinnerProps {
  isAuthorized: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isAuthorized }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axiosHelper.addInterceptors(setIsLoading);
  }, []);

  return (
    <>
      {isLoading && (
        <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        >
          <BallTriangle
            height={300}
            width={300}
            radius={5}
            color="#3563e9"
            ariaLabel="ball-triangle-loading"
          />
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
