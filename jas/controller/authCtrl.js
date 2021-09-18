controller.register = async function(registerInfo){
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.lastname + " " + registerInfo.firstname
    view.setText('register-success', '')
    view.setText('register-error', '')
    view.disable('register-btn')
    try{
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('register-success', 'An verification email has been sent to your email address')     
    }
    catch(err){
        view.setText('register-error', err.message)
    }
    
    view.enable('register-btn')
    console.log('register new user!')
}


controller.login = async function(loginInfo){
    let email = loginInfo.email
    let password = loginInfo.password
    view.setText('login-error', '')
    try{
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)
        if(!result.user || !result.user.emailVerified){
            throw new Error ('User must verify email!')
        }
        view.showComponents('chat')
    }
    catch(err){
        view.setText('login-error', err.message)
    }

    
    
}

controller.validateEmailExists = async function(email){
    try{
        let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email)
        return signInMethods.length > 0
    } catch(err){
        return false
    }
   
}
