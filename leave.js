var util = require('util');
var hits = require('./hits');

var sumSeconds = 0;
var miliSecondsByDay = 8 * 60 * 60 * 1000;

var pair = null;

for (i = 0; i < hits.length; i++) {

	pair = hits[i];

	if (pair.output != null) {
		sumSeconds += pair.output - pair.input;
	}

	logPair(pair);
}

var targetTime = (miliSecondsByDay - sumSeconds) + pair.input.getTime();
var targetDate = new Date(targetTime);

function logPair(pair) {

	var output = pair.output ? pair.output : new Date();
	var template = '[%s] %s ~ %s\n';

	if (!pair.output) {
		template = '[%s] %s\n';
	}

	var time = formatTime((output - pair.input)/1000);
	var output = util.format(template, time, pair.input, pair.output);

	process.stdout.write(output);
}

function logMissingTime(targetDate, now) {
	
	if (!now) {
		now = new Date();
	}

	var diff = (targetDate - now) / 1000;
	var time = formatTime(diff);

	process.stdout.cursorTo(0, hits.length - 1);
	process.stdout.clearLine();

	logPair(pair);

	process.stdout.cursorTo(0, hits.length);

	var output = util.format('[%s] Countdown to 08 hours...', time);

	process.stdout.cursorTo(0);
	process.stdout.clearLine();
	process.stdout.write(output);
}

function formatTime(seconds) {

	var hours = Math.floor(seconds / (60 * 60));
	var mod = seconds % (60 * 60);
	var minutes  = Math.floor(mod / 60);
	var seconds = mod % 60;

	var time = new Date();

	time.setHours(hours)
	time.setMinutes(minutes)
	time.setSeconds(seconds);

	return time.toLocaleTimeString();
}

setInterval(logMissingTime, 1000, targetDate);

/*

Mock Output

[03:00:00] Tue Aug 18 2015 09:13:00 GMT-0300 (BRT) ~ Tue Aug 18 2015 12:13:00 GMT-0300 (BRT)
[04:27:42] Tue Aug 18 2015 13:13:00 GMT-0300 (BRT)
[00:22:41] Missing...

# Add target time in some place

@colors are welcome
@stdin is welcome as well
@momentjs is really welcome
@lodash to filter by day
@an alert in Ubuntu buss would be great

*/