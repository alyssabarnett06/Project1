$(document).ready(function() {

    // ************************* This code uses moment.js in the same format as ticketMaster start date***********
    
        var now = moment().format('YYYY-MM-DD');
        var tom = moment().add(1, 'days').format('YYYY-MM-DD');
        var thirdDay = moment().add(2, 'days').format('YYYY-MM-DD');
        var fourthDay = moment().add(3, 'days').format('YYYY-MM-DD');
         var fifthDay = moment().add(4, 'days').format('YYYY-MM-DD');
        
    // *******************************************************************************************************************
    
    
    
    // *********************************TicketMaster AJAX runs here.  Only displays events for the next 5 days. Converts Military Time to
    // Standard time and full date into 3 letter month********************************************************************************
    function renderEvents(city){
        
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&sort=date,asc&apikey=AlXWPlOM6D9cmC44mUJe7J3cIPHQeHp0";
    
        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            // checks if there are any events happening in the city 
            if(!response._embedded || !Array.isArray(response._embedded.events)){
                console.log("There are no upcoming events for this city");
                $("#eventResult").append("<br>" + "There are no upcoming events for this city");
            }
            else{
                // Only shows events taking place in the next 5 days
                for(var i = 0; i < response._embedded.events.length; i++){     
                        var date = response._embedded.events[i].dates.start.localDate;
                         if (date == now ||
                             date == tom ||
                             date == thirdDay ||
                             date == fourthDay ||
                             date == fifthDay){
                                 console.log(response);
    
                                var fullDate = response._embedded.events[0].dates.start.localDate;
                                var day = fullDate.slice(-2);
                                var monthNum = fullDate.substring(5,7);
                                var month;
                                var noSpecificTime = response._embedded.events[i].dates.start.noSpecificTime;
                                if(noSpecificTime == false){
                                var fullTime = response._embedded.events[i].dates.start.localTime;
                                var milTime = fullTime.substring(0,2);
                                }
                                var time;
                                var eventName = response._embedded.events[i].name;
                                var id = response._embedded.events[i].id;
                                var genre = response._embedded.events[i].classifications[0].genre.name;
                                var priceRangeMin;
                                var priceRangeMax;
                                var priceRange;
                                var url = response._embedded.events[i].url;
                                var description;
            
            // Will allow the name of the month to appear on the page
            switch(monthNum){
                case "01":
                    month = "Jan";
                    break;
                case "02":
                    month = "Feb";
                    break;
                case "03": 
                    month = "Mar";
                    break;
                case "04": 
                    month = "Apr";
                    break;
                case "05": 
                    month = "May";
                    break;
                case "06": 
                    month = "Jun";
                    break;
                case "07": 
                    month = "Jul";
                    break;
                case "08": 
                    month = "Aug";
                    break;
                case "09": 
                    month = "Sep";
                    break;
                case "10": 
                    month = "Oct";
                    break;
                case "11": 
                    month = "Nov";
                    break;
                case "12":
                    month = "Dec";
                    break;
            }
    
    
                // Converts military time to standard time
                switch(milTime){
                    case "01":
                        time = "1:00 AM";
                    break;
                     case "02":
                         time = "2:00 AM";
                    break;
                    case "03": 
                         time = "3:00 AM";
                    break;
                    case "04": 
                         time = "4:00 AM";
                    break;
                    case "05": 
                         time = "5:00 AM";
                    break;
                    case "06": 
                        time = "6:00 AM";
                    break;
                    case "07": 
                        time = "7:00 AM";
                    break;
                    case "08": 
                        time = "8:00 AM";
                    break;
                    case "09": 
                        time = "9:00 AM";
                    break;
                    case "10": 
                        time = "10:00 AM";
                    break;
                    case "11": 
                        time = "11:00 AM";
                    break;
                    case "12":
                        time = "12:00 PM";
                    break;
                    case "13":  
                        time = "1:00 PM";
                    break;
                    case "14": 
                        time = "2:00 PM";
                    break;
                    case "15":  
                        time = "3:00 PM";
                    break;
                    case "16":
                        time = "4:00 PM";
                    break;
                    case "17": 
                        time = "5:00 PM";
                    break;
                    case "18": 
                        time = "6:00 PM";
                    break;
                    case "19": 
                        time = "7:00 PM";
                    break;
                    case "20": 
                        time = "8:00 PM";
                    break;
                    case "21": 
                        time = "9:00 PM";
                    break;
                    case "22":
                        time = "10:00 PM";
                    break;
                    case "23": 
                        time = "11:00 PM";
                    break;
                    case "24": 
                        time = "12:00 AM";
                    break;
                    default:
                        time = "Time not available";
            }      
                    // Checks API to see if a description of the event exsists, if so, it displays it
                    if (response._embedded.events[i].promoter){
                            description = response._embedded.events[i].promoter.name;
                    }
                    // Checks if the price range is available for the event
                    if(response._embedded.events[i].priceRanges){
                            priceRangeMin = response._embedded.events[i].priceRanges[0].min;
                            priceRangeMax = response._embedded.events[i].priceRanges[0].max;
    
                            priceRange = "Price Range: $" + priceRangeMin + "- $" + priceRangeMax;
                    }
                    // Appends all of the info to the page
                    var newDiv = $("<div id=" + id + ">");
                         $("#eventResult").append(newDiv);
                    var newP = $("<p>");
                        newP.append("<br>" +"<strong>"+ eventName + "</strong>" + 
                                    "<br> " + month + " " + day + " " + time );
                    var readMore = $("<button class='read-more-toggle'>");
                        readMore.append("Read More");
                    var moreP = $("<p class='read-more-content hide'>");
                        moreP.append("<br>" + priceRange + "<br>" +
                                    genre + "<br>" +
                                    description + "<br>" +
                                    "Interested in this event? visit " +`<a href=${url} target="_blank">here</a>` + "<hr>");
                    $("#" + id).append(newP, readMore, moreP);     
                                        
                    if(eventName == null){
                        $("#eventResult").append("There are no upcoming events for this location");
                    }       
                }
            }  
                $('.read-more-toggle').on('click', function() {
                     $(this).next('.read-more-content').toggleClass('hide');
                }); 
         }
       })
    }
    
        // ***********************findEvents takes user input and passes it to renderEvents function**************************
    function findEvents(){
        var cityInput = $("#city-input").val().trim();
        renderEvents(cityInput);
    }
    
    // *************************On-click event runs findEvents fucntion********************************
    $("#add-city").on("click", function(event) {
        $("#eventResult").empty();
        event.preventDefault();
        findEvents();
        
    });
    
    });
    
        
    