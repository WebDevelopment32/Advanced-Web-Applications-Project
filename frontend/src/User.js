import React from 'react'
import { Link } from 'react-router-dom';
import './User.css'
import './Home.css'
import './Settings.js'

export default function User() {
    return (
        <div>
            <h2 className="UserTexts">Hello, "Name"</h2>
            <p className="UserTexts">Name, 2nd Name</p>
            <p className="UserTexts">Account information</p>
            <p className="UserTexts1">Order history:</p>

            <div>
                <input className="infoBox"></input>
            </div>

            <Link to="/Settings">
                    <img class="SettingsButton" src="../Images/SettingsIcon.png" alt="SettingsIcon"/>
            </Link>

        </div>
    )
}
