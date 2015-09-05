var moment = require('moment');
var leave = require('../leave');
var hits = require('../hits');
var util = require('util');
var _ = require('lodash');
var blessed = require('blessed');

var dayBoxBuilder = {

  screen: null,
  parentBox: null,
  referenceDay: null,
  today: null,
  yesterday: null,

  decorate: function (screen) {

    this.screen = screen;

    return this;
  },
  
  widget: function (day, boxTop) {

    this.referenceDay = moment(day);
    this.today = moment();
    this.yesterday = moment().subtract(1, 'day');

    this.parentBox = blessed.box({
      top: boxTop,
      left: 'left+1',
      width: '40%',
      height: 'shrink'
    });

    var hitsInDay = leave.collectHits(hits, this.referenceDay);
    var flatHits = leave.parseHits(hitsInDay);

    var label =  this.label();
    var table = this.table(flatHits);
    var sum = this.sum(flatHits);
    var self = this;

    if (leave.isLastPairIncomplete(flatHits)) {      

      this.screen.on('updateDateTime', function (){
        self.sumListener(flatHits, sum);
      });
    }

    return this.parentBox;
  },

  label: function () {

    var labelText = this.referenceDay.from(moment());

    var labelBox = blessed.box({
      parent: this.parentBox,
      content: labelText,
      height: 1,
      left: 1,
      style: {
        bold: true
      },
      width: 'shrink'
    });

    if (this.referenceDay.isSame(this.today, 'day')) {
      labelText = labelBox.setContent('TODAY');
    }

    if (this.referenceDay.isSame(this.yesterday, 'day')) {
      labelText = labelBox.setContent('YESTERDAY');
    }

    return labelBox;
  },

  table: function (flatHits) {

    var preparedHits = leave.presentHits(flatHits);

    var tableBox = blessed.listtable({
      parent: this.parentBox,
      top: 'top+1',
      left: 'left',
      width: '95%',
      height: 10,
      border: {
        type: 'line',
        left: true,
        top: true,
        right: true,
        bottom: true
      },
      align: 'center',
      tags: true,
      keys: false,
      vi: false,
      mouse: true,
      style: {
        header: {
          fg: 'blue',
          bold: true
        },
        cell: {
          fg: 'magenta',
          selected: {
            fg: 'white',
            bg: 'blue'
          }
        }
      },
      alwaysScroll: false,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      data: preparedHits
    });

    return tableBox;
  },

  sum: function (flatHits) {

    var sumBox = blessed.box({
      parent: this.parentBox,
      content: '{green-fg}{bold}00:00{/bold}{/green-fg} hours worked today',
      height: 1,
      left: 1,
      bottom: -1,
      width: 'shrink',
      tags: true
    });

    var duration = this.sumCalculate(flatHits);

    var freshContent = util.format(
      '{green-fg}{bold}%s{/bold}{/green-fg} hours worked', 
      duration
    );

    sumBox.setContent(freshContent);

    return sumBox;

  },

  sumCalculate: function (flatHits, raw) {

    var sum = leave.sumHitsDuration(flatHits);

    if (raw) {
      return sum;
    }

    var duration = leave.formatDuration(sum);

    return duration;
  },

  sumListener: function (flatHits, sumBox) {

    var entrance = _.last(flatHits).input;
    var accumulated = this.sumCalculate(flatHits, true);

    var seconds = moment().diff(entrance, 'seconds');

    var humanize = leave.formatDuration(seconds + accumulated);

    var freshContent = util.format(
      '{green-fg}{bold}%s{/bold}{/green-fg} hours worked', 
      humanize
    );

    sumBox.setContent(freshContent);
  }
};

module.exports = dayBoxBuilder;