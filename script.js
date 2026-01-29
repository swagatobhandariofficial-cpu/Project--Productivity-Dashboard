fetch('https://randomuser.me/api/')
.then(function(readdetails){
    return readdetails.json();
})
.then(function(realdata){
    console.log(realdata.results[0].name.first);
})
.catch(function (err) {
    console.log(err)
});