var blessed = require('blessed');
var moment = require('moment');
var header = require('./libs/widget/header');
// var week = require('./libs/partials/week');

var day = require('./libs/widget/day');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Can I Leave?';

screen.append(header.build(blessed, screen));

var today = moment('2015-08-28 00:00:00'); // not REALLY today here yet
var yesterday = today.clone().subtract(1, 'day');

var todayWidget = day.decorate(blessed).widget(today, 4);
var yesterdayWidget = day.decorate(blessed).widget(yesterday, 18);

screen.append(todayWidget);
screen.append(yesterdayWidget);

/**
 * Comment week section til I really have an implementation
 * screen.append(week.build(blessed, screen));
 */

screen.key(['escape', 'q'], function (ch, key){
  return process.exit(0);
});

function updateDateTime(screen) {
  screen.emit('updateDateTime');
}

setInterval(updateDateTime, 500, screen);

screen.render();