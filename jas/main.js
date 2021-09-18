window.onload = init;

function init(){
    view.showComponents('loading')
    firebase.auth().onAuthStateChanged(function(user){
        if(view.currentScreen == 'register' || view.currentScreen == 'login'){
            return
        }
        if(user && user.emailVerified){
            view.showComponents('chat')
        }
        else{
            view.showComponents('register')
        }
    })
}



//demo
async function demoQueryDatabse(){
    //get many
    let result = await firebase
        .firestore()
        .collection('demo')
        .where('name','==','name2')
        .get()
    console.log(result)

    let docs =result.docs
    for(let doc of docs){
        console.log(doc.id, doc.data())
    }
    // get one
    let id ="123"
    let doc = await firebase
        .firestore()
        .collection('demo')
        .doc(id)
        .get()
    console.log(doc.id, doc.data())
    //create
    let data ={
        name: "name4"
    }
    await firebase
        .firestore()
        .collection('demo')
        .add(data)
    console.log("added new data")
    //update
    let id2 = "123"
    await firebase
        .firestore()
        .collection('demo')
        .doc(id2)
        .update({
            name: "updated name",
            //array: firebase.firestore.FieldValue.arrayUnion('b')
            array: firebase.firestore.FieldValue.arrayRemove('b')

        })
    console.log("updated data")

    //delete
    let id3 ="456"
    await firebase
        .firestore()
        .collection('demo')
        .doc(id3)
        .delete()

    console.log('deleted data')
    
}

//demoQueryDatabse()