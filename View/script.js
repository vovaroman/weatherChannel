example = () => {
    var url = "/weatherApi";
    var request = new XMLHttpRequest();
    request.onreadystatechange  = function(){
        if (request.readyState == 4  )
        {
          var jsonObj = JSON.parse(request.responseText);
          document.getElementById("temperature").innerHTML =  jsonObj.temperature;
          document.getElementById("wind").innerHTML = jsonObj.wind;
          document.getElementById("Humidity").innerHTML = jsonObj.Humidity;
        }
     }
     request.open("GET", url, true);
     request.send();
}

setInterval(example, 100)