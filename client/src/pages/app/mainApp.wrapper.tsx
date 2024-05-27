import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helpers';
import NotFoundPage from '../shared/notFound.page';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddCarForm from '../forms/addCar.form';
import CarDetailsPage from './car-details.page';
import RentalRequestsPage from './rental-requests.page';
import BrowseUserCars from './userCarsPage';
import BrowseUserRentalRequests from './rentalrequestPage';
import UpdateCarForm from '../forms/updateCar.form';


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
        <Route path="/browse" element={<BrowseCarsPage />}></Route>
        <Route path="/add" element={<AddCarForm />}></Route>
        <Route path='/publishedcars' element={<BrowseUserCars/>}/>
        <Route path='/publishedrequest' element={<BrowseUserRentalRequests/>}/>
        <Route path="/details/:id" element={<CarDetailsPage />}></Route>
        <Route path="/rentalRequests/" element={<RentalRequestsPage />}></Route>
        <Route path="/update" element={<UpdateCarForm/>}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default MainAppWrapper;
