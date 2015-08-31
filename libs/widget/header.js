/**
 * @todo A label in header with yes/no green/red would be great
 */
var headerBoxBuilder = {

  build: function (blessed, screen) {

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

    var initialDateTime = new Date();

    var currentDateBox = blessed.box({
      parent: headerBox,
      top: 1,
      right: 2,
      content: initialDateTime.toString(),
      width: 'shrink'
    });

    screen.on('updateDateTime', function (event){

      var now = new Date();

      currentDateBox.setContent(now.toString());

      screen.render();
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
