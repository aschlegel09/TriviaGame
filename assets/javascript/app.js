// // You'll create a trivia form with multiple choice or true/false options (your choice).

// The player will have a limited amount of time to finish the quiz.

// The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

// Don't let the player pick more than one answer per question.
// // Don't forget to include a countdown timer.
//  Variable that will hold the button timer when it is clicked.
var buttonStart;

window.onload = function() {
  //  Start on click.
  $("#reset").on("click", stopwatch.reset);
  $("#start").on("click", stopwatch.start);
};
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

var stopwatch = {
  time: 0,
  reset: function() {
    stopwatch.time = 0;
    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:00");
    clearInterval(intervalId);
    clockRunning = false;
  },
  start: function() {
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },
  count: function() {
    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time++;
    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },

  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

//   $("#start").on("click", function() {
//     //  Set the button log to run one second after the function's called.
//     buttonStart = setTimeout(function() {
//       console.log("The Start Button Works!!!");
//     }, 1000);
//   });
// };
