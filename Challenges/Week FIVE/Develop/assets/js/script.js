//display current date and time on homepage.
$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));


//time blocks are color coded to indicate to users whether it is in the past,present, or future
function timeBlockColor () {
    var timeHour = moment().hours();

    $(".time-block").each(function() {
        var currentTime = parseInt($(this).attr("id").split("-")[1]);
        console.log(this);

        if(currentTime > timeHour) {
            $(this).addClass("future");
        } else if ( currentTime === timeHour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    });
};

//create a saveBtn that will store data into localStorage
$(".saveBtn").on("click", function (){
    var hour = $(this).siblings(".hour").text();
    var description = $(this).siblings(".description").val();

    localStorage.setItem(hour, description);
});

//After page is refreshed data will be pulled from localStorage and will remain on the page.
function loadDescription () {
    $(".hour").each(function(){
        var timeHour = $(this).text();
        var currentDescription = localStorage.getItem(timeHour);

        if(currentDescription !==null) {
            $(this).siblings(".description").val(currentDescription);
        }
    });
};


//call functions

timeBlockColor();
loadDescription();