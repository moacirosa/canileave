var blessed = require('blessed');
var header = require('./partials/header');
var today = require('./partials/today');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Can I Leave?';

screen.append(header.build(blessed));
screen.append(today.build(blessed));

screen.key(['escape'], function (ch, key){
  return process.exit(0);
});

screen.render();
