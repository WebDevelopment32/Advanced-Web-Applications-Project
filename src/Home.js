import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div>
           <h1 className="HomeText">
               React Food Delivery App
            </h1>
            <p className="HomeText">
                Welcome to React Food Delivery. 
                Select a restaurant where you'd like to order
            </p>

            <div class="dashboard-content">
                <Link to="/contacts"><div class="dashboard-card">
                    <img class="card-image" src="../Images/mcdonalds.jpg" alt="McDonalds"/>
                    <div class="card-detail">
                        <h4>McDonalds<span>€€</span></h4>
                        <p><code>I'm Lovin' it</code></p>
                        <p class="card-time"><code>15-30 min</code></p>
                    </div>                    
                </div></Link>
                <Link to="/contactsBK"><div class="dashboard-card">
                    <img class="card-image" src="../Images/BKlogo.png" alt="BurgerKing"/>
                    <div class="card-detail">
                        <h4>BurgerKing<span>€</span></h4>
                        <p><code>Flame-grilled burgers</code></p>
                        <p class="card-time"><code>15-30 min</code></p>
                    </div>                    
                </div></Link>
                <Link to="/contactsHS"><div class="dashboard-card">
                    <img class="card-image" src="../Images/HankoSushi.jpg" alt="HankoSushi"/>
                    <div class="card-detail">
                        <h4>Hanko Sushi Oulu<span>€€</span></h4>
                        <p><code>Sushi with fresh ingredients</code></p>
                        <p class="card-time"><code>30-40 min</code></p>
                    </div>                    
                </div></Link>
            </div>
        </div>
    )
}
