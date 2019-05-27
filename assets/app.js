$(document).ready(function() {
    //Firebase configuration
  var config = {
    apiKey: "AIzaSyDUJu2-XZ5ew3g_7ihkZG90A8mEOTXKtDQ",
    authDomain: "my-class-project-2aa89.firebaseapp.com",
    databaseURL: "https://my-class-project-2aa89.firebaseio.com",
    projectId: "my-class-project-2aa89",
    storageBucket: "my-class-project-2aa89.appspot.com",
    messagingSenderId: "300533475974",
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();


  //creating the on click event 
  $("#submitButton").on("click", function(event) {
    event.preventDefault();

    //getting the new train info
    var tname = $("#trainNameInput").val().trim();
    var tdestination = $("#destinationInput").val().trim();
    var tfirstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
    var tfrequency = $("#frequencyInput").val().trim();

    //temporary local object to hold train data
    var newTrain= {
        name: tname,
        destination: tdestination,
        firstTrain: tfirstTrain,
        frequency: tfrequency        
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    //push to firebase
    database.ref().push(newTrain);
        
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTrain);
      console.log(newTrain.frequency);

    alert("New Train added!");

      //clear the input form
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

    });

  //firebase event to add new train to database and adding to table
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //storing everything into variables
    var tname = childSnapshot.val().name;
    var tdestination = childSnapshot.val().destination;
    var tfirstTrain = childSnapshot.val().firstTrain;
    var tfrequency = childSnapshot.val().frequency;

    console.log(tname);
    console.log(tdestination);
    console.log(tfirstTrain);
    console.log(tfrequency);

    //format the time for the trains
    var firstTrainFormat = moment.unix(tfirstTrain).format("HH:mm");

    //calculate the next arrival
    var tnext; //moment.diff()

    //calculate the minutes away
    var tminutes;

    //create the new row
    var newTrainRow = $("<tr>").append(
      $("<td>").text(tname),
      $("<td>").text(tdestination),
      $("<td>").text(tfrequency),
      $("<td>").text(tnext),
      $("<td>").text(tminutes)
    );

    //append new row to the table
    $("#trainTable > tbody").append(newTrainRow);


  })


});