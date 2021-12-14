import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className="container">
            <form class="form" id="login">
                <h1 class="form-title">Login</h1>
                <div class="form-message form-message--error"></div>
                <div class="form-input-group">
                    <input type="text" class="form-input" autoFocus placeholder="Username or email"></input>
                    <div class="form-input-error-message"></div>
                </div>
                <div class="form-input-group">
                    <input type="password" class="form-input" autoFocus placeholder="Password"></input>
                    <div class="form-input-error-message"></div>
                </div>
                <button class="form-button" type="submit">Continue</button>
                <p class="form-text">
                    <a class="form-link" href="./CreateAccount" id="linkCreateAccount">Don't have an account? Create account!</a>
                </p>
                <p class="form-text">
                    <a class="form-link" href="./CreateRestaurantAccount" id="linkCreateRestaurantAccount">Creating account for a restaurant? Create restaurant account!</a>
                </p>
            </form>
        </div>
    )
}

export default Login
