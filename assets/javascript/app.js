$(document).ready(function() {
  // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
  var game = {
    questions: [
      {
        question:
          "The distance between the furthest point in America and the furthest point in Russia is only",
        possibles: [
          "9 miles",
          "11 miles",
          "251 miles",
          "300 miles",
          "1100 miles"
        ],
        id: "q1",
        answer: 1
      },
      {
        question: "Sofia is the Capital of which country?",
        possibles: ["Bulgaria", "Belarus", "Romania", "Macedonia", "Hungary"],
        id: "q2",
        answer: 0
      },
      {
        question: "Which Countries share a boarder with Switzerland?",
        possibles: [
          "France, Luxembourg, Belgium, Germany",
          "France, Germany, Spain, Italy",
          "France, Italy, Germany, Austria",
          "Italy, Germany, Luxembourg, Belgium"
        ],
        id: "q3",
        answer: 2
      },
      {
        question:
          "What US State's unofficial fish is a trigger fish known locally as Humuhumunukunukuapua'a",
        possibles: ["Michigan", "Arizona", "California", "Hawaii", "Louisiana"],
        id: "q4",
        answer: 3
      },
      {
        question: "In what country is Java an island?",
        possibles: [
          "Phillipines",
          "The Maldives",
          "Indonesia",
          "New Zealand",
          "Turks & Caicos"
        ],
        id: "q5",
        answer: 2
      },
      {
        question:
          "Saaremaa, which lies in the Baltic Sea, is the largest island belonging to which country?",
        possibles: ["Norway", "Lithuania", "Estonia", "Finland", "Latvia"],
        id: "q6",
        answer: 2
      },
      {
        question:
          "Including those sitting on borders, eight of the ten tallest mountains in the world are found in what country?",
        possibles: ["Tibet", "Chile", "India", "Nepal"],
        id: "q7",
        answer: 3
      },
      {
        question:
          "Which two boroughs of NYC are connected by the Verrazano-Narrows Bridge?",
        possibles: [
          "Staten Island and Brooklyn",
          "Brooklyn and Bronx",
          "Bronx and Staten Island",
          "Staten Island and Manhattan"
        ],
        id: "q8",
        answer: 0
      },
      {
        question:
          "In Which modern-day country were the fabled Hanging Gardens of Babylon said to be located?",
        possibles: ["Iran", "Iraq", "Syria", "Turkey", "Israel"],
        id: "q9",
        answer: 1
      },
      {
        question:
          "Where in the world would you find the Capybara, the planet's largest living rodent?",
        possibles: [
          "Africa",
          "North America",
          "South America",
          "Asia",
          "Central America"
        ],
        id: "q10",
        answer: 2
      }
    ]
  };

  window.onload = function() {
    //  Start on click.
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
  };

  // The stop function
  function stop() {
    // Clears our "intervalId" interval. The interval name is passed to the clearInterval function.
    clearInterval(intervalId);
  }

  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;

  var stopwatch = {
    time: 60,
    reset: function() {
      $("#questions").addClass("invisible");
      stopwatch.time = 60;
      // DONE: Change the "display" div to "01:00."
      $("#display").text("01:00");
      clearInterval(intervalId);
      clockRunning = false;
      location.reload();
    },
    start: function() {
      // TODO: questions don't appear on click once reset has been executed
      $("#questions").addClass("visible");
      // Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.decrement, 1000);
        clockRunning = true;
      }
    },
    decrement: function() {
      // DONE: decrement time by 1, remember we cant use "this" here.
      stopwatch.time--;
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);

      // Use the variable we just created to show the converted time in the "display" div.
      $("#display").text(converted);

      // TODO! The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.
      if (stopwatch.time === 0) {
        //   alert("Time's Up!");
        stop();
        $("#messageDiv").html("time up!");
        checkAnswers();
      }
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

  // function to tabulate the guesser results
  function checkAnswers() {
    // variables needed to hold results
    resultsHTML = "";
    var guessedAnswers = [];
    correct = 0;
    incorrect = 0;
    unAnswered = 0;

    // for loop iterates through each question and passes the questions at each index first into
    // the isCorrect function to see if they match the indices of correct answers, and if they do,
    // increments up the correct score
    for (var i = 0; i < game.questions.length; i++) {
      if (isCorrect(game.questions[i])) {
        correct++;
      } else {
        // then this statement runs the questions at each index through the checkAnswered function
        // to determine whether the user clicked an answer, or did not click an answer, so that
        // incorrect and unAnswered scores can be delineated from each other
        if (checkAnswered(game.questions[i])) {
          incorrect++;
        } else {
          unAnswered++;
        }
      }
    }
    // display the results of the function in the results div and use strings of text to relate the
    // results of the for loop with their corresponding values
    $(".results").html(
      "correct: " +
        correct +
        "<br>" +
        "incorrect: " +
        incorrect +
        "<br>" +
        "unanswered: " +
        unAnswered
    );
  }

  // this function dynamically creates the inputs needed for the form and relates them to the
  // items held within the game object
  function formTemplate(data) {
    // the first variable relates the form field for question with the data in the object for
    // each question so that the questions can be inputed into that form field
    var qString = "<form id='q1'>" + data.question + "<br><br>";
    // this variable to access the question object's possibles array needed to answer each question
    var possibles = data.possibles;
    // a for loop to go through the possibles array for each question to add the values of each possibles
    // array and using qString, add them as radio buttons to the question to which they are
    // associated
    for (var i = 0; i < possibles.length; i++) {
      var possible = possibles[i];
      console.log(possible);
      qString =
        qString +
        "<input type='radio' name='" +
        data.id +
        "' value=" +
        i +
        ">" +
        possible;
    }
    return qString + "</form><br><br>";
  }

  window.formTemplate = formTemplate;

  // this function takes the template created in the last function and by appending it,
  // allows it to be displayed on the page
  function buildQuestions() {
    var questionHTML = "";
    for (var i = 0; i < game.questions.length; i++) {
      questionHTML = questionHTML + formTemplate(game.questions[i]);
    }
    $("#questions").append(questionHTML);
  }

  // function that
  function isCorrect(question) {
    var answers = $("[name=" + question.id + "]");
    var correct = answers.eq(question.answer);
    var isChecked = correct.is(":checked");
    return isChecked;
  }
  $("#start").on("click", function() {
    // call the buildQuestions function
    buildQuestions();
  });
  // function to build the display of guesser results
  function resultsTemplate(question) {
    var htmlBlock = "<div>";
    htmlBlock = htmlBlock + question.question + ": " + isChecked;
    return htmlBlock + "</div>";
  }

  // function to tabulate the guesser results
  function checkAnswers() {
    // variables needed to hold results
    var resultsHTML = "";
    var guessedAnswers = [];
    var correct = 0;
    var incorrect = 0;
    var unAnswered = 0;

    // for loop iterates through each question and passes the questions at each index first into
    // the isCorrect function to see if they match the indices of correct answers, and if they do,
    // increments up the correct score
    for (var i = 0; i < game.questions.length; i++) {
      if (isCorrect(game.questions[i])) {
        correct++;
      } else {
        // then this statement runs the questions at each index through the checkAnswered function
        // to determine whether the user clicked an answer, or did not click an answer, so that
        // incorrect and unAnswered scores can be delineated from each other
        if (checkAnswered(game.questions[i])) {
          incorrect++;
        } else {
          unAnswered++;
        }
      }
    }
    // display the results of the function in the results div and use strings of text to relate the
    // results of the for loop with their corresponding values
    $(".results").html(
      "correct: " +
        correct +
        "<br>" +
        "incorrect: " +
        incorrect +
        "<br>" +
        "unanswered: " +
        unAnswered
    );
  }

  // this function checks whether the guesser actually checked an answer for each of the
  // questions
  function checkAnswered(question) {
    var anyAnswered = false;
    var answers = $("[name=" + question.id + "]");
    // the for loop creates a condition to check if the buttons were checked and and then sets
    // the anyAnswered variable to true if they were
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        anyAnswered = true;
      }
    }
    // then return the anyAnswered variable so it can be tabulated in the last function to distinguish
    // between incorrect answers and those answers that were not attempted
    return anyAnswered;
  }

  // create a function with an onclick event for the doneButton that both checks the Answers
  // and stops the clock when "done" button is pressed
  $("#doneButton").on("click", function() {
    checkAnswers();
    stop();
    $("#messageDiv").html("Game Over!");
    $(".form").addClass("invisible");
  });
});
