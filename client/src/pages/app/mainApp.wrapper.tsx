import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helpers';
import NotFoundPage from '../shared/notFound.page';
import AddCarForm from '../forms/addCar.form';

function MainAppWrapper() {
  useEffect(() => {
    if(!isAuthenticated())
      redirect("/login")

    document.body.style.backgroundColor = "#f4f4ff"
  }, [])
  
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/browse" replace />}></Route>
        <Route path="/browse" element={<BrowseCarsPage />}></Route>
        <Route path="/add" element={<AddCarForm />}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
  )
}

export default MainAppWrapper;
