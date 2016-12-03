import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var listener = new window.keypress.Listener();
var score1 = 0, score2 = 0;
var colors = ["#ffb3ba", "#d9b3ff", "#ffbaba", "#baffc9", "#b3bded"];
var titleCount = 0;

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
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
    document.getElementById("q").style.backgroundColor = colorPicker();
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
