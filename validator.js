module.exports = {
  validateDate: function(date) {
    if (new Date(date) != 'Invalid Date') {
      return true;
    }

    throw new Error('Invalid date');
  },
  validateEventType: function(type) {
    if (type === 'enter' || type === 'leave' || type === 'highfive' || type == 'comment') {
      return true;
    }

    throw new Error('Invalid event type');
  },
  validateEvent: function(event) {
    this.validateDate(event.date);
    this.validateEventType(event.type);
    if (event.user === undefined || event.user.length === 0) {
      throw new Error('Invalid user');
    }

    var isHighFive = (event.type === 'highfive');
    var hasOtherUser = event.hasOwnProperty('otheruser');
    var isComment = (event.type === 'comment');
    var hasMessage = event.hasOwnProperty('message');

    if (isHighFive) {
      if (!hasOtherUser) {
        throw new Error('Highfive must have otheruser');
      }
    }
    if (isComment) {
      if (!hasMessage) {
        throw new Error('Comment must have message');
      }
    }
    if (hasOtherUser) {
      if (!isHighFive) {
        throw new Error('Otheruser must have a highfive event type');
      }
    }
    if (hasMessage) {
      if (!isComment) {
        throw new Error('Message must have a comment event type');
      }
    }

    return true;
  },

  validateDateRange: function(startDate, endDate) {
    this.validateDate(startDate);
    this.validateDate(endDate);
    if (startDate >= endDate) {
      throw new Error('Invalid date range');
    }
  },

  validateTimeframe: function(timeframe) {
    if (timeframe === 'minute' || timeframe == 'hour' || timeframe === 'day') {
      return true;
    }

    throw new Error('Invalid timeframe');
  },
};