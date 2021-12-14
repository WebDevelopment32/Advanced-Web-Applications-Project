import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './CreateAccount.css'

function CreateRestaurantAccount() {
    return (
        <div className="container">
            <form class="form" id="createRestaurantAccount">
                <h1 class="form-title">Create Restaurant Account</h1>
                <div class="form-message form-message--error"></div>
                <div class="form-input-group">
                    <input type="text" class="form-input" autoFocus placeholder="Restaurant Name"></input>
                    <div class="form-input-error-message"></div>
                </div>
                <div class="form-input-group">
                    <input type="text" class="form-input" autoFocus placeholder="Email Address"></input>
                    <div class="form-input-error-message"></div>
                </div>
                <div class="form-input-group">
                    <input type="password" class="form-input" autoFocus placeholder="Password"></input>
                    <div class="form-input-error-message"></div>
                </div>
                <div class="form-input-group">
                    <input type="password" class="form-input" autoFocus placeholder="Confirm password"></input>
                    <div class="form-input-error-message"></div>
                </div>
                <Link to="/RestaurantUser">
                <button class="form-button" type="submit">Continue</button>
                </Link>
                <p class="form-text">
                    <a class="form-link" href="./Login" id="linkLogin">Already have a restaurant account? Sign in</a>
                </p>
            </form>
        </div>
    )
}

export default CreateRestaurantAccount