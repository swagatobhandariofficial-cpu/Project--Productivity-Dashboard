// function getUser(user, cb){
//     setTimeout(() => {
//         cb({id: 1, username:"_spriiha." })
//     }, 1000);
// }

// function getUserPosts(id, cb){
//     setTimeout(() => {
//         cb(["Hola", "Amigos" , "Good day"])
//     },2000)
// }

// getUser("Swagato", function(details){
//     getUserPosts(details.id, function(allposts){
//         console.log(details.username, allposts)
//     } )
// })

function loginUser(username, cb){
    console.log("logging in user....")
    setTimeout(() => {
        cb({user:"Swagato Bhandari"})
    }, 1000);
}

function fetchPermissions(userId, cb) {
    console.log("fetching permissions....")
    setTimeout(() => {
        cb(["read", "send message", "follow", "like"])
    }, 2000);
}

function loadDashboard(permissions, cb) {
    console.log("loading dashboard....")
    setTimeout(() => {
        cb();
    }, 1000);
}


loginUser("_spriiha.", function (user) {
    fetchPermissions(user.id, function (permissions) {
        loadDashboard(permissions, function () {
            console.log("✅Dashboard Loaded.")
        })
    })
})