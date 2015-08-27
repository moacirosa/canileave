var util = require('util');
var hits = require('./hits');
var moment = require('moment');

/*


var content = [
      ['Input', 'Output', 'Duration', 'Interval'],
      ['08:30', '12:01', '03:31', '-'],
      ['13:00', '18:02', '05:02', '00:59'],
      ['08:30', '12:01', '03:31', '-'],
      ['13:00', '18:02', '05:02', '00:59'],
      ['08:30', '12:01', '03:31', '-'],
      ['lorem', 'ipsum', 'dolor', 'gutchen']
    ];


*/


function collectHits(hits, matchDay) {

	var filteredHits = [];

	hits.forEach(function (hit){

		var isSame = moment(hit.input).isSame(matchDay, 'day');

		if (isSame) {
			filteredHits.push(hit);
		}
	});

	return filteredHits
}

function parseHits(hits) {

	var flatHits = [
		['Input', 'Output', 'Duration', 'Interval']
	];

	hits.forEach(function (hit){

		var component = [
			moment(hit.input).format('hh:mm:ss'),
			moment(hit.output).format('hh:mm:ss')
		];


		component.push()
	});
}

var filtered = collectHits(hits, new Date('Thu Aug 20 2015 00:00:00 GMT-0300 (BRT)'));

console.log(filtered);