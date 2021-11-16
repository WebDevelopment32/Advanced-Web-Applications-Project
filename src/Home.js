import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
           <h1>
               React Food Delivery App
            </h1>
            <p>
                Welcome to React Food Delivery. 
                Select a restaurant where you'd like to order
            </p>
            <p>
                <Link to="/contacts"><button className="Nappi1">McDonalds</button></Link>
                <Link to="/contacts"><button className="Nappi2">Burger King</button></Link>
            </p>
        </div>
    )
}
