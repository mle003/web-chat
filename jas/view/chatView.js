view.showCurrentConversation = function(){
    if(model.currentConversation){
        // get all messages
        let messages = model.currentConversation.messages
        //let listMessage = document.querySelector('.list-message')
        let listMessage = document.getElementById('list-message')
        let conversationDetailed = document.getElementById('conversation-detailed')
        listMessage.innerHTML = ''
        conversationDetailed.innerHTML = ''
        let createdAt =model.currentConversation.createdAt
        let member = model.currentConversation.users
        for(let message of messages){
            let content = message.content
            let owner = message.owner
            let currentEmail = firebase.auth().currentUser.email
            let className =''
            if(owner == currentEmail){
                className = 'message your'
            }
            else{
                className = 'message'
            }
            html = `<div class="${className}">
                        <span>${content}</span>
                    </div>`
            
            listMessage.innerHTML += html
            
        }
        html2 = `<div class ="users-in-conversation">Members: ${member}</div>
                     <div class= "conversation-date">Created date: ${createdAt}</div>            
            `
        conversationDetailed.innerHTML += html2
        listMessage.scrollTop = listMessage.scrollHeight
    }
}

view.showListConversations = function(){
    let listConversation = document.getElementById('list-conversation')
    listConversation.innerHTML = ''
    if(model.conversations && model.conversations.length){
        //show array model.conversation to listConversation
        let conversations = model.conversations
        console.log(listConversation, conversations)
        for(let conversation of conversations){
            let {id: conversationId, title, users} = conversation
            let memberCount = conversation.users.length
            let className = (model.currentConversation && model.currentConversation.id == conversation.id)
                ? 'conversation current'
                : 'conversation'
            let member = memberCount > 1 ? (memberCount + ' members') : (memberCount + ' member')
            html = `<div id = "${conversationId}" class = "conversation">
                        <div class="conversation-title">${title}</div>
                        <div class="conversation-members">${member}</div>
                    </div>`
            listConversation.innerHTML += html
        }
        for (let conversation of conversations){
            let conversationId = conversation.id
            let conversationCard = document.getElementById(conversationId)
            conversationCard.onclick = function(){
                //update data in model
                //update to view: showList, show current
                model.saveCurrentConversation(conversation)
                view.showListConversations()
                view.showCurrentConversation()
            }
        }
    }
    
}

