//Table filled with path to json files
var jsons = ["./json/start.json", "./json/middle.json", "./json/end.json"];

//Get json data
function ajaxGet(url, callback) {
  //Define new instance of XMLHttpRequest
  var req = new XMLHttpRequest();
  //Open method with GET & url arguments
  req.open("GET", url);
  //Add event listener on load of the file
  req.addEventListener("load", function() {
    //If status rend a success, then call a callback function on data
    if (req.status >= 200 && req.status < 400) {
      callback(req.responseText);
    } else {
      //Else if status rend a fail, rend an error
      console.error(req.status + " " + req.statusText + " " + url);
    }
  });
  //Add event listener on error when the request can't get the json file
  req.addEventListener("error", function() {
    //Rend an error
    console.error("Erreur réseau avec l'URL " + url);
  });
  //Method send used to send the request
  req.send();
}

//Generate a random number between min to max.
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Make quote
function makeQuote(parsedJson) {
  //Select a random data on the table pardesJson
  part = parsedJson[getRandomNumber(0, 2)];
  //Build the quote by concatenation
  quote += part;
}

//Rend quote if the last json used, is the last json of the table jsons
function renderQuote(json) {
  if (json === jsons[jsons.length - 1]) {
    document.getElementById("quote").textContent = quote;
  }
}

//Use json data from each json file for making JS tables
//Then use each JS tables with makeQuote()
//And when each JS tables are used, call renderQuote()
function startGeneration(table) {
  //Empty the quote variable for new generation
  quote = "";
  //Retrieve json data for each json in the table
  table.forEach(function(json) {
    ajaxGet(json, function(result) {
      //Make a JS table with json data
      parsedJson = JSON.parse(result);
      //call makeQuote in order to build the quote
      makeQuote(parsedJson);
      //call renderQuote in order to rend the quote
      renderQuote(json);
    });
  });
}

//Event on button click
document.getElementById("button1").addEventListener("click", function() {
  //Call the function who start the quote generation
  startGeneration(jsons);
});
