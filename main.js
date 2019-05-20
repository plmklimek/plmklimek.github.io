function weatherapp(){
    var cityname = document.querySelector(".cityname");
    var search = document.querySelector(".search");
    var API = "67c435829e2ab850b150cd57cbc6d845";
    var displaycontent = document.querySelector(".displaycontent");
    search.addEventListener('click', find, false); 
    function find(){
        var city = cityname.value;
        console.log(city);
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+API)
            .then(resp => {
                if(resp.status != 404){
                    resp.json().then(data => {
                        displaycontent.innerHTML = "";
                        displaycontent.innerHTML +="Pogoda dla : <b>" + city + "</b>";
                        displaycontent.innerHTML += "<br/><b>Zachmurzenie : </b>" + data.clouds.all + "%";
                        displaycontent.innerHTML += "<br/><b>Wilgotność : </b>" + data.main.humidity + "%";
                        displaycontent.innerHTML += "<br/><b>Ciśnienie : </b>" + data.main.pressure + "hPa";
                        displaycontent.innerHTML += "<br/><b>Temperatura : </b>" + data.main.temp + "C";
                    })
                }
                else{
                   displaycontent.innerHTML += "Nie znaleziono podanego miasta";
                }
            })
        cityname.value = "";
    }
}
function slider(){
    var x = document.querySelector(".x");
    var images = document.querySelectorAll(".images");
    var arrowl = document.querySelector(".arrowl");
    var arrowr = document.querySelector(".arrowr");
    x.classList.toggle("hidden");
    x.addEventListener('click',close,false);
    arrowl.addEventListener('click',changel,false);
    arrowr.addEventListener('click',changer,false);
    images.forEach(img => img.addEventListener('click',
    function(){
        zoom(img)
    },false));
    var idinterval = setInterval(change,2000);
    function changer(){
        for(var i = 0; i < images.length;i++){
            var last = images[i].classList;
            if(last[last.length - 1] != "hidden"){
                last.toggle("hidden");
                if(i + 1 == images.length){
                    images[0].classList.toggle("hidden");
                }
                else{
                    images[i+1].classList.toggle("hidden");
                }
                break;
            }
        }
    }
    function changel(){
        for(var i = images.length - 1; i >= 0;i--){
            var last = images[i].classList;
            if(last[last.length - 1] != "hidden"){
                last.toggle("hidden");
                if(i == 0){
                    images[images.length - 1].classList.toggle("hidden");
                }
                else{
                    images[i-1].classList.toggle("hidden");
                }
                clearInterval(idinterval);
                idinterval = setInterval(change,2000);
                break;
            }
            
        }
    }
    function change(){
        for(var i = 0; i < images.length;i++){
            var last = images[i].classList;
            if(last[last.length - 1] != "hidden"){
                last.toggle("hidden");
                if(i + 1 == images.length){
                    images[0].classList.toggle("hidden");
                }
                else{
                    images[i+1].classList.toggle("hidden");
                }
                clearInterval(idinterval);
                idinterval = setInterval(change,2000);
                break;
            }
            
        }
    }
    function zoom(t){
        x.classList.toggle("hidden");
        t.classList.toggle("zoom");
        clearInterval(idinterval);
    }
    function close(){
        x.classList.toggle("hidden");
        for(var i = 0; i < images.length;i++){
            images[i].classList.forEach(cl =>{
                if(cl == "zoom"){
                    images[i].classList.toggle("zoom");
                }
            })
        }
        idinterval = setInterval(change,2000);
    }

}
weatherapp();
slider();