var leftbuttons = [];
var rightbuttons =[];

function initButtons(buttons){
  for (var i = 8; i >= 0; i--) {
    buttons[i] = i;
  }
}


function buttonPick(buttons){
  var randIndex = buttons[Math.floor(Math.random() * buttons.length)];
  console.log("picking number")
  console.log(randIndex);
  buttons.splice(randIndex, 1);
  console.log(buttons);
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

  function test(buttons){
    initButtons(buttons);
    console.log(buttons);

  }
  test(leftbuttons);
