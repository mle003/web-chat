components.register = `
<section class ="register-container">
<form id="register-form" class = "register-form">
    <div class ="form-header">
        <h3>MindX chat</h3>
    </div>
    <div class = "form-content">
        <div class="name-wrapper">
            <div class = "input-wrapper">
                <input type="text" name ="firstname" placeholder="Firstname">
                <div id="firstname-error" class ="message-error"></div>
            </div>
            <div class = "input-wrapper">
                <input type="text" name ="lastname" placeholder="Lastname">
                <div id="lastname-error" class ="message-error"></div>
            </div>
           
        </div>
        <div class ="input-wrapper">
            <input type="email" name= "email" placeholder="Email">
            <div id="email-error" class ="message-error"></div>
        </div>
        <div class ="input wrapper">
            <input type="password" name = "password" placeholder="Password">
            <div id="password-error" class ="message-error"></div>
        </div>
        <div class ="input-wrapper">
            <input type="password" name = "confirmPassword" placeholder="Confirm Password">
            <div id="confirmPassword-error" class ="message-error"></div>
        </div>
        <div id ="register-error" class = "message-error"></div>
        <div id ="register-success" class= "message-success"></div>
    </div>
    <div class ="form-footer">
        <a id ="register-link" href ="#">Already have an account? Login</a>
        <button id ="register-btn" type ="submit">Register</button>
    </div>
</form>
</section>`

components.login = `
<section class ="login-container">
        <form id = "login-form" class ="login-form">
            <div class ="form-header">
                <h3>MindX chat</h3>
            </div>
            <div class = "form-content">
                <div class ="input-wrapper">
                    <input type="email" name="email" placeholder ="Email">
                    <div id="email-error" class ="message-error"></div>
                </div>
                <div class ="input-wrapper">
                    <input type="password" name="password" placeholder="Password">
                    <div id="password-error" class ="message-error"></div>
                </div>
                <div id ="login-error" class = "message-error"></div>
            </div>
            <div class ="form-footer">
                <a id = "login-link" href = "#">Not have an account yet? Register</a>
                <button id ="login-btn" type="submit">Login</button>
            </div>
        </form>
    </section>`

