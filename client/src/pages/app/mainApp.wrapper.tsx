import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import BrowseCarsPage from './browse-cars.page';
import { isAuthenticated } from '../../helpers/auth.helpers';
import NotFoundPage from '../shared/notFound.page';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddCarForm from '../forms/addCar.form';
import CarDetailsPage from './car-details.page';
import AgreementPage from './Agreement.page';
import RentalRequestsPage from './rental-requests.page';
import BrowseUserCars from './userCarsPage';
import BrowseUserRentalRequests from './rentalrequestPage';
import UpdateCarForm from '../forms/updateCar.form';
import { getUserIdFromToken } from '../../services/account.service';
import { toast } from 'react-toastify';


function MainAppWrapper() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const source = new EventSource('http://localhost:3001/sse');

  source.onmessage = function (event) {
    const loggedInUserId = parseInt(getUserIdFromToken() ?? "");
    const eventBody = JSON.parse(event.data);
    if(eventBody.userId === loggedInUserId)
      toast.info(eventBody.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  source.onerror = function (error) {
    console.error('EventSource error:', error);
  };

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
        <Route path="/agreement/:id" element={<AgreementPage />}></Route>
        <Route path="/rentalRequests/" element={<RentalRequestsPage />}></Route>
        <Route path="/update/:id" element={<UpdateCarForm/>}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default MainAppWrapper;
