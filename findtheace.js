(function() {

window.onload = function() {

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

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

var viewmodel = function() {
  this.cards = ko.observableArray(["A", "K", "Q"]);
  this.playing = ko.observable(true);
  this.score = ko.observable(10);
  this.gameOver = ko.observable(false);
  
  this.start = function(){
    this.playing(false);
    this.cards(shuffle(this.cards()));
  };
  
  this.restart = function(){
    this.playing(true);
    this.score(10);
    this.gameOver(false);
  };
  
  this.choose = function(data){
    this.playing(true);
    if (data === "A"){
     this.score(this.score() + 1); 
    }
    else{
      this.score(this.score() - 1);
      if(this.score() === 0){
         this.gameOver(true); 
      }
    }
  };
  
};

ko.applyBindings(new viewmodel());

};

}).call(this);
