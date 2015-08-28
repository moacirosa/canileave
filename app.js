var blessed = require('blessed');
var header = require('./libs/partials/header');
var today = require('./libs/partials/today');
var yesterday = require('./libs/partials/yesterday');
var week = require('./libs/partials/week');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Can I Leave?';

screen.append(header.build(blessed, screen));
screen.append(today.build(blessed, screen));
screen.append(yesterday.build(blessed, screen));
screen.append(week.build(blessed, screen));

screen.key(['escape', 'q'], function (ch, key){
  return process.exit(0);
});

function updateDateTime(screen) {
  screen.emit('updateDateTime');
}

setInterval(updateDateTime, 500, screen);

screen.render();