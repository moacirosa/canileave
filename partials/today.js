var todayBoxBuilder = {

  build: function (blessed) {

    var todayBox = blessed.box({
      top: 4,
      left: 'left',
      width: '100%',
      height: 'shrink',
      //border: 'line'
    });

    var data = [
      ['Input', 'Output', 'Duration', 'Interval'],
      ['08:30', '12:01', '03:31', '-'],
      ['13:00', '18:02', '05:02', '00:59']
    ];

    var table = blessed.table({
      parent: todayBox,
      pad: 2,
      rows: data,
      style: {
        cell: {
          padding: 0
        },
        header: {
          style: {
            bold: 'white'
          }
        }
      },
      padding: 0
    });

    return todayBox;
  }
};

module.exports = todayBoxBuilder;
