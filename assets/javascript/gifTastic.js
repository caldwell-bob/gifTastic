var queryURL =
  "https://api.giphy.com/v1/gifs/search?q=kayaks&api_key=9Hw25BnwKJXBMPa5oOn0PAMGvqWjDbiR";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
//   console.log(response);
  var data = response.data;
//   console.log(data.length);
  for (i = 0; i < data.length; i ++) {
    console.log(data[i].id + " " + data[i].slug);
}
});

