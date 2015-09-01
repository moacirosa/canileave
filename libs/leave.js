var util = require('util');
var hits = require('./hits');
var moment = require('moment');
var duration = require('moment-duration-format');
var _ = require('lodash');

/**
 * @todo Might only receive hits from another module not fetch them
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

    /**
     * @todo Implement interval
     * @todo Add option to return flat data (or a presenter)
     */
    hits.forEach(function (hit){

      var input = moment(hit.input),
        output = moment(hit.output);

      var outputReferer = output.isValid() ? output : moment();

      var diff = outputReferer.diff(input, 'minutes');
      
      var interval = '-';

      var component = [
        input.format('HH:mm'),
        output.isValid() ? output.format('HH:mm') : null,
        diff.toString(),
        interval
      ];

      flatHits.push(component);
    });

    return flatHits;
  },

  /**
   * @todo Missing test
   */
  arePairsIncomplete: function (flatHits) {

    var outputs = _.pluck(flatHits, 1);

    return _.some(outputs, null);
  },

  /**
   * @todo Ugly :p
   */
  isLastPairIncomplete: function (flatHits) {

    var lastHit = flatHits.pop();

    flatHits.push(lastHit);

    return lastHit[1] == null;
  },

  /**
   * @todo Add option to avoid headers
   */
  sumHitsDuration: function (flatHits) {

    var durations = _.pluck(flatHits, 2);

    return _.sum(durations);
  },

  fillLastOpenHitPair: function (flatHits) {

    if (!this.isLastPairIncomplete(flatHits)) {
      return flatHits;
    }

    var lastLine = flatHits.pop();

    lastLine[1] = moment().format('HH:mm');

    flatHits.push(lastLine);

    return flatHits;
  },

  formatDuration: function (minutes) {

    return moment.duration(minutes, 'minutes')
      .format('HH:mm', { trim: false });
  }
};

module.exports = leave;