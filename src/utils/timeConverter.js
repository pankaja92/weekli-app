const calculateLocalTime = ({ date, hour, minute }) => {
  date = parseInt(date, 10);
  const now = new Date();
  const diff = now.getTimezoneOffset();
  const utctime = parseInt(hour, 10) * 60 + parseInt(minute, 10);
  const localtime = utctime - diff;
  let correcttimeinmin = '';
  // if there's a time diff in local and utc
  if (diff !== 0) {
    // if time in local less than 0
    if (localtime < 0) {
      // if day is not Sunday ( 0 )
      if (date !== 0) {
        date -= 1;
      } else date = 6;
      // if localtime is - we should add 1440 (24 hours) to get the exact time in minutes in previous day
      correcttimeinmin = 1440 - localtime;
    } else if (localtime >= 0 && localtime < 1440) {
      correcttimeinmin = localtime;
    } else {
      if (date !== 6) {
        date += 1;
      } else date = 0;
      // if localtime is + and higher than 1440 (24 in minutes) we should add substract 1440 from time to get the exact time in minutes in previous day
      correcttimeinmin = localtime - 1440;
    }
    hour = parseInt(correcttimeinmin / 60, 10);
    minute = correcttimeinmin % 60;
    const sendObj = {
      getdate: date,
      gethour: hour,
      getMinute: minute,
    };
    return sendObj;
  }
  return {};
};

export default calculateLocalTime;
