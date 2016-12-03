import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var listener = new window.keypress.Listener();
var score1 = 0, score2 = 0;
var colors = ["#ffb3ba", "#d9b3ff", "#ffbaba", "#baffc9", "#b3bded"];
var titleCount = 0;
var rightButtons = [];
var leftButtons = [];

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.start.events({
  'click button'() {
    startgame();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
Template.title.onCreated(function titleOnCreated(){
  setInterval(function(){ document.getElementById("title").style.color = colors[titleCount]; titleCount++; if(titleCount >=5){ titleCount=0;} }, 500);
});
Template.grid.events({
  'keypress input': function(e) { console.log('key', e); }
});

listener.simple_combo("q", function() {
  gameLoop();
  scorePlus(1);
  console.log("q");
});
listener.simple_combo("w", function() {
  console.log("w");
});
listener.simple_combo("e", function() {
  console.log("e");
});
listener.simple_combo("a", function() {
  console.log("a");
});
listener.simple_combo("s", function() {
  console.log("s");
});
listener.simple_combo("d", function() {
  console.log("d");
});
listener.simple_combo("z", function() {
  console.log("z");
});
listener.simple_combo("x", function() {
  console.log("x");
});
listener.simple_combo("c", function() {
  console.log("c");
});
listener.simple_combo("t", function() {
  scorePlus(2);
  console.log("t");
});

function startgame(){
  score1 = 0;
  score2 = 0;
  initButtons(rightButtons);
  initButtons(leftButtons);
  console.log(rightButtons);
  console.log(leftButtons);
  document.getElementById("score2").innerHTML = score2;
  document.getElementById("score1").innerHTML = score1;
  for(var i=0; i<=8; i++){
    document.getElementById(i).style.backgroundColor = "#3e3e3e";
    document.getElementById(i+9).style.backgroundColor = "#3e3e3e";
  }
}

function scorePlus(player){
  if(player == 1){
    score1++;
    document.getElementById("score1").innerHTML = score1;
  }else{
    score2++;
    document.getElementById("score2").innerHTML = score2;
  }
}

function colorPicker(){
  var num = Math.floor((Math.random() * colors.length));
  return colors[num];
}

function initButtons(buttons){
  for(var i = 0; i <=8; i++){
    buttons[i] = i;
  }
  console.log(buttons);
}

function buttonPick(buttons, player){
  var rand = Math.floor(Math.random() * buttons.length);
  console.log("player " +player+ " random number is " +rand);
  // var randIndex = buttons[rand];

  console.log("array before splice");
  console.log(buttons);
  num = buttons.splice(rand, 1) -1 + 1;
  console.log("array after splice");
  console.log(buttons);
  console.log("num removed is " + num);
  if(player == 1){
    document.getElementById(num).style.backgroundColor = colorPicker();
  }else{
    document.getElementById(num+9).style.backgroundColor = colorPicker();
  }
  //button goes up and stays up
  //cant be picked again since it's removed from the array
}

function buttonOff(buttons, numButton){
  // on button press when button is not in array
  if(buttons.indexOf(numButton) == -1) {
    buttons.push(numButton);
  }
  else {
      // button already off
    }
    console.log(buttons);
  }

  function gameLoop(){
    buttonPick(rightButtons, 2);
    buttonPick(leftButtons, 1);
  }
