//shortcut modules
angular.module('nag.core', [
  'nag.core.defaults',
  'nag.core.helpers'
])
.value('noneAffectingTextKeys', (function() {
  var values, x;

  values = [];

  //enter, shift, ctrl, alt, pause/break, caps lock
  for(x = 16; x <= 20; x += 1) {
    values.push(x);
  }

  //page up, page down, end, home, left arrow, up arrow, down arrow, right arrow
  for(x = 33; x <= 40; x += 1) {
    values.push(x);
  }

  //function keys
  for(x = 112; x <= 123; x += 1) {
    values.push(x);
  }

  //insert
  values.push(45);

  //delete
  values.push(46);

  //enter
  values.push(13);

  //tab
  values.push(9);

  //left window key
  values.push(91);

  //right window key
  values.push(92);

  //select key
  values.push(93);

  //num lock
  values.push(145);

  //scroll lock
  values.push(146);

  return values;
}()));
