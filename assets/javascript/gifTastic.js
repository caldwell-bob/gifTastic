var topics = [
  "sea kayaking",
  "white water kayaking",
  "scuba diving",
  "canoe",
  "stand up paddleboard",
  "mtn bike",
  "hang glider",
  "parachuting"
];
var userClicked = "";

function displayButtons() {
  $("#displayArea").empty();
  $("#newHobby").empty(); // TODO Why isn't this clearing out the input field?
  emptyInput();

  for (var i = 0; i < topics.length; i++) {
    var myHobbiesDiv = $("<button>");
    myHobbiesDiv.addClass("btn btn-primary");
    // myHobbiesDiv.addClass("dataId-" + i);

    $(myHobbiesDiv).attr("id", "hobby_" + i);
    // console.log(myHobbiesDiv);

    myHobbiesDiv.text(topics[i]);
    $("#displayArea").prepend(myHobbiesDiv);
  }
}

function emptyInput() {
  var inputVar = $("#newHobby");
  inputVar.empty();
}

function callGiphy(searchWord) {
  var apiBase = "https://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "&api_key=9Hw25BnwKJXBMPa5oOn0PAMGvqWjDbiR";
  var apiLimit = "&limit=10";
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
  for (var i = 0; i < data.length; i++) {
    console.log(i);
    var giphyWraper = $("<div>");
    var giphyImg = $("<img>");
    var giphyRating = $("<p>");
    var stillStateUrl = data[i].images.fixed_height_small_still.url;
    var animateStateUrl = data[i].images.fixed_height_small.url;
    var rating = data[i].rating;

    giphyRating.text("Rated: " + rating);
    console.log("Rating: " + rating);
    // giphyImg.attr("src", data[i].images.fixed_height.url);
    giphyImg.attr("src", stillStateUrl);
    giphyImg.attr("class", "gif");
    giphyImg.attr("data-state", "still");
    giphyImg.attr("data-still", stillStateUrl);
    giphyImg.attr("data-animate", animateStateUrl);
    giphyImg.append(giphyRating);

    giphyWraper.attr("class", "wrapper");
    giphyWraper.attr("<br>");
    giphyWraper.append(giphyRating);
    giphyWraper.append(giphyImg);
    console.log(giphyImg);
    $("#giphyGifs").prepend(giphyWraper);
  }
  addGifEventListner();
}

function addHobbyEventListener() {
  $("#addHobby").on("click", function(event) {
    event.preventDefault();
    var newHobby = $("#newHobby")
      .val()
      .trim();
    console.log(newHobby.length);
    // TODO add a check to ensure newHooby not in topics
    if (newHobby.length > 0) {
      topics.push(newHobby);
      $("#displayArea").text(newHobby);
      displayButtons();
      addBtnPrimaryEventListen();
    }
  });
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
    for (var i = 0; i < clickedId.length; i++) {
      if (clickedId[i] === "_") {
        slicePoint = i;
      }
    }
    var res = clickedId.slice(slicePoint + 1, stringLength);
    console.log(topics[res]);
    callGiphy(topics[res]);
  });
}

function addGifEventListner() {
  console.log("in addGifEventListener()");
  $(".gif").on("click", function() {
    console.log(".gif event listner is working");
    console.log(this);
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}

function main() {
  displayButtons();
  addHobbyEventListener();
  addBtnPrimaryEventListen();
}

main();
