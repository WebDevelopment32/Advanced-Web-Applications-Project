import React from 'react'
import { Link } from 'react-router-dom';
import './Settings.css'
import './Login.js'
import './CreateRestaurantAccount.js'
import './AddProducts.js'

export default function RestaurantUser() {
    return (
        <div>
            <h2 className="restaurantOtsikko">Edit restaurant information</h2>
            <div>
                <p className="restaurantName">Restaurant Name</p>
                <input type="text" className="restaurantNameInput"></input>
            </div>
            <div className="infoDivs">
                <p className="infoNames">Opening hours</p>
                <input type="text" className="infoInput"></input>
            </div>
            <div className="infoDivs">
                <p className="infoNames">Price</p>
                <input type="text" className="infoInput"></input>
            </div>
            <div></div>
            <div className="infoDivs">
                <p className="infoNames">Email</p>
                <input type="text" className="infoInput"></input>           
            </div>
            <div className="infoDivs">
                <p className="infoNames">Tel. Number</p>
                <input type="text" className="infoInput"></input>           
            </div>
            <div></div>
            <div className="infoDivs">
                <p className="infoNames">Address</p>
                <input type="text" className="infoInput"></input>     
            </div>
            <div className="infoDivs">
                <p className="infoNames">City</p>
                <input type="text" className="infoInput"></input>
            </div>
            <div>
                <button className="restaurantSaveBtn">Save</button>
                <Link to="/AddProducts">
                    <button className="restaurantAddBtn">Add products →</button> 
                </Link>
            </div>
        </div>
    )
}
