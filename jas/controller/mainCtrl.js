const controller ={}

function transformDocs(docs){
    // let datas =[]
    // for (let data of datas){
    //     let data = doc.data()
    //     data.id = doc.id
    //     datas.push(data)
    // }
    // return datas
    return docs.map(transformDoc)
}

function transformDoc(doc){
    let data = doc.data()
    data.id = doc.id
    return data
}