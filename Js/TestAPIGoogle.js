
var calendario = new Object()
var calendarList //JSON containing all calendars

//Create a new JSON object, to next create the Google Calendar with name document.getElementByID("ID_INPUT_TEXT").value
function createCalendarNameJSON(){ 
    calendario.summary = document.getElementById("createCalendarText").value;
}

/* -------------------------- */

//API to sign in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("Sign-in successful"); 
}

//API to sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

/* -------------------------- */

/*window.onload = function() {
  loadClient();
};

function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/calendar"})
      .then(function() { console.log("Sign-in successful"); },
          function(err) { console.error("Error signing in", err); });
};

//API to load Client informations --> load all Client's calendar informations
function loadClient() {
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(function() { console.log("GAPI client loaded for API");},
            function(err) { console.error("Error loading GAPI client for API", err); });
};

//Funzione di autenticazione del mio utente, affinchè possa eseguire le API
/*gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "86585982831-9f7am38m3pqpqvm5vg0tf0l3jemstksp.apps.googleusercontent.com"});
});*/

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "86585982831-9f7am38m3pqpqvm5vg0tf0l3jemstksp.apps.googleusercontent.com"}).then(function(){
    gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(function() { console.log("GAPI client loaded for API");},
        function(err) { console.error("Error loading GAPI client for API", err); });
  });
});

/* -------------------------- */

//Use to create a new Google Calendar
function executeCreate() {

    return gapi.client.calendar.calendars.insert({
    "resource":
        JSON.stringify(calendario)
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                //console.log("Response", response); 
                console.log(response.result)
            },
            function(err) { console.error("Execute error", err); });
};

/* -------------------------- */

//List all Google Calendars
function deleteCalendar() {
return gapi.client.calendar.calendarList.list({})
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            //console.log("Response list", response.result);
            calendarList = response.result
            //console.log("Response execute List", calendarList)
            findCorrectCalendar()
          },
          function(err) { console.error("Execute error", err); });
}

//Search and give back the name & the id of the searched Google Calendars
function findCorrectCalendar(){
  
  console.log("Response list", calendarList)

  for (var i = 0; i < calendarList.items.length; i++){
      // look for the entry with a matching `summary` value
      if (calendarList.items[i].summary == document.getElementById("deleteCalendarText").value){
          // we found it
        // calendarList.items[i].id is the matched result
        var calendarToDelete = new Object() //simple JSON with this propery --> calendarId = "ID_OF_SPECIFIC_CALENDAR"
        calendarToDelete.calendarId = calendarList.items[i].id

        executeDelete(calendarToDelete);
        break;
      }//if
    }//for
}

//Delete a specific Google Calendar
function executeDelete(calendarToDelete) {
  return gapi.client.calendar.calendars.delete(
    //{"calendarId": "o98i1dsb4nqi3dhlohf2v3nqtg@group.calendar.google.com"}
    calendarToDelete
  )
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response delete", response);
            },
            function(err) { console.error("Execute error", err); });
}

/* -------------------------- */

//Funzione utile alla corretta formattazione della data (RFC 3339) https://validator.w3.org/feed/docs/error/InvalidRFC3339Date.html
//Timezone: http://time-time.net/times/time-zones/world-time-zones.php
function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
       + pad(d.getUTCMonth()+1)+'-'
       + pad(d.getUTCDate())+'T'
       + pad(d.getUTCHours())+':'
       + pad(d.getUTCMinutes())+':'
       + pad(d.getUTCSeconds())+'Z'
      };

//Qui è possibile trovare un esempio di costruzione dell'oggetto event: https://developers.google.com/calendar/v3/reference/events/insert#examples
//Parametri per l'oggetto event: https://developers.google.com/calendar/v3/reference/events
function createEventOnCalendar(){

  var dateStart = new Date(document.getElementById("datetimeStart").value)
  var dateEnd = new Date(document.getElementById("datetimeEnd").value)

  //creazione evento utile per restituire il corretto valore di ritorno
  var event = {
    'summary': document.getElementById("titleNewEvent").value,
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2019-04-05T09:00:00+02:00',
      'dateTime': ISODateString(dateStart)
    },
    'end': {
      'dateTime': '2019-04-05T11:00:00+02:00',
      'dateTime': ISODateString(dateEnd)
    },
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'}
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60}
      ]
    }
  };

return gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  }).then(function(){
    console.log("Evento creato con successo");
    dateStart = new Date(document.getElementById("datetimeStart").value)
    dateEnd = new Date(document.getElementById("datetimeEnd").value)
    console.log("Date start: " + ISODateString(dateStart))
    console.log("Date end: " + ISODateString(dateEnd))
  } )
};


//calendar id: orq5ki7e3g96rcduvgaao5okcc@group.calendar.google.com


function getCalendar() {
    return gapi.client.calendar.calendarList.get({
        "calendarId": "orq5ki7e3g96rcduvgaao5okcc@group.calendar.google.com"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

var listOfEvents;

function getEvents() {
    return gapi.client.calendar.events.list({
        "calendarId": "orq5ki7e3g96rcduvgaao5okcc@group.calendar.google.com",
        "timeMax": "2019-04-04T10:00:00+02:00",
        "timeMin": "2019-04-01T10:00:00+02:00"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
               console.log("Response", response.result.items[0].id);
               listOfEvents = response.result;
               console.log("Response events list", listOfEvents);
                deleteAll();
            },
            function(err) { console.error("Execute error", err); });
}

function deleteAll(){
    console.log("Length: " + listOfEvents.items.length);
    for(var i=0; i<listOfEvents.items.length;i++){
        var ev = listOfEvents.items[i];
        console.log(ev.summary);
        console.log(ev.id);
        deleteEvent(ev.id);
    }
}

function deleteEvent(param) {
    var eventToDelete = new Object();
    eventToDelete.calendarId = "orq5ki7e3g96rcduvgaao5okcc@group.calendar.google.com";
    eventToDelete.eventId = param;

    return gapi.client.calendar.events.delete(eventToDelete)
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);

            },
            function(err) { console.error("Execute error", err); });
}


//funzione chiamata alla pressione del bottone nel file html
function delete_events()
{
    var fromDate = new Date(2019,4,1,0,0,0);
    var toDate = new Date(2019,4,4,0,0,0);

    // delete from Jan 1 to end of Jan 4, 2013 (for month 0 = Jan, 1 = Feb...)

    var calendar = getCalendar();

    getEvents();

}