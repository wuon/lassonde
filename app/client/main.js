import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var listener = new window.keypress.Listener();
var score1 = 0, score2 = 0;
var colors = ["#ffb3ba", "#d9b3ff", "#ffbaba", "#baffc9", "#b3bded"];
var titleCount = 0;
var rightButtons = [];
var leftButtons = [];
var gameSpeed;
var speed;
var speedCounter;

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.winner.onCreated(function winnerOnCreated() {
  window.onload = function() {
    document.getElementById("winner").style.opacity = "0";
    document.getElementById("winnerText").style.opacity = "0";
  };
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
  buttonOff(leftButtons, 0, 1);
});
listener.simple_combo("w", function() {
  buttonOff(leftButtons, 1, 1);
});
listener.simple_combo("e", function() {
  buttonOff(leftButtons, 2, 1);
});
listener.simple_combo("a", function() {
  buttonOff(leftButtons, 3, 1);
});
listener.simple_combo("s", function() {
  buttonOff(leftButtons, 4, 1);
});
listener.simple_combo("d", function() {
  buttonOff(leftButtons, 5, 1);
});
listener.simple_combo("z", function() {
  buttonOff(leftButtons, 6, 1);
});
listener.simple_combo("x", function() {
  buttonOff(leftButtons, 7, 1);
});
listener.simple_combo("c", function() {
  buttonOff(leftButtons, 8, 1);
});
listener.simple_combo("t", function() {
  buttonOff(rightButtons, 0, 2);
});
listener.simple_combo("y", function() {
  buttonOff(rightButtons, 1, 2);
});
listener.simple_combo("u", function() {
  buttonOff(rightButtons, 2, 2);
});
listener.simple_combo("g", function() {
  buttonOff(rightButtons, 3, 2);
});
listener.simple_combo("h", function() {
  buttonOff(rightButtons, 4, 2);
});
listener.simple_combo("j", function() {
  buttonOff(rightButtons, 5, 2);
});
listener.simple_combo("b", function() {
  buttonOff(rightButtons, 6, 2);
});
listener.simple_combo("n", function() {
  buttonOff(rightButtons, 7, 2);
});
listener.simple_combo("m", function() {
  buttonOff(rightButtons, 8, 2);
});

function startgame(){
  score1 = 0;
  score2 = 0;
  speed = 700;
  speedCounter = 0;
  initButtons(rightButtons);
  initButtons(leftButtons);
  console.log(rightButtons);
  console.log(leftButtons);
  document.getElementById("winner").style.opacity = "0";
  document.getElementById("winnerText").style.opacity = "0";
  document.getElementById("score2").innerHTML = score2;
  document.getElementById("score1").innerHTML = score1;
  for(var i=0; i<=8; i++){
    document.getElementById(i).style.backgroundColor = "#3e3e3e";
    document.getElementById(i+9).style.backgroundColor = "#3e3e3e";
  }
  clearInterval(gameSpeed);
  gameSpeed = setInterval(function(){ gameLoop()}, speed);
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
}

function buttonPick(buttons, player){
  var rand = Math.floor(Math.random() * buttons.length);
  num = buttons.splice(rand, 1) -1 + 1;
  if(player == 1){
    document.getElementById(num).style.backgroundColor = colorPicker();
  }else{
    document.getElementById(num+9).style.backgroundColor = colorPicker();
  }
  //button goes up and stays up
  //cant be picked again since it's removed from the array
}

function buttonOff(buttons, numButton, player){
  // on button press when button is not in array
  if(buttons.indexOf(numButton) == -1) {
    scorePlus(player);
    buttons.push(numButton);
  }
  else {
    // button already off
  }
  if(player == 1){
    document.getElementById(numButton).style.backgroundColor =  "#3e3e3e";
  }else{
    document.getElementById(numButton+9).style.backgroundColor =  "#3e3e3e";
  }
  console.log(buttons);
}

  function gameLoop(){
    buttonPick(rightButtons, 2);
    buttonPick(leftButtons, 1);
    if(rightButtons.length == 0 || leftButtons.length == 0) {
      clearInterval(gameSpeed);
      outcome();
    }
    speedCounter++;
    if(speedCounter == 5){
      speedCounter = 0;
      speed -= 25;
      clearInterval(gameSpeed);
      gameSpeed = setInterval(function(){ gameLoop()}, speed);
    }
  }

  function outcome(){
    if (rightButtons.length == 0){
      document.getElementById("winnerText").innerHTML = ">";
    }else{
      document.getElementById("winnerText").innerHTML = "<";
    }
    document.getElementById("winner").style.opacity = "1";
    document.getElementById("winnerText").style.opacity = "1";
  }
