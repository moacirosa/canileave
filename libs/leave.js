var _ = require('lodash');
var util = require('util');
var hits = require('./hits');
var moment = require('moment');
var sprintf = require('sprintf');

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

    var flatHits = [];

    /**
     * @todo Implement interval
     */
    hits.forEach(function (hit){

      var input = moment(hit.input),
          output = moment(hit.output),
          duration = null,
          interval = null;

      if (!output.isValid()) {
        output = null;
      }

      if (output) {
        duration = output.diff(input, 'seconds');
      }

      var component = {
        "input": input,
        "output": output,
        "duration": duration,
        "interval": interval
      }

      flatHits.push(component);
    });

    return flatHits;
  },

  presentHits: function (flatHits) {

    var preparedHits = [
      ['Input', 'Output', 'Duration', 'Interval']
    ];

    var self = this;

    flatHits.forEach(function (hit){

      var preparedComponent = [
        hit.input.format('HH:mm'),
        hit.output ? hit.output.format('HH:mm') : '-',
        hit.duration ? self.formatDuration(hit.duration) : '-',
        '-'
      ];

      preparedHits.push(preparedComponent);
    });

    return preparedHits;
  },

  /**
   * @todo Check if still useful and test it (flatHits has changed)
   */
  arePairsIncomplete: function (flatHits) {

    var outputs = _.pluck(flatHits, 1);

    return _.some(outputs, null);
  },

  isLastPairIncomplete: function (flatHits) {
    
    if (_.isEmpty(flatHits)) {
      return false;
    }

    return _.last(flatHits).output === null;
  },

  /**
   * @todo Add option to avoid headers
   */
  sumHitsDuration: function (flatHits) {

    var sum = _.sum(flatHits, function (hit){
      return hit.duration;
    });

    return sum;
  },

  formatDuration: function (seconds) {

    var length = moment.duration(seconds, 'seconds');

    var humanize = sprintf(
      '%02d:%02d:%02d', 
      length.days(),
      length.hours(),
      length.minutes(),
      length.seconds()
    );

    if (length.days() > 0) {
      
      var humanize = sprintf(
        '%02d day(s) %02d:%02d:%02d', 
        length.days(),
        length.hours(),
        length.minutes(),
        length.seconds()
      );      
    }

    return humanize;
  }
};

module.exports = leave;