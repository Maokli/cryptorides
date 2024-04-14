import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helper';
import NotFoundPage from '../shared/notFound.page';

function MainAppWrapper() {
  useEffect(() => {
    if(!isAuthenticated())
      redirect("/login")
  }, [])
  
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/browse" replace />}></Route>
        <Route path="/browse" element={<BrowseCarsPage />}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
  )
}

export default MainAppWrapper;
