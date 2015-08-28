var util = require('util');
var hits = require('./hits');
var moment = require('moment');
var duration = require('moment-duration-format');

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

var leave = {

	collectHits: function (hits, matchDay) {

		var filteredHits = [];

		hits.forEach(function (hit){

			var isSame = moment(hit.input).isSame(matchDay, 'day');

			if (isSame) {
				filteredHits.push(hit);
			}
		});

		return filteredHits;
	},

	parseHits: function (hits) {

		var flatHits = [
			['Input', 'Output', 'Duration', 'Interval']
		];

		hits.forEach(function (hit){

			var input = moment(hit.input),
				output = moment(hit.output);

			var outputReferer = output.isValid() ? output : moment();

			var diff = outputReferer.diff(input, 'minutes');

			var duration = moment.duration(diff, 'minutes')
								 .format('HH:mm', { trim: false });
			
			var interval = '-';

			var component = [
				input.format('HH:mm'),
				output.isValid() ? output.format('HH:mm') : '-',
				duration,
				interval
			];

			flatHits.push(component);
		});

		return flatHits;
	},

	sumHitsDuration: function (flatHits) {

		var content = [
	      ['Input', 'Output', 'Duration', 'Interval'],
	      ['08:30', '12:01', '03:31', '-'],
	      ['13:00', '18:02', '05:02', '00:59'],
	      ['08:30', '12:01', '03:31', '-'],
	      ['13:00', '18:02', '05:02', '00:59'],
	      ['08:30', '12:01', '03:31', '-'],
	      ['lorem', 'ipsum', 'dolor', 'gutchen']
	    ];

		var sumDuration = 0;

		/*
		flatHits.forEach(funtion (flatHit){


		});
		*/
	}
};

module.exports = leave;