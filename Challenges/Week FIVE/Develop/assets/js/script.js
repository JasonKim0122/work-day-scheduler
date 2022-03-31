//Variables
var timeBlock = document.querySelector(".time-block");

//display current date and time on homepage.
$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));


//time blocks are color coded to indicate to users whether it is in the past,present, or future
function timeBlockColor () {
    var timeHour = moment().hours();

    timeBlock.each(function() {
        var currentTime = parseInt($(this).attr("id"));

        if(currentTime > timeHour) {
            timeBlock.classList.add("future");
        } else if ( currentTime === timeHour) {
            timeBlock.classList.add("present");
        } else {
            timeBlock.classList.add("past");
        }
    });
};


//create a saveBtn that will store data into localStorage



//After page is refreshed data will be pulled from localStorage and will remain on the page.