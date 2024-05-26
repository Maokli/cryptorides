import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helpers';
import NotFoundPage from '../shared/notFound.page';
import LoadingSpinner from '../../components/LoadingSpinner';

function MainAppWrapper() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    } else {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <>
      <LoadingSpinner isAuthorized={isAuthorized} />
      <Routes>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/browse" element={<BrowseCarsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default MainAppWrapper;
