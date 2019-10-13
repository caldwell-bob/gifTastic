var searchList = ["kayak", "canoe", "stand up paddleboard", "mtn bike", "hang glider"];
var userClicked = "";

function displayButtons() {
    $("#displayArea").empty();
    $("#newHobby").empty(); // TODO Why isn't this clearing out the input field?
    emptyInput();

    for (var i = 0; i < searchList.length; i++) {
      var myHobbiesDiv = $("<button>");
      myHobbiesDiv.addClass("btn btn-primary");
      // myHobbiesDiv.addClass("dataId-" + i);

      $(myHobbiesDiv).attr( 'id', "hobby_" + i );
      // console.log(myHobbiesDiv);

      myHobbiesDiv.text(searchList[i]);
      $("#displayArea").prepend(myHobbiesDiv);


    }

}

function emptyInput(){
  var inputVar = $("#newHobby");
  inputVar.empty();
}

function callGiphy(searchWord) {
  var apiBase = "https://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "&api_key=9Hw25BnwKJXBMPa5oOn0PAMGvqWjDbiR";
  var apiLimit = "&limit=5";
  // var searchString = "kayak";
  var queryURL = apiBase + searchWord + apiLimit + apiKey;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //   console.log(response);
    var data = response.data;
    console.log(data.length);
    updateDisplay(data);
  });
}

function updateDisplay(data) {
    console.log(data);
    for (var i = 0; i < searchList.length; i++) {
        console.log(i);
        var giphyImg = $("<img>");
        giphyImg.attr("src", data[i].images.fixed_height.url);
        console.log(data[0].url);
        $("#giphyGifs").append(giphyImg);
      }  
}

function addHobbyEventListener(){
  $("#addHobby").on("click", function(event) {
    event.preventDefault();
    var newHobby = $("#newHobby").val().trim();
    console.log(newHobby);
    // TODO add a check to ensure newHooby not in searchList
    searchList.push(newHobby)
    $("#displayArea").text(newHobby);
    displayButtons();
    addBtnPrimaryEventListen();
  })
}

function addBtnPrimaryEventListen() {
  $(".btn-primary").on("click", function(event) {
    // TODO why does this no longer seem to work after adding new button?
    console.log("done been clicked");
    var clickedId = this.id;
    var slicePoint = 0;
    var stringLength = clickedId.length;
    // TODO Test to ensure how this handles once we get into dbl digits
    console.log(clickedId);
    for (var i = 0; i < clickedId.length; i ++) {
      if (clickedId[i] === "_") {
        slicePoint = i;
      }
    }
    var res = clickedId.slice(slicePoint + 1, stringLength);
    console.log(searchList[res]);
    callGiphy(searchList[res]);
  });

}


displayButtons();
addHobbyEventListener();
addBtnPrimaryEventListen();

