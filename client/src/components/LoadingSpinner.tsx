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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <BallTriangle
            height={100}
            width={100}
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
