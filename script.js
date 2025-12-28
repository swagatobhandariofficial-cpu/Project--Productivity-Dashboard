function run(username,cb){
    console.log("fetching user data...");
    setTimeout(() => {
        cb({ _id:1221, username, age:26, email:"s@gmail"})
    }, Math.floor(Math.random()*5) *1000);
}

function profile(id,cb){
    console.log("fetching posts");
    setTimeout(() => {
        cb({ _id:id, posts:["hey","hello","wassup"]})
    }, Math.floor(Math.random()*15 ) *1000);
}

run("swagato",function(data){
    console.log(data);
    profile(data._id, function(posts){
        console.log(posts);
    })
});

//------------------------------------------------------------------

let pr =new Promise(function(res,rej){
    setTimeout(()=>{
        let rn=Math.floor(Math.random()*10);
        if(rn>5){
            res("resolved with " +rn)
        }

        else {
            rej("rejected with " +rn);
        }
    },2500)
});

//--1
// pr.then(function(val){
//     console.log(val);
// }).catch(function(val){
//     console.log(val);
// })


//--2
async function abcd() {
    try{
        let val = await pr;
        console.log(val);
    } catch (err) {
        console.log(err);
    }
}
abcd();