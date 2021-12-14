import React from 'react'
import './Settings.css'

export default function Settings() {
    return (
        <div>
            <h2 className="settingsOtsikko">Edit profile</h2>
            <div className="nameDivs">
                <p className="settingsTextNames">First Name</p>
                <input type="text" className="settingsInputNames"></input>
            </div>
            <div className="nameDivs">
                <p className="settingsTextNames">Second Name</p>
                <input type="text" className="settingsInputNames"></input>
            </div>
            <div>
                <p className="settingsText">Email</p>
                <input type="text" className="settingsInputEmail"></input>           
            </div>
            <div className="addressDivs">
                <p className="settingsText">Address</p>
                <input type="text" className="settingsInput"></input>     
            </div>
            <div className="addressDivs">
                <p className="settingsText">City</p>
                <input type="text" className="settingsInput"></input>
            </div>
            <div>
                <button className="saveBtn">Save</button>    
            </div>
        </div>
    )
}
