var blessed = require('blessed');
var moment = require('moment');
var leave = require('../leave');
var hits = require('../hits');

var dayBoxBuilder = {

  build: function (day, boxTop) {

    var referenceDay = moment(day);
    var today = moment();
    var yesterday = moment().subtract(1, 'day');

    var dayBox = blessed.box({
      top: boxTop,
      left: 'left+1',
      width: '40%',
      height: 'shrink'
    });

    var labelText = referenceDay.toNow(false);

    if (referenceDay.isSame(today, 'day')) {
      labelText = labelBox.setContent('TODAY');
    }

    if (referenceDay.isSame(yesterday, 'day')) {
      labelText = labelBox.setContent('YESTERDAY');
    }

    var labelBox = blessed.box({
      parent: dayBox,
      content: labelText,
      height: 1,
      left: 1,
      style: {
        bold: true
      },
      width: 'shrink'
    });

    var hitsInDay = leave.collectHits(hits, referenceDay);
    var content = leave.parseHits(hitsInDay);

    var table = blessed.listtable({
      parent: dayBox,
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
      data: content
    });

    var sumToday = blessed.box({
      parent: dayBox,
      content: '{green-fg}{bold}00:00{/bold}{/green-fg} hours worked today',
      height: 1,
      left: 1,
      bottom: -1,
      width: 'shrink',
      tags: true
    });

    return dayBox;
  }
};

module.exports = dayBoxBuilder;