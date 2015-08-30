var assert = require('assert');
var leave = require('../libs/leave');

describe('leave', function (){

  describe('collectHits', function (){

    it('Should return first two entries only', function collectHitsTest(){

      var inputMock = [
        {
          input: new Date('2015-08-18 09:13'),
          output: new Date('2015-08-18 12:33')
        },
        {
          input: new Date('2015-08-18 14:00'),
          output: new Date('2015-08-18 19:08')
        },
        {
          input: new Date('2015-08-19 09:21'),
          output: null
        }
      ];

      var expected = [
        {
          input: new Date('2015-08-18 09:13'),
          output: new Date('2015-08-18 12:33')
        },
        {
          input: new Date('2015-08-18 14:00'),
          output: new Date('2015-08-18 19:08')
        }
      ];

      var result = leave.collectHits(
        inputMock,
        new Date('2015-08-18 00:00:00')
      );

      result.forEach(function (hit, i){
        assert.equal(
          expected[i].input.toString(), 
          hit.input.toString()
        );
      });

      assert.equal(2, result.length);
    });
  });

  describe('parseHits', function (){

    it('Should build an Array with required data', function parseHitsTest(){

      var inputMock = [
        {
          input: new Date('2015-08-18 09:13'),
          output: new Date('2015-08-18 12:33')
        },
        {
          input: new Date('2015-08-18 14:00'),
          output: new Date('2015-08-18 19:08')
        }
      ];

      assert.deepEqual(
        [
          ['Input', 'Output', 'Duration', 'Interval'],
          ['09:13', '12:33', 200, '-'],
          ['14:00', '19:08', 308, '-'],
        ],
        leave.parseHits(inputMock)
      );
    });
  });

  describe('sumHitsDuration', function (){

    it('Should sum all hits duration as int', function sumHitsDurationTest(){

      var inputMock = [
        ['Input', 'Output', 'Duration', 'Interval'],
        ['09:13', '12:33', 200, '-'],
        ['14:00', '19:08', 308, '-'],
      ];

      assert.equal(508, leave.sumHitsDuration(inputMock));
    });
  });

  describe('formatDuration', function (){

    it('Should return HH:mm format', function (){
      assert.equal(leave.formatDuration(120), '02:00');
      assert.equal(leave.formatDuration(1), '00:01');
      assert.equal(leave.formatDuration(60), '01:00');
    });
  });
});