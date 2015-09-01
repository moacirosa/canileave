var moment = require('moment');
var leave = require('../leave');
var hits = require('../hits');
var util = require('util');
var _ = require('lodash');

var dayBoxBuilder = {

  blessed: null,
  parentBox: null,
  referenceDay: null,
  today: null,
  yesterday: null,

  decorate: function (blessed) {

    this.blessed = blessed;

    return this;
  },
  
  widget: function (day, boxTop) {

    this.referenceDay = moment(day);
    this.today = moment();
    this.yesterday = moment().subtract(1, 'day');

    this.parentBox = this.blessed.box({
      top: boxTop,
      left: 'left+1',
      width: '40%',
      height: 'shrink'
    });

    var hitsInDay = leave.collectHits(hits, this.referenceDay);
    var flatHits = leave.parseHits(hitsInDay);

    this.label()
      .table(flatHits)
      .sum(flatHits);

    return this.parentBox;
  },

  label: function () {

    var labelText = this.referenceDay.toNow(false);

    var labelBox = this.blessed.box({
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

    return this;
  },

  table: function (flatHits) {

    //var hitsInDay = leave.collectHits(hits, this.referenceDay);
    //var content = leave.parseHits(hitsInDay);

    var table = this.blessed.listtable({
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
      data: flatHits
    });

    return this;
  },

  sum: function (flatHits) {

    var sumBox = this.blessed.box({
      parent: this.parentBox,
      content: '{green-fg}{bold}00:00{/bold}{/green-fg} hours worked today',
      height: 1,
      left: 1,
      bottom: -1,
      width: 'shrink',
      tags: true
    });

    //var hitsInDay = leave.collectHits(hits, this.referenceDay);
    //var flatHits = leave.parseHits(hitsInDay);

    var sum = leave.sumHitsDuration(flatHits);
    var duration = leave.formatDuration(sum);

    var freshContent = util.format(
      '{green-fg}{bold}%s{/bold}{/green-fg} hours worked today', 
      duration
    );

    sumBox.setContent(freshContent);

    if (leave.isLastPairIncomplete(flatHits)) {      
      this.sumAddListener(sumBox, flatHits);
    }

    return this;
  },

  /**
   * @todo Improve... Code duplicated
   */
  sumAddListener: function (sumBox, flatHits) {

    var flatHitsFilled = leave.fillLastOpenHitPair(flatHits);

    var sum = leave.sumHitsDuration(flatHitsFilled);
    var duration = leave.formatDuration(sum);

    var freshContent = util.format(
      '{green-fg}{bold}%s{/bold}{/green-fg} hours worked today', 
      duration
    );

    sumBox.setContent(freshContent);

    return this;
  }
};

module.exports = dayBoxBuilder;