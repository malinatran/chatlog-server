var assert = require('assert');
var EventSummaryHelper = require('../event_summary_helper');

describe('EventSummaryHelper', function() {
  
  describe('#getEventObjects()', function() {
    it('should return an object for each date in the range', function() {
      assert.deepEqual(EventSummaryHelper.getEventObjects(new Date('2015-01-16'), new Date('2015-01-17T23:59:59Z'), 'day'), {
        '2015-01-16T00:00:00.000Z': {
          enters: 0,
          leaves: 0,
          comments: 0,
          highfives: 0
        }, 
        '2015-01-17T00:00:00.000Z': {
          enters: 0,
          leaves: 0,
          comments: 0,
          highfives: 0
        }
      });
    });
  });

  describe('#summarizeEvents()', function() {
    it('should aggregate event information for each day', function() {
      var events = [
        {
          "user" : "Mom",
          "type" : "comment",
          "message" : "hello",
          "date" : "2016-01-14T15:10:00Z",
        },
        {
          "user" : "Gerard",
          "type" : "highfive",
          "otheruser" : "Andrew",
          "date" : "2016-01-12T01:00:00Z",
        },
        {
          "user" : "Kristina",
          "type" : "enter",
          "date" : "2016-01-13T01:00:00Z",
        },
        {
          "user" : "Christian",
          "type" : "enter",
          "date" : "2016-01-11T01:00:00Z",
        },
        {
          "user" : "Malina",
          "type" : "leave",
          "date" : "2016-01-12T11:00:00Z",
        }
      ];
      assert.deepEqual(EventSummaryHelper.summarizeEvents(events, new Date('2016-01-11'), new Date('2016-01-14T23:59:59Z'), 'day'), [
        { date: '2016-01-11T00:00:00.000Z', enters: 1, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-12T00:00:00.000Z', enters: 0, leaves: 1, comments: 0, highfives: 1 },
        { date: '2016-01-13T00:00:00.000Z', enters: 1, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T00:00:00.000Z', enters: 0, leaves: 0, comments: 1, highfives: 0 }
      ]);
    });
  });  

  describe('#summarizeEvents()', function() {
    it('should aggregate event information for each day', function() {
      var events = [
        {
          "user" : "Mom",
          "type" : "comment",
          "message" : "hello",
          "date" : "2016-01-14T15:10:00Z",
        },
        {
          "user" : "Gerard",
          "type" : "highfive",
          "otheruser" : "Andrew",
          "date" : "2016-01-12T01:00:00Z",
        },
        {
          "user" : "Kristina",
          "type" : "enter",
          "date" : "2016-01-13T01:00:00Z",
        },
        {
          "user" : "Christian",
          "type" : "enter",
          "date" : "2016-01-11T01:00:00Z",
        },
        {
          "user" : "Malina",
          "type" : "leave",
          "date" : "2016-01-12T11:00:00Z",
        }
      ];
      assert.deepEqual(EventSummaryHelper.summarizeEvents(events, new Date('2016-01-11'), new Date('2016-01-14T23:59:59Z'), 'day'), [
        { date: '2016-01-11T00:00:00.000Z', enters: 1, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-12T00:00:00.000Z', enters: 0, leaves: 1, comments: 0, highfives: 1 },
        { date: '2016-01-13T00:00:00.000Z', enters: 1, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T00:00:00.000Z', enters: 0, leaves: 0, comments: 1, highfives: 0 }
      ]);
    });

    it('should aggregate event information for each hour', function() {
      var events = [
        {
          "user" : "Mom",
          "type" : "comment",
          "message" : "hello",
          "date" : "2016-01-14T02:10:00Z",
        },
        {
          "user" : "Gerard",
          "type" : "highfive",
          "otheruser" : "Andrew",
          "date" : "2016-01-14T04:00:00Z",
        },
        {
          "user" : "Kristina",
          "type" : "enter",
          "date" : "2016-01-14T05:15:00Z",
        },
        {
          "user" : "Christian",
          "type" : "enter",
          "date" : "2016-01-14T05:20:00Z",
        },
        {
          "user" : "Malina",
          "type" : "leave",
          "date" : "2016-01-14T06:00:00Z",
        }
      ];
      assert.deepEqual(EventSummaryHelper.summarizeEvents(events, new Date('2016-01-14T02:00:00Z'), new Date('2016-01-14T06:59:59Z'), 'hour'), [
        { date: '2016-01-14T02:00:00.000Z', enters: 0, leaves: 0, comments: 1, highfives: 0 },
        { date: '2016-01-14T03:00:00.000Z', enters: 0, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T04:00:00.000Z', enters: 0, leaves: 0, comments: 0, highfives: 1 },
        { date: '2016-01-14T05:00:00.000Z', enters: 2, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T06:00:00.000Z', enters: 0, leaves: 1, comments: 0, highfives: 0 }
      ]);
    });

    it('should aggregate event information for each minute', function() {
      var events = [
        {
          "user" : "Mom",
          "type" : "comment",
          "message" : "hello",
          "date" : "2016-01-14T02:00:00Z",
        },
        {
          "user" : "Gerard",
          "type" : "highfive",
          "otheruser" : "Andrew",
          "date" : "2016-01-14T02:02:00Z",
        },
        {
          "user" : "Kristina",
          "type" : "enter",
          "date" : "2016-01-14T02:03:00Z",
        },
        {
          "user" : "Christian",
          "type" : "enter",
          "date" : "2016-01-14T02:04:00Z",
        },
        {
          "user" : "Malina",
          "type" : "leave",
          "date" : "2016-01-14T02:06:00Z",
        }
      ];
      assert.deepEqual(EventSummaryHelper.summarizeEvents(events, new Date('2016-01-14T02:00:00Z'), new Date('2016-01-14T02:06:59Z'), 'minute'), [
        { date: '2016-01-14T02:00:00.000Z', enters: 0, leaves: 0, comments: 1, highfives: 0 },
        { date: '2016-01-14T02:01:00.000Z', enters: 0, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T02:02:00.000Z', enters: 0, leaves: 0, comments: 0, highfives: 1 },
        { date: '2016-01-14T02:03:00.000Z', enters: 1, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T02:04:00.000Z', enters: 1, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T02:05:00.000Z', enters: 0, leaves: 0, comments: 0, highfives: 0 },
        { date: '2016-01-14T02:06:00.000Z', enters: 0, leaves: 1, comments: 0, highfives: 0 },
      ]);
    });
  });
});