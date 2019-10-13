var searchList = ["kayak", "canoe", "stand up paddleboard", "mtn bike", "hang glider"];
var userClicked = "";

function displayButtons() {

    for (var i = 0; i < searchList.length; i++) {
      var myHobbiesDiv = $("<button>");
      myHobbiesDiv.addClass("btn btn-primary");
      // myHobbiesDiv.addClass("dataId-" + i);

      $(myHobbiesDiv).attr( 'id', "hobby_" + i );
      console.log(myHobbiesDiv);

      myHobbiesDiv.text(searchList[i]);
      $("#displayArea").prepend(myHobbiesDiv);


    }

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


displayButtons();

$(".btn-primary").on("click", function(event) {
  console.log("done been clicked");
  var clickedId = this.id;
  var slicePoint = 0;
  var stringLength = clickedId.length;

  
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




// console.log(searchList[2]);
// callGiphy(searchList[2]);

