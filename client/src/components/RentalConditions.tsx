import * as React from 'react';

const RentalConditions: React.FC = () => {
    return (
        <div>
            <h1>Rental Conditions</h1>
            <p>Our rental conditions are as follows:</p>
            <ul>
                <li>Minimum age to rent a car is 21 years old</li>
                <li>Valid driver's license required</li>
                <li>Deposit required</li>
                <li>Insurance required</li>
            </ul>
        </div>
    ); 
}; 
export default RentalConditions;