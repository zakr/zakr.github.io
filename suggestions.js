//Much of the code thanks to http://shreyaschand.com/blog/2013/01/03/google-autocomplete-api/

var suggestCallBack; // global var for autocomplete jsonp
var picked = false; //variable to tell end of the game
var answer = ""; //SHHH don't tell!!

$(document).ready(function () {
  
    function showTrue(){
      for(var i = 1; i < 6; i++){
        var button = $('.answers button#ans' + i);
        if ( button.html() === answer ){
          button.css('border','5px solid green');
        }
      }
    }
  
    function reset(button){
      button.css('display','block').css('border','none').removeClass('btn-danger').removeClass('btn-success').addClass('btn-warning');
    }
  
    //Suggest Function used to get suggestions from Google
    function suggest(query) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                {
                  "hl":"en", // Language
                  "jsonp":"suggestCallBack", // jsonp callback function name
                  "q":query, // query term
                  "client":"firefox" // force youtube style response, i.e. jsonp
                }
            );
      
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({"value":val});
                });
              
                suggestions.length = 5; // prune suggestions list to only 5 items
                answer = suggestions[0].value; // set the answer for later
                picked = false;
                suggestions = shuffle(suggestions);

                for(var i = 1; i < 6; i++){
                  //Set the answer buttons
                  var button = $('.answers button#ans' + i);
                  reset(button);
                  button.html(suggestions[i-1].value).click(function(event){
                    if(!picked){
                      var button = $("#" + event.target.id);
                      button.removeClass('btn-warning');
                      //Correct!
                      console.log(button.html());
                      console.log(answer);
                      if(button.html() === answer){
                        button.addClass('btn-success');
                      }
                      //Not Correct...
                      else{
                        button.addClass('btn-danger');
                      }
                      showTrue();
                      picked = true;
                    }
                  });
                }
            };
        }
  
    //Shuffle (randomize) array function
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  
    //Clicking Go Button
    $('#go').click(function(){
      console.log($('#query').val());
      suggest($('#query').val());
    });
    
    //Handle Enter
    $('input#query').bind('keypress', function(e) {
      var code = e.keyCode || e.which;
       if(code == 13) { //Enter keycode
         suggest($('#query').val());
       }
    });
  
});
