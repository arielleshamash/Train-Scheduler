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

    //first train pushed 1 year so its before current time
    var firstTime = moment(tfirstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTime);

    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //time apart
    var remainder = diffTime % tfrequency;
    console.log(remainder);

    //calculate the minutes away
    var tminutes = tfrequency - remainder;
    console.log("MINUTES TILL TRAIN: " + tminutes);
    
    //calculate the next arrival
    var tnext = moment().add(tminutes, "minutes");
    console.log("ARRIVAL TIME: " + moment(tnext).format("HH:mm"));
    var formattedTime = moment(tnext).format("HH:mm");

    

    //create the new row
    var newTrainRow = $("<tr>").append(
      $("<td>").text(tname),
      $("<td>").text(tdestination),
      $("<td>").text(tfrequency),
      $("<td>").text(formattedTime),
      $("<td>").text(tminutes)
    );

    //append new row to the table
    $("#trainTable > tbody").append(newTrainRow);


  })


});