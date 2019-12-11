//get current weather////
function kelvinToFahr(K){
  return ((K-273.15)*1.8)+32
}
function getCityWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=4d4f75f977fc59faeb9817db4af048db"
  $.ajax({
    url: queryURL,
    method: "get"
  }).then(function (response) {
    console.log(response);
  
    var cityName = $("<h1>").text(response.city.name);
    momentDate = moment().format('LLL');
    var listItem = response.list[0];
    var weather = listItem.weather[0];
    var iconCode = weather.icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var iconElement = $("<img>").attr("src", iconURL)
    var temperature = $("<p>").text("Temperature: " + kelvinToFahr(listItem.main.temp).toFixed(1) + " °F");
    var humidityElement = $("<p>").text("Humidity: " + listItem.main.humidity + "%");
    var windSpeed = $("<p>").text("Wind Speed: " + listItem.wind.speed + " mph")
    


    console.log(iconURL)
    $("#todayWeather").append(cityName)
      .append(momentDate)
      .append(iconElement)
      .append(temperature)
      .append(humidityElement)
      .append(windSpeed)
      var dy1temp = kelvinToFahr(response.list[1].main.temp).toFixed(1);
      var dy2temp = kelvinToFahr(response.list[2].main.temp).toFixed(1);
      var dy3temp = kelvinToFahr(response.list[3].main.temp).toFixed(1);
      var dy4temp = kelvinToFahr(response.list[4].main.temp).toFixed(1);
      var dy5temp = kelvinToFahr(response.list[5].main.temp).toFixed(1);
      // display date, icon, temp, humidity

      console.log('testing: ', moment().add(1, "d").format("M/D/YY"));
      // $("#fiveDayRow")
      //     .append('<div class="class bg-primary text-white fiveDayEl"><h5>'+ moment().add(1, "d").format("M/D/YY") + '</h5></div>');
      // // $("#fiveDayRow").html('<h1>asdfasdfasdfsafdsadf</h1>');
      $("#fiveDayRow").append("<div class='card bg-primary text-white fiveDayEl' id='dayOneEl'><h5>" + moment().add(1, "d").format("M/D/YY") + "</h5> <img src='https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + ".png' title='" + response.list[1].weather[0].description + "' /> <h6>Temp: " + dy1temp + " °F</h6> <h6>Humidity: " + response.list[1].main.humidity + "%</h6></div>");

      $("#fiveDayRow").append("<div class='card bg-primary text-white fiveDayEl'><h5>" + moment().add(2, "d").format("M/D/YY") + "</h5> <img src='https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + ".png' title='" + response.list[2].weather[0].description + "'> <h6>Temp: " + dy2temp + " °F</h6> <h6>Humidity: " + response.list[2].main.humidity + "%</h6></div>");

      $("#fiveDayRow").append("<div class='card bg-primary text-white fiveDayEl'><h5>" + moment().add(3, "d").format("M/D/YY") + "</h5> <img src='http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png' title='" + response.list[3].weather[0].description + "'> <h6>Temp: " + dy3temp + " °F</h6> <h6>Humidity: " + response.list[3].main.humidity + "%</h6></div>");
      
      $("#fiveDayRow").append("<div class='card bg-primary text-white fiveDayEl'><h5>" + moment().add(4, "d").format("M/D/YY") + "</h5> <img src='http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + ".png' title='" + response.list[4].weather[0].description + "'> <h6>Temp: " + dy4temp + " °F</h6> <h6>Humidity: " + response.list[4].main.humidity + "%</h6></div>");

      $("#fiveDayRow").append("<div class='card bg-primary text-white fiveDayEl'><h5>" + moment().add(5, "d").format("M/D/YY") + "</h5> <img src='https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + ".png' title='" + response.list[5].weather[0].description + "'><h6>Temp: " + dy5temp + " °F</h6> <h6>Humidity: " + response.list[5].main.humidity + "%</h6></div>");

      

     
     
   });
 }

// Event handler for user clicking the city button
$("#add-city").on("click", function(event) {
// Empty the contents of the weatherResult div
  $("#todayWeather").empty();
  $("#fiveDayRow").empty();
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the artist name
  var inputCity = $("#city-input").val().trim();

  // Running the getCityWeather function(passing in the artist as an argument)
  getCityWeather(inputCity);
});
