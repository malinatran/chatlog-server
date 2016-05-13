var moment = require('moment');

module.exports = {
  getEventObjects: function(startDate, endDate, unitOfTime) {
    var datesToSummary = {};
    var i = 0;
    while (true) {
      var date = moment(startDate).add(i, unitOfTime).toDate();
      if (date >= endDate) {
        break;
      }
      datesToSummary[date.toISOString()] = {
        enters: 0,
        leaves: 0,
        comments: 0,
        highfives: 0
      };
      i++;
    };

    return datesToSummary;
  },

  summarizeEvents: function(events, startDate, endDate, timeframe) {
    var datesToSummary = this.getEventObjects(startDate, endDate, timeframe + 's');

    for (i = 0; i < events.length; i++) {
      var eventDate = moment.utc(events[i].date)
                        .startOf(timeframe)
                        .toISOString();

      if (events[i].type === 'enter') {
        datesToSummary[eventDate].enters++;
      } else if (events[i].type === 'leave') {
        datesToSummary[eventDate].leaves++;
      } else if (events[i].type === 'comment') {
        datesToSummary[eventDate].comments++;
      } else if (events[i].type === 'highfive') {
        datesToSummary[eventDate].highfives++;
      }
    };

    var summary = [];
    for (var date in datesToSummary) {
      datesToSummary[date].date = date;
      summary.push(datesToSummary[date]);
    }
    summary.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    return summary;
  }
};