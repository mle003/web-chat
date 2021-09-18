
controller.setupDatabaseChange = function(){
    let currentEmail = firebase.auth().currentUser.email
    let isFirstRun = true
    firebase
        .firestore()
        .collection('users')
        .where('users', 'array-contains', currentEmail)
        .onSnapshot(function(snapshot) {
            if(isFirstRun){
                isFirstRun = false
                return
            }

            let docChanges = snapshot.docChanges()
            for (docChange of docChanges){
                if(docChange.type == 'modified'){
                    let conversationChange = transformDoc(docChange.doc)
                    //update model.conversations
                    //update model.currentConversations
                    //view.showCurrentConversation()
                    model.updateConversation(conversationChange)
                    
                    view.showCurrentConversation()
                }
                if(docChange.type == 'added'){
                    let conversationChange = transformDoc(docChange.doc)
                    model.updateConversation(conversationChange)
                    view.showListConversations()
                }
    
                if(docChange.type == 'removed'){
                    let conversationChange = transformDoc(docChange.doc)
                    model.updateConversation(conversationChange)
                    view.showListConversations()
                }

            }
        })
}


controller.loadConversations = async function(){
    //get many conversations
    //try{
        let currentEmail = firebase.auth().currentUser.email
        let result = await firebase
        .firestore()
        .collection('users')
        .where('users', 'array-contains', currentEmail)
        .get()
        let conversations = transformDocs(result.docs)
        model.saveConversations(conversations)
        if(conversations.length){
            let currentConversation = conversations[0]
            model.saveCurrentConversation(currentConversation)
        }

        // let docs = result.docs
        // const conversations = []
        // for(let doc of docs){
        //     conversations.push(doc.data())
        // }
        
        // //save conversations to model
        // model.saveConversations(conversations)
        // //save current conversation
        // model.saveCurrentConversation(conversations[0])
    //}
    // catch(err){
    //     console.log('error')
    // }
    
}


controller.updateNewMessage = function(conversationId, message) {
    return firebase
        .firestore()
        .collection('users')
        .doc(conversationId)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        })
}

controller.addConversation = function(conversation){
    return firebase
        .firestore()
        .collection('users')
        .add(conversation)
}


controller.deleteConversation = function(conversation){
    return firebase
        .firestore()
        .collection('users')
        .doc(conversation)
        .delete()

}