var leave = require('../leave');
var hits = require('../hits');

var todayBoxBuilder = {

  build: function (blessed) {

    var todayBox = blessed.box({
      top: 4,
      left: 'left+1',
      width: '40%',
      height: 'shrink',
      //border: 'line'
    });

    var labelToday = blessed.box({
      parent: todayBox,
      content: 'TODAY',
      height: 1,
      left: 1,
      style: {
        bold: true
      },
      width: 'shrink'
    });

    var today = new Date();
    var todayHits = leave.collectHits(hits, today);

    var content = leave.parseHits(todayHits);

    var table = blessed.listtable({
      parent: todayBox,
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
            bg: 'blue'
          }
        }
      },
      data: content,
      alwaysScroll: true,
        scrollbar: {
          ch: ' ',
          inverse: true
        }
    });

    var sumToday = blessed.box({
      parent: todayBox,
      content: '{green-fg}{bold}00:00{/bold}{/green-fg} hours worked today',
      height: 1,
      left: 1,
      bottom: -1,
      width: 'shrink',
      tags: true
    });

    return todayBox;
  }
};

module.exports = todayBoxBuilder;