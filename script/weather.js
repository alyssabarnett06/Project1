function getCityWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=4d4f75f977fc59faeb9817db4af048db"
    $.ajax({
      url: queryURL,
      method: "get"
    }).then(function (response) {
      console.log(response);
      var cityName = $("<h1>").text(response.city.name);
      var date = new Date();
      date = moment().format('LL');
      var listItem = response.list[0];
      var weather = listItem.weather[0];
      var iconCode = weather.icon;
      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
      var iconElement = $("<img>").attr("src", iconURL)
      var temperature = $("<p>").text("Temperature: " + listItem.main.temp + " °F");
      var humidityElement = $("<p>").text("Humidity: " + listItem.main.humidity + "%");
      var windSpeed = $("<p>").text("Wind Speed: " + listItem.wind.speed + " mph")
      console.log(iconURL)
      $("#weatherResult").append(cityName)
        .append(iconElement)
        .append(temperature)
        .append(humidityElement)
        .append(windSpeed)
       // Empty the contents of the weatherResult div
       //$("#weatherResult").empty();
     });
   }
  // Event handler for user clicking the city button
  $("#add-city").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputCity = $("#city-input").val().trim();
    // Running the getCityWeather function(passing in the artist as an argument)
    getCityWeather(inputCity);
  });

