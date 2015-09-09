#!/usr/bin/env node

var blessed = require('blessed');
var moment = require('moment');
var leave = require('./libs/leave');
var header = require('./libs/widget/header');
var csv = require('csv');
// var week = require('./libs/partials/week');
var fs = require('fs');

var day = require('./libs/widget/day');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Can I Leave?';

screen.append(header.build(blessed, screen));

var today = moment();
var yesterday = today.clone().subtract(1, 'day');


var fileContent = fs.readFileSync(process.argv[2]);

csv.parse(fileContent.toString(), function (err, output){
  console.log(output);
});

var hits = [];  // preparing to read data from csv

var hitsToday = leave.collectHits(hits, today);
var flatHitsToday = leave.parseHits(hitsToday);

var hitsYesterday = leave.collectHits(hits, yesterday);
var flatHitsYesterday = leave.parseHits(hitsYesterday);



var todayWidget = day.decorate(screen).widget(hitsToday, today, 4);
var yesterdayWidget = day.decorate(screen).widget(hitsYesterday, yesterday, 18);

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