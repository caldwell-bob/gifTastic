var searchList = ["kayak", "canoe", "stand up paddleboard", "mtn bike", "hang glider"];

function displayButtons() {

    for (var i = 0; i < searchList.length; i++) {
      var myHobbiesDiv = $("<button>");
      myHobbiesDiv.addClass("btn btn-primary");
      myHobbiesDiv.text(searchList[i]);

      // var p = $("<p>").text(searchList[i]);
      // myHobbiesDiv.append(p); 
      
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

// console.log(searchList[2]);
// callGiphy(searchList[2]);

