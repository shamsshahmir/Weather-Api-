let select = document.getElementById("select");
let list = document.getElementById("list");
let selectText = document.getElementById("selectText");
let dropmen = document.getElementsByClassName("dropmen");
const newName = document.getElementById("inputfield");
const mainCity = document.getElementById("city");
const mainCountry = document.getElementById("country");
const cacigame = document.getElementById("cel");
const felciigame = document.getElementById("fel");
var checked;
var datasearched;
var dropmenName = "";
var n;



select.onclick = function () {

    list.classList.toggle("close");

    list.classList.toggle("open");
}

for (option of dropmen) {
    option.onclick = function () {
        selectText.innerHTML = this.innerHTML;
        newName.placeholder = "Search by" + " " + selectText.innerHTML;
        dropmenName =  selectText.innerText;
    }
}


function search() {
    if( dropmenName == "City Name" || dropmenName == ""){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=e0797426da5b350941799439ac337816')
        .then(response => response.json())
        .then(data => {
            datasearched = data;
            n=0;
            randeredData();
        })
        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
    }else if( dropmenName == "City Id"){
        fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + newName.value + '&appid=e0797426da5b350941799439ac337816')
        .then(response => response.json())
        .then(data => {
            datasearched = data;
            console.log("hello");
            n=0;
            randeredData();
        })
        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
    }else{
        fetch('https://api.openweathermap.org/data/2.5/forecast?zip=' + newName.value + '&appid=e0797426da5b350941799439ac337816')
        .then(response => response.json())
        .then(data => {
            datasearched = data;
            n=0;
            randeredData();
        })
        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
    }

}

randeredData = () =>{
    mainCity.innerHTML = datasearched.city.name + "," + datasearched.city.country;
    document.getElementById("actualpress").innerHTML = " " + Number(datasearched.list[n].main.pressure) + " " + "hpa";
    document.getElementById("actualhumid").innerHTML = " " + Number(datasearched.list[n].main.humidity) + " " + "%";
    document.getElementById("actualwindsy").innerHTML = " " + Number(datasearched.list[n].wind.speed) + " " + "m/s";
    document.getElementById("temp10").innerText = " " + Number(datasearched.list[n].main.temp - 273.15).toFixed(0);
    document.getElementById("imgfirstly").src = "http://openweathermap.org/img/wn/" +
        datasearched.list[n].weather[0].icon
        + "@" + "2x" + ".png";
    document.getElementById("atmos").innerHTML = datasearched.list[n].weather[0].main;
    cacigame.classList.add("checked");
    checked = true;
    cacigame.addEventListener("click", celciusfun)

    felciigame.addEventListener("click", farenfun)
    document.getElementById("day" + (n + 1)).innerHTML = weekday[CheckDay() + n];

    for (i = 0; i < 5; i++) {

        document.getElementById("hightemp" + (i + 1)).innerHTML = Number(datasearched.list[i].main.temp_max - 273.15).toFixed(0) + "°";
        document.getElementById("lowtemp" + (i + 1)).innerHTML = " " + Number(datasearched.list[i].main.temp_min - 273.15).toFixed(0) + "°";
        document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
            datasearched.list[i].weather[0].icon
            + "@" + "2x" + ".png";
            document.getElementById("day").innerHTML = weekday[CheckDay() + n];
    }

}

var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day) {
    var currentday = weekday[d.getDay()];
    document.getElementById("day").innerText = currentday;
    return d.getDay();
    
}


celciusfun = () => {

    document.getElementById("temp10").innerText = " " + Number(datasearched.list[n].main.temp - 273.15).toFixed(0);
    cacigame.classList.add("checked");

    if (checked == false) {

        felciigame.classList.remove("checked")
    }
    checked = true;
};

farenfun = () => {

    document.getElementById("temp10").innerText = " " + Number(datasearched.list[n].main.temp - 459.67).toFixed(0);
    felciigame.classList.add("checked");
    if (checked == true) {
        cacigame.classList.remove("checked")
    }
    checked = false;
};





const action1 =( )=>{
    n=0;
    randeredData();

}
const action2=( )=>{
    n=1;
    randeredData();
}
const action3=( )=>{
    n=2;
    randeredData();
}
const action4=( )=>{
    n=3;
    randeredData();
}
const action5=( )=>{
    n=4;
    randeredData();
}
const onebox = document.getElementById("icon1");
onebox.addEventListener("click",action1);


const secbox = document.getElementById("icon2");
secbox.addEventListener("click",action2);


const thirdbox = document.getElementById("icon3");
thirdbox.addEventListener("click",action3);


const fourbox = document.getElementById("icon4");
fourbox.addEventListener("click",action4);


const fivebox = document.getElementById("icon5");
fivebox.addEventListener("click",action5);


const searchbutton = document.getElementById("searchbutton");
searchbutton.addEventListener("click", search);



