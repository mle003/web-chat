const view = {
    currentScreen : null
}

view.showComponents = async function(screenName){
    view.currentScreen = screenName
    switch(screenName){
        case 'register': {
            let app = document.getElementById('app')
            app.innerHTML = components.register

            let link = document.getElementById('register-link')
            link.onclick = linkClickHandler


            let form = document.getElementById('register-form')
            form.onsubmit = formSubmitHandler


            function linkClickHandler(){
                view.showComponents('login')
            }

            function formSubmitHandler(e){
                e.preventDefault()

                

                //get data
                let registerInfo = {
                    firstname: form.firstname.value.trim(),
                    lastname: form.lastname.value.trim(),
                    email: form.email.value.trim().toLowerCase(),
                    password: form.password.value,
                    confirmPassword: form.confirmPassword.value,
                }


                //validate
                let validateResult = [
                    view.validate('firstname-error', [registerInfo.firstname, 'Missing firstname!']),
                    view.validate('lastname-error', [registerInfo.lastname, 'Missing lastname!']),
                    view.validate('email-error', [registerInfo.email, 'Missing email!']),
                    view.validate('password-error',[
                        registerInfo.password, 'Missing password!',
                        registerInfo.password.length >= 6, 'Password length must be greater or equal than 6'
                    ]),
                    view.validate('confirmPassword-error', [
                        registerInfo.confirmPassword, 'Missing confirm password',
                        registerInfo.confirmPassword == registerInfo.password, 'Password and confirm password must be the same'
                    ])
                ]
                //submit data
                if(view.allPassed(validateResult)){
                    controller.register(registerInfo)
                }
                
               
                
                
            //     let hasPassword = view.validate(registerInfo.password, 'password-error', 'Missing password')
            //     if(hasPassword){
            //         view.validate(registerInfo.password.length >= 6, 'password-error', 'Password must be equal or longer than 6')
            //     }
            //     let hasConfirmPassword = view.validate(registerInfo.confirmPassword, 'confirmPassword-error', 'Missing confirm password')
            //     if(hasConfirmPassword){
            //         view.validate(registerInfo.confirmPassword == registerInfo.password, 'confirmPassword-error', 'Confirm Password is not the same as Password')
            //     }
                


            }
            break
        }
        case 'login':{
            let app = document.getElementById('app')
            app.innerHTML = components.login

            let link = document.getElementById('login-link')
            link.onclick = linkClickHandler

            let form = document.getElementById('login-form')
            form.onsubmit = formSubmitHandler


            function linkClickHandler(){
                view.showComponents('register')
            }

            function formSubmitHandler(e){
                e.preventDefault();

                let loginInfo ={
                    email: form.email.value.trim().toLowerCase(),
                    password: form.password.value,
                }
                
                let validateResult = [
                    view.validate('email-error', [loginInfo.email, 'Missing email!']),
                    view.validate('password-error', [
                        loginInfo.password, 'Missing Password',
                        loginInfo.password.length >= 6, 'Password length must be equal or greater than 6!'
                    ])
                ]
                if(view.allPassed(validateResult)){
                    controller.login(loginInfo)
                }
            }
            

            
            break
        }
        case 'chat': {
            let app = document.getElementById('app')
            app.innerHTML = components.nav + components.chat

            let userEmail = document.getElementById('user-email')
            userEmail.innerText = firebase.auth().currentUser.email

            let signOutBtn = document.getElementById('sign-out-btn')
            signOutBtn.onclick = () => firebase.auth().signOut()

            let formAddMessage = document.getElementById('form-add-message')
            formAddMessage.onsubmit =formAddMessageSubmit

            let formAddConversation = document.getElementById('form-add-conversation')
            formAddConversation.onsubmit = formAddConversationSubmit


            let formLeaveConversation = document.getElementById('form-leave-current-conversation')
            formLeaveConversation.onsubmit = formLeaveConversationSubmit

            controller.setupDatabaseChange()

            await controller.loadConversations() // load all conversations and save to model
            view.showCurrentConversation() //read data from model and display to screen
            view.showListConversations()


            async function formAddMessageSubmit(e){
                e.preventDefault()
                let content = formAddMessage.message.value.trim()
                if(model.currentConversation && content){
                    
                    
                        view.disable('form-add-message-btn')
                        let message ={
                            content: content,
                            owner: firebase.auth().currentUser.email,
                            createdAt: new Date().toISOString()
                        }
                        await controller.updateNewMessage(model.currentConversation.id, message)
                        formAddMessage.message.value =''
                        view.enable('form-add-message-btn')

                    

                }
            }

            async function formAddConversationSubmit(e){
                e.preventDefault()

                view.disable('form-add-conversation-btn')

                let title = formAddConversation.title.value
                let friendEmail = formAddConversation.friendEmail.value.trim().toLowerCase()
                let currentEmail = firebase.auth().currentUser.email
                let friendEmailExists = await controller.validateEmailExists(friendEmail)
                let validateResult = [
                    view.validate('title-error',[
                        title, 'Missing Title!'
                    ]),
                    view.validate('friend-email-error',[
                        friendEmail, 'Missing friend email!',
                        friendEmailExists, 'Friend email does not exist!',
                        friendEmail != currentEmail, "PLease enter an other person's email"
                    ])
                ]
                if(view.allPassed(validateResult)){
                    let conversation ={
                        users: [currentEmail, friendEmail],
                        messages: [],
                        title: title,
                        createdAt: new Date().toISOString()
                    }
                    await controller.addConversation(conversation)
                    formAddConversation.title.value = ''
                    formAddConversation.friendEmail.value = ''
                }
                

                
                view.enable('form-add-conversation-btn')
            }

            async function formLeaveConversationSubmit(e){
                e.preventDefault()
                
                view.disable("leave-current-conversation-btn")
                let conversation ={
                    users: [currentEmail, friendEmail],
                    messages: [],
                    title: title,
                    createdAt: new Date().toISOString()
                }
                await controller.deleteConversation(conversation)
                view.enable("leave-current-conversation-btn")



                

                
            }

            break
        }
        case 'loading' : {
            let app = document.getElementById('app')
            app.innerHTML = components.loading
            break
        }
    }
}


view.setText = function(id, text){
    document.getElementById(id).innerHTML = text
}

view.allPassed = function(validateResult){
    for(let result of validateResult){
        if(!result){
            return false
        }
    }
    return true
}


view.validate = function(idErrorTag, validateInfos){
    // if(condition){
    //     view.setText(idErrorTag,'')
    //     return true
    // }
    // else{
    //     view.setText(idErrorTag, messageError)
    //     return false
    // }
    for (let i=0 ;i < validateInfos.length; i+=2){
        let condition = validateInfos[i]
        let message = validateInfos[i+1]
        if (!condition){
            view.setText(idErrorTag, message)
            return false
        }
    }
    view.setText(idErrorTag, '')
    return true
}

view.disable = function(id){
    document.getElementById(id).setAttribute('disabled', true)
}

view.enable = function(id){
    document.getElementById(id).removeAttribute('disabled')
}