import { useEffect } from 'react';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helpers';
import NotFoundPage from '../shared/notFound.page';

function MainAppWrapper() {
  useEffect(() => {
    if(!isAuthenticated())
      redirect("/login")
  }, [])
  
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/" replace />}></Route>
        <Route path="/browse" element={<BrowseCarsPage />}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
  )
}

export default MainAppWrapper;
