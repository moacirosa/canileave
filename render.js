var blessed = require('blessed');
var header = require('./partials/header');
var today = require('./partials/today');
var yesterday = require('./partials/yesterday');
var week = require('./partials/week');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Can I Leave?';

screen.append(header.build(blessed, screen));
screen.append(today.build(blessed, screen));
screen.append(yesterday.build(blessed, screen));
screen.append(week.build(blessed, screen));

screen.key(['escape'], function (ch, key){
  return process.exit(0);
});

function updateDateTime(screen) {
  screen.emit('updateDateTime');
}

setInterval(updateDateTime, 500, screen);

screen.render();