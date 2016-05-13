var assert = require('assert');
var validator = require('../validator');

describe('Validator', function() {
  describe('#validateDate()', function() {
    it('should return true if date is valid', function() {
      assert.equal(true, validator.validateDate('2016-01-20'));
    });

    it('should return true if a date with time is valid', function() {
      assert.equal(true, validator.validateDate('2016-01-20T21:15'));
    });

    it('should throw an error if a date is invalid', function() {
      assert.throws(function() {
        validator.validateDate('Mon');
      }, Error, 'Invalid date');
    });

    it('should throw an error if a date with time is invalid', function() {
      assert.throws(function() {
        validator.validateDate('2016-01-20T28:00');
      }, Error, 'Invalid date');
    });
  });

  describe('#validateEventType()', function() {
    it('should return true if type is valid', function() {
      assert.equal(true, validator.validateEventType('enter'));
      assert.equal(true, validator.validateEventType('leave'));
      assert.equal(true, validator.validateEventType('highfive'));
      assert.equal(true, validator.validateEventType('comment'));
    });

    it('should throw an error if type is invalid', function() {
      assert.throws(function() {
        validator.validateEventType('message');
      }, Error, 'Invalid event type');
    });
  });

  describe('#validateEvent()', function() {
    it('should throw an error if the date is invalid', function() {
      var event = {
        date: 'Mon',
        type: 'enter',
        user: 'Malina'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Invalid date');
    });

    it('should throw an error if the type is invalid', function() {
      var event = {
        date: '2016-01-20',
        type: 'message',
        user: 'Malina'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Invalid type');
    });

    it('should throw an error if user is invalid', function() {
      var event = {
        date: '2016-01-20',
        type: 'enter',
        user: ''
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Invalid user');
    });

    it('should throw an error if user does not exist', function() {
      var event = {
        date: '2016-01-20',
        type: 'enter'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Invalid user');
    });

    it('should throw an error if event type is highfive and there is no otheruser', function() {
      var event = {
        date: '2016-01-21',
        type: 'highfive',
        user: 'Malina'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Highfive must have otheruser');
    });

    it('should throw an error if event type is comment and there is no message', function() {
      var event = {
        date: '2016-01-21',
        type: 'comment',
        user: 'Malina'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Comment must have message');
    });

    it('should throw an error if there is otheruser with a non-highfive event type', function() {
      var event = {
        date: '2016-01-23',
        type: 'enter',
        otheruser: 'Diana',
        user: 'Malina'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Otheruser must have a highfive event type');
    });

    it('should throw an error if there is a message with a non-comment event type', function() {
      var event = {
        date: '2016-01-21',
        type: 'leave',
        message: 'hello',
        user: 'Malina'
      };
      assert.throws(function() {
        validator.validateEvent(event);
      }, Error, 'Message must have a comment event type');
    });

    it('should return true if event is valid', function() {
      var highfiveEvent = {
        date: '2016-01-10T12:50',
        type: 'highfive',
        otheruser: 'Adriana',
        user: 'Malina'
      };
      var commentEvent = {
        date: '2016-01-20',
        type: 'comment',
        message: 'Hello swirl',
        user: 'Malina'
      };
      var enterEvent = {
        date: '2016-01-15',
        type: 'enter',
        user: 'Malina'
      };
      var leaveEvent = {
        date: '2016-01-15',
        type: 'leave',
        user: 'Malina'
      };
      assert.equal(true, validator.validateEvent(highfiveEvent));
      assert.equal(true, validator.validateEvent(commentEvent));
      assert.equal(true, validator.validateEvent(enterEvent));
      assert.equal(true, validator.validateEvent(highfiveEvent));
    });
  });

  describe('#validateDateRange()', function() {
    it('should throw an error if end date precedes start date', function() {
      assert.throws(function() {
        validator.validateDateRange('2015-01-15', '2015-01-10');
      }, Error, 'Invalid date range');
    });
  });

  describe('#validateTimeframe()', function() {
    it('should return true if timeframe is valid', function() {
      assert.equal(true, validator.validateTimeframe('day'));
      assert.equal(true, validator.validateTimeframe('hour'));
      assert.equal(true, validator.validateTimeframe('minute'));
    });
  });
});
