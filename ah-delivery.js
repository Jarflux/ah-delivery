var apiUrl = 'https://www.ah.be/service/rest/delegate?url=%2Fkies-moment%2Fophalen%2F3224&_=' + Date.now(); 
var afterDate = new Date('2020-04-24');
var beforeDate = new Date('2020-04-29');
console.log("Checking Available AH Delivery Timeslots");
var audio = new Audio('https://soundbible.com/mp3/Slow_HeartBeat-Mike_Koenig-1853475164.mp3');
window.intervalID = setInterval( function(){
    var allFull = true;
    $.getJSON(apiUrl, function(data) {
       var deliveryDates = data._embedded.lanes[3]._embedded.items[0]._embedded.deliveryDates;
       deliveryDates.forEach( function(deliverydate){
           if((new Date(deliverydate.date)).getTime() > afterDate.getTime() 
                && (new Date(deliverydate.date)).getTime() < beforeDate.getTime() ){
                console.log("Checking date " + deliverydate.date);
                deliverydate.deliveryTimeSlots.forEach(function(timeslot){
                    if(timeslot.state=="selectable" ){
                        allFull = false;
                        console.log("%cAvailable slot found ->  %s at %s", "color: #228B22",  deliverydate.date, timeslot.from);
                        audio.play();
                    }
                })
            }
       })
       if(allFull){
           console.log("%cAll timeslots full", "color: #D3D3D3");
       }
    });
}, 60000);
console.log("To stop execute: clearInterval(" + window.intervalID + ")")
