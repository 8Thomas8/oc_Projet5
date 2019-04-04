//Tables with paths to json for FR and EN language.
var jsonsFR = ["./json/startFR.json", "./json/middleFR.json",
  "./json/endFR.json"
];
var jsonsEN = ["./json/startEN.json", "./json/middleEN.json",
  "./json/endEN.json"
];

//Define tables for each part of the quote
var starts = [];
var middles = [];
var ends = [];

//Define an object prototype for quote
var quote = {
  //function init
  init: function(start, middle, end) {
    this.start = start;
    this.middle = middle;
    this.end = end;
  },

  //function display
  display: function() {
    var iElt = document.createElement("li");
    iElt.textContent = this.start + this.middle + this.end;
    document.getElementById("quote").appendChild(iElt);
  }
};

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

//Create object, define attr and rend the quote(s)
function quoteRender(starts, middles, ends) {
  //Empty the list of quotes generated for new generation
  document.getElementById("quote").innerHTML = "";
  //Verification number is in interval [0, 5]
  if ((number >= 0) && (number <= 5)) {
    //Loop for generate multiple quote (number selected by user)
    for (var i = 0; i < number; i++) {
      //New instance of prototype quote
      var randomQuote = Object.create(quote);
      //Init method randomQuote with random data in tables starts/middles/ends
      randomQuote.init(starts[getRandomNumber(0, 2)], middles[getRandomNumber(0, 2)],
        ends[getRandomNumber(0, 2)]);
      //Display method for the object
      randomQuote.display();
    }
  }
}

//Use jsons table then call quoteRender function
//ajaxGet in ajaxGet in ajaxGet for filling tables & then calling quoteRender
function useJsonsTable(table) {
  ajaxGet(table[0], function(result) {
    starts = JSON.parse(result);
    ajaxGet(table[1], function(result) {
      middles = JSON.parse(result);
      ajaxGet(table[2], function(result) {
        ends = JSON.parse(result);
        quoteRender(starts, middles, ends);
      });
    });
  });
}

//Launch the generation, select jsons table then call useJsonsTable function
function startGeneration(number, lang) {
  //Verification lang value is EN or FR
  if ((lang === "FR") || (lang === "EN")) {
    //Select wich jsons table will be loaded
    switch (lang) {
      case "FR":
        useJsonsTable(jsonsFR);
        break;
      case "EN":
        useJsonsTable(jsonsEN);
    }
  } else {
    alert("La langue choisie n'est pas valide");
  }
  //Activate button2
  document.getElementById("button2").disabled = "";
}

//Reset the programm
function resetPgrm() {
  //Reset varibales
  number = 0;
  lang = 0;
  starts = [];
  middles = [];
  ends = [];
  //Empty #quote html
  document.getElementById("quote").innerHTML = "";
  //Disable button2
  document.getElementById("button2").disabled = "disabled";
}

//Reset selected index for #quoteNumber & #quoteLang
function resetSelectedIndex() {
  document.getElementById("quoteNumber").selectedIndex = 0; //Reini <select>
  document.getElementById("quoteLang").selectedIndex = 0; //Reini <select>
}

//Listen selected options for #quoteNumber & #quoteLang
document.getElementById("quoteNumber").addEventListener("change", function(e1) {
  number = e1.target.value;
});
document.getElementById("quoteLang").addEventListener("change", function(e2) {
  lang = e2.target.value;
});

//Event on button1 click
document.getElementById("button1").addEventListener("click", function() {
  //If #quoteNumber & #quoteLang seleced index are on 0
  //Show alert
  if ((document.getElementById("quoteNumber").selectedIndex === 0) ||
    (document.getElementById("quoteLang").selectedIndex === 0)) {
    alert("Choisissez un nombre de citation et une langue.");
  } else {
    //If not, call startGeneration & resetSelectedIndex
    startGeneration(number, lang);
    resetSelectedIndex();
  }
});

//Event on button2 click
document.getElementById("button2").addEventListener("click", function() {
  //Render quote without use jsons file because data are already in starts/...
  quoteRender(starts, middles, ends);
});

//Event on button3 click
document.getElementById("button3").addEventListener("click", function() {
  //Call resetPgrm in order to reset all data
  resetPgrm();
});

//Disable #button2 on page loading
document.getElementById("button2").disabled = "disabled";
