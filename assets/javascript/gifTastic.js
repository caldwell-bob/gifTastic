var searchList = ["kayak", "canoe", "sup", "mtn bike", "hang glider"];

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
        giphyImg.attr("src", data[0].url);
        console.log(data[0].url);

       
        $("#giphyGifs").append(giphyImg);
      }
    
}

console.log(searchList[0]);
callGiphy(searchList[0]);

