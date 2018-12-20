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

    createHTMLObject("div", [{attr: "class", val: "grid-container"},{attr: "id", val: "grid-container"}],"App")
    createHTMLObject("div", [{attr: "class", val: "eventname"},{attr: "id", val: "header"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "left1"},{attr: "id", val: "left1"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "right1"},{attr: "id", val: "right1"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "left2"},{attr: "id", val: "left2"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "right2"},{attr: "id", val: "right2"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "left3"},{attr: "id", val: "left3"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "right3"},{attr: "id", val: "right3"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "left4"},{attr: "id", val: "left4"}],"grid-container")
    createHTMLObject("div", [{attr: "class", val: "right4"},{attr: "id", val: "right4"}],"grid-container")


    createHTMLObject("h1", [{attr: "id", val: "EventName"}],"header")
    document.getElementById("EventName").innerHTML = r.all.teamName
    createHTMLObject("h3", [{attr: "id", val: "event_date_title"}],"left1")
    document.getElementById("event_date_title").innerHTML = "Date: "
    createHTMLObject("h3", [{attr: "id", val: "event_date"}],"right1")
    document.getElementById("event_date").innerHTML = r.all.eventDate
    createHTMLObject("h3", [{attr: "id", val: "event_time_title"}],"left2")
    document.getElementById("event_time_title").innerHTML = "@"
    createHTMLObject("h3", [{attr: "id", val: "event_time"}],"right2")
    document.getElementById("event_time").innerHTML = r.all.eventTime
    createHTMLObject("h3", [{attr: "id", val: "event_place_title"}],"left3")
    document.getElementById("event_place_title").innerHTML = "Location: "
    createHTMLObject("h3", [{attr: "id", val: "event_place"}],"right3")
    document.getElementById("event_place").innerHTML = r.all.eventPlace
    createHTMLObject("h3", [{attr: "id", val: "price_title"}],"left4")
    document.getElementById("price_title").innerHTML = "Deposit: "
    createHTMLObject("h3", [{attr: "id", val: "price"}],"right4")
    document.getElementById("price").innerHTML = "£"+ price
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
