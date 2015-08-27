var boxBuilder = {

  build: function (blessed) {

    var box = blessed.box({
      top: 18,
      left: 'left+1',
      width: '40%',
      height: 'shrink',
      //border: 'line'
    });

    var label = blessed.box({
      parent: box,
      content: 'YESTERDAY',
      height: 1,
      left: 1,
      style: {
        bold: true
      },
      width: 'shrink'
    });

    var content = [
      ['Input', 'Output', 'Duration', 'Interval'],
      ['08:30', '12:01', '03:31', '-'],
      ['13:00', '18:02', '05:02', '00:59'],
      ['08:30', '12:01', '03:31', '-'],
      ['13:00', '18:02', '05:02', '00:59'],
      ['08:30', '12:01', '03:31', '-'],
      ['lorem', 'ipsum', 'dolor', 'gutchen']
    ];

    var table = blessed.listtable({
      parent: box,
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

    var sumText = blessed.box({
      parent: box,
      content: '{green-fg}{bold}05:23{/bold}{/green-fg} hours worked yesterday',
      height: 1,
      left: 1,
      bottom: -1,
      width: 'shrink',
      tags: true
    });

    return box;
  }
};

module.exports = boxBuilder;
