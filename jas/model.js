const model ={
    conversations: null, // all conversations user joined
    currentConversation: null // conversation selected
}


model.saveConversations = function(conversations){
    model.conversations = conversations
}

model.saveCurrentConversation = function(conversation){
    model.currentConversation = conversation
}

model.updateConversation = function(conversation){
    if(model.currentConversation && model.currentConversation.id == conversation.id){
        model.saveCurrentConversation(conversation)
    }

    let existedIndex = model.conversations.findIndex(function(element){
        return element.id == conversation.id
    })
    if(existedIndex >= 0){
        model.conversations[existedIndex] = conversation
        //model.conversations.splice(existedIndex, 1, conversation)
    }
    else{
        model.conversations.push(conversation)
    }
}

// model.leaveConversation = function(conversation){
    
// }