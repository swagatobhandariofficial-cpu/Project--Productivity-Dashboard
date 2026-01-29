function getUser(user, cb){
    setTimeout(() => {
        cb({id: 1, username:"_spriiha." })
    }, 1000);
}

function getUserPosts(id, cb){
    setTimeout(() => {
        cb(["Hola", "Amigos" , "Good day"])
    },2000)
}

getUser("Swagato", function(details){
    getUserPosts(details.id, function(allposts){
        console.log(details.username, allposts)
    } )
})