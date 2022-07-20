// Setting current date
var today = moment()
$('#currentDay').text(today.format('dddd MMM Do, YYYY'));

//Global variables
// array to hold saved events
var eventsArray = JSON.parse(localStorage.getItem("savedEvents")) || [];


var past = moment().startOf('hour').fromNow();

var present = moment().hours();
//var present = moment(Date.now()).subtract(4, 'h').hours();

var description = $('.description');
var btn = $('.btn');

//Function to save the tasks after refreshing the page
function loadItemsFromStorage() {

    console.log('loadItemsFromStorage function ran successfully!');
    console.log('eventsArray is', eventsArray);

    $(".description").each(function () {

        var hour = $(this).attr("id");

        for (var i = 0; i < eventsArray.length; i++) {
            if (hour === eventsArray[i].eventHour) {
                var eventDescrip = eventsArray[i].eventDescription
                console.log(eventDescrip)
                $(this).text(eventDescrip);
            } 
        }

    })
}

//Setting the click event  for the save button
$(btn).on('click', function () {
    
    var value = $(this).siblings(".description").val();
    // console.log('value is', value);
    var timeSlot = $(this).siblings("textarea").attr("id");
    // console.log('timeSlot is', timeSlot);
    var eventInfo = {
        eventDescription: value,
        eventHour: timeSlot
    }
    console.log('eventInfo is', eventInfo);
    eventsArray.push(eventInfo);
    console.log('eventsArray is now', eventsArray);

    localStorage.setItem("savedEvents", JSON.stringify(eventsArray));
})


//Setting the classes to change the color in the description box (textarea)
function textInput() {
    
    description.each(function () {

        var blockHour = parseInt($(this).attr('id').split('-')[1])



        if (blockHour === present) {
            $(this).addClass('present');
            // console.log('condition 1 is met')
        } else if (blockHour < present) {
            $(this).addClass('past');
        } else {
            $(this).addClass('future');
        }
    })
}

textInput();
loadItemsFromStorage();