import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var listener = new window.keypress.Listener();

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

Template.grid.events({
    'keypress input': function(e) { console.log('key', e); }
});

listener.simple_combo("q", function() {
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
