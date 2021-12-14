import React from 'react'
import './CreateAccount.css'

function CreateAccount() {
    return (
        <div className="container">
            <form class="form" id="createAccount">
                <h1 class="form-title">Create Account</h1>
                <div class="form-message form-message--error"></div>
                <div class="form-input-group">
                    <input type="text" class="form-input" autoFocus placeholder="Username"></input>
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
                <button class="form-button" type="submit">Continue</button>
                <p class="form-text">
                    <a class="form-link" href="./Login" id="linkLogin">Already have an account? Sign in</a>
                </p>
            </form>
        </div>
    )
}

export default CreateAccount
