var blessed = require('blessed');
var header = require('./partials/header');
var today = require('./partials/today');
var yesterday = require('./partials/yesterday');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Can I Leave?';

screen.append(header.build(blessed));
screen.append(today.build(blessed));
screen.append(yesterday.build(blessed));

screen.key(['escape'], function (ch, key){
  return process.exit(0);
});

screen.render();
