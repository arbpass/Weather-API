//for showing day, date, time
let date= document.getElementById("date");

let weekdays= ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let currentDay= new Date().getDay();
let day= weekdays[currentDay];

let allMonths= ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let currentMonth= new Date().getMonth();
let month= allMonths[currentMonth];

let time= new Date().getHours() +":"+ new Date().getMinutes();

date.innerText= `${day} | ${month} ${new Date().getDate()} | ${time}`;

//fetch api function
function fetchApi(){
  let city= document.getElementById("city");
  let temp= document.getElementById("temp");
  let minMax= document.getElementById("minmax");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.innerText}&appid=e8e8e9917d22858d7043b5a152971460&units=metric `)
    .then(response => response.json())
    .then(data => {
      console.log(data); //data is an object so extract required elements from it
      let temperature= data["main"]["temp"];
      let minTemperature= data["main"]["temp_min"];
      let maxTemperature= data["main"]["temp_max"];
      let weather= data["weather"][0]["main"];
      
      temp.innerText= temperature + "'C\n" + weather;
      minMax.innerText= "Min " +minTemperature+ "'C | Max " +maxTemperature+ "'C";

      if(weather== "Rain"){
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('gifs/rain.gif')";
        document.getElementsByTagName("i")[0].style.color = "#009688";
      }
      if(weather== "Clouds"){
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('gifs/clouds.gif')";
        document.getElementsByTagName("i")[0].style.color = "#448abd";
      }
      if(weather== "Thunderstorm"){
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('gifs/thunder.gif')";
        document.getElementsByTagName("i")[0].style.color = "#ee27f4";
      }
      if(weather== "Snow"){
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('gifs/snow.gif')";
        document.getElementsByTagName("i")[0].style.color = "#263238";
      }
      if(weather== "Mist" || weather== "Haze"){
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('gifs/mist.gif')";
        document.getElementsByTagName("i")[0].style.color = "#797979";
      }
      if(weather== "Clear"){
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('gifs/clear.gif')";
        document.getElementsByTagName("i")[0].style.color = "orange";
      }
    })
    .catch(error=> {
      console.log("City not found");
      city.innerText= "City not found"
    })
};
fetchApi(); //run this function for the first time

//searchbar works
let input= document.getElementById("input");
function searchBar(){
  if(input.value){
    city.innerText= input.value.toUpperCase();
    input.value= "";
    fetchApi(); //run fetchApi() again
  }
};

