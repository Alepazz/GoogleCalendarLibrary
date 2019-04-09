//Funzione onSignIn
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    console.log("Sign-in successful"); 
  }

//API to authenticate myself to use Calendar -- same things that onSignIn function
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/calendar"})
        .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
};

/*
<!-- La riga commentata è un'alternativa funzionante, che prevede l'utilizzo del solo bottone 'authorize and load' per loggarsi, invece di
utilizzare il bottone 'g-signin2' messo a disposizione da Google per loggarsi ,e successivamente 'authorize and load' solo per autorizzare
l'accesso -->
<div class="container" style="padding: 20px">
    <div class="row">
        <div class="col-4">
         <!--<button onclick="authenticate().then(loadClient)" style="background-color: #bdc3c7">authorize and load</button>-->
           <button onclick="loadClient()" style="background-color: #bdc3c7">authorize and load</button>
           </div>
        <div class="col-4">
            <button onclick="createCalendarNameJSON(); executeCreate()" style="background-color: #bdc3c7">Create new Calendar</button>
            <input type="text" name="" value="" id="createCalendarText" placeholder="inserisci qui il nome del calendario" size="40">
        </div>
        <div class="col-4">
          <button onclick="deleteCalendar()" style="background-color: #bdc3c7">Delete a Calendar</button>
          <input type="text" name="" value="" id="deleteCalendarText" placeholder="inserisci qui il nome del calendario" size="40">
        </div>
    </div>
</div> <!-- end div container input -->
*/