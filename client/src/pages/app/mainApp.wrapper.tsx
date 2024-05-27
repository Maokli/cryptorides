import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helpers';
import NotFoundPage from '../shared/notFound.page';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddCarForm from '../forms/addCar.form';
import CarDetailsPage from './car-details.page';
import AgreementPage from './Agreement.page';

function MainAppWrapper() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if(!isAuthenticated())
      redirect("/login")

    document.body.style.backgroundColor = "#f4f4ff"
    setIsAuthorized(true);

  }, [])
  
  return (
    <>
      <LoadingSpinner isAuthorized={isAuthorized} />
      <Routes>
        <Route path="/" element={<Navigate to="/browse" replace />}></Route>
        <Route path="/browse" element={<BrowseCarsPage />}></Route>
        <Route path="/add" element={<AddCarForm />}></Route>
        <Route path="/details/:id" element={<CarDetailsPage />}></Route>
        <Route path="/agreement/:id" element={<AgreementPage />}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default MainAppWrapper;
