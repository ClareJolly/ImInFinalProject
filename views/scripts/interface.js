// const axios = require('axios');
document.addEventListener("DOMContentLoaded", function(event) {

var pathArray = window.location.pathname.split('/');
// console.log(pathArray[-1])
short_id = pathArray.slice(-1)[0]

getEvents(short_id)
function getEvents (short_id){}
// s_ID = short_id
// s_ID = pathArray.slice(-1)[0]
  fetch('/api/db') // Call the fetch function passing the url of the API as a parameter
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    // Create and append the li's to the ul
    console.log(data)
    codeArr = []
    for (var i = 0 ; i < data.length; i++){

        for (var x = 0 ; x< data[i].invitees_new.length; x++){
          // console.log(response.data[i].invitees_new[x].short_id)
          shortID = data[i].invitees_new[x].short_id.toString()
          // console.log(shortID)
          codeArr.push({'shortID':shortID,'eventID': data[i]._id,'all': data[i]})
        }
    };
// console.log(short_id)
// console.log(codeArr)
    // console.log(codeArr)
    r = codeArr.find(obj => obj.shortID === short_id)

    console.log(r)
    if (r.all.eventPricePP === undefined){
    price = "0.01"
  } else {
    price = r.all.eventPricePP
  }
    console.log(price)
    document.title = "Pay for "+r.all.teamName
    createHTMLObject("img", [{attr: "src", val: "/logo.png"},{attr: "class", val: "logo-img"},{attr: "width", val: "100px"}],"App")
    createHTMLObject("h1", [{attr: "id", val: "EventName"}],"App")
    document.getElementById("EventName").innerHTML = r.all.teamName
    createHTMLObject("h2", [{attr: "id", val: "event_date"}],"App")
    document.getElementById("event_date").innerHTML = "Date: "+ r.all.eventDate
    createHTMLObject("h2", [{attr: "id", val: "event_time"}],"App")
    document.getElementById("event_time").innerHTML = "@ "+ r.all.eventTime
    createHTMLObject("h2", [{attr: "id", val: "event_place"}],"App")
    document.getElementById("event_place").innerHTML = "Location: "+ r.all.eventPlace
    createHTMLObject("h2", [{attr: "id", val: "price"}],"App")
    document.getElementById("price").innerHTML = "Deposit: £"+ price
    createHTMLObject("form", [{attr: "action", val: "/api/paypal/pay"},{attr: "method", val: "post"},{attr: "id", val: "pay-form"}],"App")
    createHTMLObject("input", [{attr: "type", val: "hidden"},{attr: "name", val: "short_id"},{attr: "id", val: "short_id"},{attr: "value", val: short_id}],"pay-form")
    createHTMLObject("input", [{attr: "type", val: "hidden"},{attr: "name", val: "price"},{attr: "id", val: "price"},{attr: "value", val: price}],"pay-form")
    createHTMLObject("input", [{attr: "type", val: "hidden"},{attr: "name", val: "event_ID"},{attr: "id", val: "event_ID"},{attr: "value", val: r.all._id}],"pay-form")
    createHTMLObject("input", [{attr: "type", val: "hidden"},{attr: "name", val: "eventName"},{attr: "id", val: "eventName"},{attr: "value", val: r.all.teamName}],"pay-form")

    createHTMLObject("input", [{attr: "type", val: "hidden"},{attr: "name", val: "eventDate"},{attr: "id", val: "eventDate"},{attr: "value", val: r.all.eventDate}],"pay-form")

    createHTMLObject("input", [{attr: "type", val: "hidden"},{attr: "name", val: "eventPlace"},{attr: "id", val: "eventPlace"},{attr: "value", val: r.all.eventPlace}],"pay-form")

    createHTMLObject("button", [{attr: "type", val: "submit"},{attr: "value", val: "Confirm"},{attr: "id", val: "pay-btn"}],"pay-form")
    document.getElementById("pay-btn").innerHTML = "I'M IN"
    return r
    })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });


function createHTMLObject(type, attr, appendTo) {
  var obj = document.createElement(type)
  for (i = 0; i < attr.length; i++) {
  obj.setAttribute(attr[i].attr, attr[i].val)
}
  document.getElementById(appendTo).appendChild(obj);
}


})
