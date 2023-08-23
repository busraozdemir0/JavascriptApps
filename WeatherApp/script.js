
const url = "https://api.openweathermap.org/data/2.5/";
const key = "4ce69487652af15f633b9652c508c5d6";

const setQuery = (e) => {
    if (e.keyCode == '13')
        getResult(searchBar.value) // inputa girilen şehir adını fonksiyona gönderiyoruz
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;   // units=metric ile santigrat cinsinden gelmesi için (aksi takdirde Kelvin gelir)
    fetch(query)
        .then(weather => {
            return weather.json()
        })
        .then(displayResult)
}

const displayResult= (result) =>{
 let city=document.querySelector(".city")
 city.innerText=`${result.name}, ${result.sys.country}`

 let temp=document.querySelector(".temp")
 temp.innerText=`${(result.main.temp)}°C`

 let desc=document.querySelector(".desc")
 desc.innerText=result.weather[0].description

 let minmax = document.querySelector(".minmax")
 minmax.innerText=`${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`
}

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery)  // enter tuşuna basıldığı anda ..