var headerBoxBuilder = {

  build: function (blessed) {

    var headerBox = blessed.box({
      top: 0,
      left: 'left',
      width: '100%',
      height: 'shrink'
    });

    var topRuller = blessed.line({
      parent: headerBox,
      top: 0,
      type: 'bg',
      ch: '-',
      orientation: 'horizontal',
      width: '99%',
      left: 'center'
    });

    var title = blessed.box({
      parent: headerBox,
      top: 1,
      left: 2,
      content: 'Can I Leave?',
      width: 'shrink'
    });

    var currentDateBox = blessed.box({
      parent: headerBox,
      top: 1,
      right: 2,
      content: 'Wed Aug 26 2015 18:19:24 GMT-0300 (BRT)',
      width: 'shrink'
    });

    var bottomRuller = blessed.line({
      parent: headerBox,
      top: 2,
      type: 'bg',
      ch: '-',
      orientation: 'horizontal',
      width: '99%',
      left: 'center'
    });

    return headerBox;
  }
};

module.exports = headerBoxBuilder;
