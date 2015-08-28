var weekBoxBuilder = {

  build: function (blessed) {

    var box = blessed.box({
      top: 4,
      left: '40%+1',
      width: '60%',
      height: 'shrink',
      //border: 'line'
    });

    var label = blessed.box({
      parent: box,
      content: 'THIS WEEK',
      height: 1,
      left: 1,
      style: {
        bold: true
      },
      width: 'shrink'
    });

    var content = [
      ['Date', 'Input', 'Output', 'Duration', 'Interval'],
      ['2015-08-27', '08:30', '12:01', '03:31', '-'],
      ['2015-08-27', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-27', '08:30', '12:01', '03:31', '-'],
      ['2015-08-27', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-26', '08:30', '12:01', '03:31', '-'],
      ['2015-08-26', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-26', '08:30', '12:01', '03:31', '-'],
      ['2015-08-26', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-25', '08:30', '12:01', '03:31', '-'],
      ['2015-08-25', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-25', '08:30', '12:01', '03:31', '-'],
      ['2015-08-25', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-24', '08:30', '12:01', '03:31', '-'],
      ['2015-08-24', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-24', '08:30', '12:01', '03:31', '-'],
      ['2015-08-24', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-23', '08:30', '12:01', '03:31', '-'],
      ['2015-08-23', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-23', '08:30', '12:01', '03:31', '-'],
      ['2015-08-23', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-22', '08:30', '12:01', '03:31', '-'],
      ['2015-08-22', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-22', '08:30', '12:01', '03:31', '-'],
      ['2015-08-22', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-21', '08:30', '12:01', '03:31', '-'],
      ['2015-08-21', '13:00', '18:02', '05:02', '00:59'],
      ['2015-08-21', '08:30', '12:01', '03:31', '-'],
      ['2015-08-21', '13:00', '18:02', '05:02', '00:59']
    ];

    var table = blessed.listtable({
      parent: box,
      top: 'top+1',
      left: 'left',
      width: '95%',
      height: 24,
      border: {
        type: 'line',
        left: true,
        top: true,
        right: true,
        bottom: true
      },
      align: 'center',
      tags: true,
      keys: true,
      vi: true,
      mouse: true,
      search: true,
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

    /* blessed.list({
      parent: box,
      

      top: 'top+1',
      left: 'left',
      width: '95%',
      height: 24,


      align: 'left',
      mouse: true,
      label: ' WEEK REPORT ',
      border: 'line',
      style: {
        fg: 'magenta',
        bg: 'default',
        border: {
          fg: 'default',
          bg: 'default'
        },
        selected: {
          bg: 'blue'
        }
      },
      tags: true,
      invertSelected: false,
      items: [
        '{bold}2015-08-26{/bold}  {green-fg}08:12{/green-fg} - {red-fg}12:12{/red-fg}',
        '            {green-fg}13:00{/green-fg} - {red-fg}15:00{/red-fg}',
        '{bold}2015-08-25{/bold}  {green-fg}08:12{/green-fg} - {red-fg}12:12{/red-fg}',
        '            {green-fg}13:00{/green-fg} - {red-fg}15:00{/red-fg}',
        '{bold}2015-08-24{/bold}',
        '            {green-fg}08:12{/green-fg} - {red-fg}12:12{/red-fg}',
        '            {green-fg}13:00{/green-fg} - {red-fg}15:00{/red-fg}',
        '{bold}2015-08-23{/bold}',
        '            {green-fg}08:12{/green-fg} - {red-fg}12:12{/red-fg}',
        '            {green-fg}13:00{/green-fg} - {red-fg}15:00{/red-fg}'
      ],
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'blue'
        },
        style: {
          inverse: true
        }
      }
    });
*/

    var sum = blessed.box({
      parent: box,
      content: '{green-fg}{bold}40:23{/bold}{/green-fg} hours worked this week',
      height: 1,
      left: 1,
      bottom: -1,
      width: 'shrink',
      tags: true
    });

    return box;
  }
};

module.exports = weekBoxBuilder;
