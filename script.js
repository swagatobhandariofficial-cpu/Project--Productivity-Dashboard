//---------------fetching weather report using promises method(then-catch)
function abcd(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93bc8c534dced6b5c372972a29ae7236`)
        .then(function (raw) {
            return raw.json();
        })
        .then(function (real) {
            console.log(real);
        })
        .catch(function (err) {
            console.log(err);
        });
}
abcd("london");


//--------------fetching weather report using async-await
    function xyz(city) {
    setTimeout(async() => {
        let rawData= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93bc8c534dced6b5c372972a29ae7236`)
        let realData= await rawData.json()
        console.log(realData)
    }, 3000);
};
xyz("Delhi");