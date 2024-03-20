const strftime = require("strftime");

function getSalahTimesCustom(
  fajrInput,
  sunriseInput,
  dhuhrInput,
  asrInput,
  maghribInput,
  ishaInput,
  lastUpdated
) {
  if (
    !fajrInput ||
    !sunriseInput ||
    !dhuhrInput ||
    !asrInput ||
    !maghribInput ||
    !ishaInput
  ) {
    return {
      Error: "Missing required inputs.",
    };
  }

  var lastUpdated;

  if (!lastUpdated) {
    lastUpdated = "Unknown";
  }

  var salahTimes = {
    times: {
      Fajr: fajrInput,
      Sunrise: sunriseInput,
      Dhuhr: dhuhrInput,
      Asr: asrInput,
      Maghrib: maghribInput,
      Isha: ishaInput,
      // Qiyam: qiyamInput,
    },
    lastUpdated: lastUpdated,
  };

  var sunriseText = "Sunrise";
  var fajrText = "Fajr";
  var morningText = "Morning";
  var dhuhrText = "Dhuhr";
  var asrText = "Asr";
  var maghribText = "Maghrib";
  var ishaText = "Isha";
  var midnightText = "Midnight";

  const year = strftime("%Y");
  const monthNumber = strftime("%m");
  const dayOfMonth = strftime("%d");
  const hour = strftime("%H");
  const minute = strftime("%M");
  const second = strftime("%S");
  const timeNow = `${year}-${monthNumber}-${dayOfMonth} ${hour}:${minute}:${second}`;

  const fajrHour = "0" + salahTimes.times.Fajr[0];
  const fajrMinute = salahTimes.times.Fajr[2] + salahTimes.times.Fajr[3];
  const fajrZero = parseInt(salahTimes.times.Fajr[0]) + 1;

  const sunriseHour = "0" + salahTimes.times.Sunrise[0];
  const sunriseMinute =
    salahTimes.times.Sunrise[2] + salahTimes.times.Sunrise[3];
  const sunrise0 = parseInt(salahTimes.times.Sunrise[0]) + 1;

  let dhuhrHour;
  if (salahTimes.times.Dhuhr[6] == "M") {
    dhuhrHour = "0" + salahTimes.times.Dhuhr[0];
  } else {
    dhuhrHour = salahTimes.times.Dhuhr[0] + salahTimes.times.Dhuhr[1];
  }
  const dhuhrMinute = salahTimes.times.Dhuhr[3] + salahTimes.times.Dhuhr[4];
  const dhuhrZero = parseInt(dhuhrHour) + 1;

  const asrHour2 = "0" + salahTimes.times.Asr[0];
  const asrHour = parseInt(asrHour2) + 12;
  const asrMinute = salahTimes.times.Asr[2] + salahTimes.times.Asr[3];
  const asrZero = parseInt(asrHour) + 1;

  const maghribHour2 = "0" + salahTimes.times.Maghrib[0];
  const maghribHour = parseInt(maghribHour2) + 12;
  const maghribMinute =
    salahTimes.times.Maghrib[2] + salahTimes.times.Maghrib[3];
  const maghribZero = parseInt(maghribHour) + 1;

  const ishaHour2 = "0" + salahTimes.times.Isha[0];
  const ishaHour = parseInt(ishaHour2) + 12;
  const ishaMinute = salahTimes.times.Isha[2] + salahTimes.times.Isha[3];
  const ishaZero = parseInt(ishaHour) + 1;

  // const qiyamHour = "0" + salahTimes.times.Qiyam[0];
  // const qiyamMinute = salahTimes.times.Qiyam[2] + salahTimes.times.Qiyam[3];
  // const qiyamZero = parseInt(salahTimes.times.Qiyam[0]) + 1;

  const fajr = `${year}-${monthNumber}-${dayOfMonth} ${fajrHour}:${fajrMinute}:00`;
  const sunrise = `${year}-${monthNumber}-${dayOfMonth} ${sunriseHour}:${sunriseMinute}:00`;
  const dhuhr = `${year}-${monthNumber}-${dayOfMonth} ${dhuhrHour}:${dhuhrMinute}:00`;
  const asr = `${year}-${monthNumber}-${dayOfMonth} ${asrHour}:${asrMinute}:00`;
  const maghrib = `${year}-${monthNumber}-${dayOfMonth} ${maghribHour}:${maghribMinute}:00`;
  const isha = `${year}-${monthNumber}-${dayOfMonth} ${ishaHour}:${ishaMinute}:00`;
  // const qiyam = `${year}-${monthNumber}-${dayOfMonth} ${qiyamHour}:${qiyamMinute}:00`;

  const dayTomorrow = parseInt(dayOfMonth) + 1;

  // const qiyam2 = `${year}-${monthNumber}-${dayTomorrow} ${qiyamHour}:${qiyamMinute}:00`;
  const fajr2 = `${year}-${monthNumber}-${dayTomorrow} ${fajrHour}:${fajrMinute}:00`;

  // Someone please explain what is happening below

  a1 = salahTimes.times.Sunrise[0];
  a2 = sunriseMinute;
  a3 = 0;
  b1 = salahTimes.times.Fajr[0];
  b2 = fajrMinute;
  b3 = 0;
  var s = 0;
  if (a1) s += 3600 * a1;
  if (a2) s += 60 * a2;
  if (a3) s += a3;
  var t = 0;
  if (b1) t += 3600 * b1;
  if (b2) t += 60 * b2;
  if (b3) t += b3;
  var u = 0;
  if (s > t) u = 86400 - s + t;
  else u = t - s;
  h = Math.floor(u / 3600);
  u -= h * 3600;
  m = Math.floor(u / 60);
  u -= m * 60;

  const midnight = `${year}-${monthNumber}-${dayOfMonth} ${h}:${m}:00`;
  const midnightZero = parseInt(h) + 1;

  // Because I have no idea how I even managed to write this

  // Fajr timings start here
  if (hour < fajrZero) {
    if (hour == fajrHour) {
      if (minute >= fajrMinute) {
        const timeLeft = timeDifference(timeNow, sunrise);
        return resultant(fajrText, morningText, timeLeft, lastUpdated);
      } else {
        const timeLeft = timeDifference(timeNow, fajr);
        return resultant(midnightText, fajrText, timeLeft, lastUpdated);
      }
    } else {
      const timeLeft = timeDifference(timeNow, fajr);
      return resultant(midnightText, fajrText, timeLeft, lastUpdated);
    }
    // Sunrise timings start here
  } else if (hour < sunrise0) {
    if (minute >= sunriseMinute) {
      const timeLeft = timeDifference(timeNow, dhuhr);
      return resultant(morningText, dhuhrText, timeLeft, lastUpdated);
    } else {
      const timeLeft = timeDifference(timeNow, sunrise);
      return resultant(fajrText, sunriseText, timeLeft, lastUpdated);
    }
    // Dhuhr timings start here
  } else if (hour < dhuhrZero) {
    if (hour == dhuhrHour) {
      if (minute >= dhuhrMinute) {
        const timeLeft = timeDifference(timeNow, asr);
        return resultant(dhuhrText, asrText, timeLeft, lastUpdated);
      } else {
        const timeLeft = timeDifference(timeNow, dhuhr);
        return resultant(morningText, dhuhrText, timeLeft, lastUpdated);
      }
    } else {
      const timeLeft = timeDifference(timeNow, dhuhr);
      return resultant(morningText, dhuhrText, timeLeft, lastUpdated);
    }
    // Asr timings start here
  } else if (hour < asrZero) {
    if (hour == asrHour) {
      if (minute >= asrMinute) {
        const timeLeft = timeDifference(timeNow, maghrib);
        return resultant(asrText, maghribText, timeLeft, lastUpdated);
      } else {
        const timeLeft = timeDifference(timeNow, asr);
        return resultant(dhuhrText, asrText, timeLeft, lastUpdated);
      }
    } else {
      const timeLeft = timeDifference(timeNow, asr);
      return resultant(dhuhrText, asrText, timeLeft, lastUpdated);
    }
    // Maghrib timings start here
  } else if (hour < maghribZero) {
    if (hour == maghribHour) {
      if (minute >= maghribMinute) {
        const timeLeft = timeDifference(timeNow, isha);
        return resultant(maghribText, ishaText, timeLeft, lastUpdated);
      } else {
        const timeLeft = timeDifference(timeNow, maghrib);
        return resultant(asrText, maghribText, timeLeft, lastUpdated);
      }
    } else {
      const timeLeft = timeDifference(timeNow, maghrib);
      return resultant(asrText, maghribText, timeLeft, lastUpdated);
    }
    // Isha timings start here
  } else if (hour < ishaZero) {
    if (hour == ishaHour) {
      if (minute >= ishaMinute) {
        const timeLeft = timeDifference(timeNow, midnight);
        return resultant(ishaText, midnightText, timeLeft, lastUpdated);
      } else {
        const timeLeft = timeDifference(timeNow, isha);
        return resultant(maghribText, ishaText, timeLeft, lastUpdated);
      }
    } else {
      const timeLeft = timeDifference(timeNow, isha);
      return resultant(maghribText, ishaText, timeLeft, lastUpdated);
    }
    // Midnight timings start here
  } else if (hour < midnightZero) {
    if (hour == h) {
      if (minute >= m) {
        const timeLeft = timeDifference(timeNow, fajr2);
        return resultant(midnightText, fajrText, timeLeft, lastUpdated);
      } else {
        const timeLeft = timeDifference(timeNow, midnight);
        return resultant(ishaText, midnightText, timeLeft, lastUpdated);
      }
    } else {
      const timeLeft = timeDifference(timeNow, midnight);
      return resultant(ishaText, midnightText, timeLeft, lastUpdated);
    }
  } else if (hour < 24) {
    const timeLeft = timeDifference(timeNow, fajr2);
    return resultant(midnightText, fajrText, timeLeft, lastUpdated);
  } else {
    const timeLeft = timeDifference(timeNow, fajr);
    return resultant(midnightText, fajrText, timeLeft, lastUpdated);
  }

  function timeDifference(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const difference = endDate - startDate;

    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    return { hours, minutes, seconds };
  }

  function resultant(prayer, nextPrayer, timeLeft, lastUpdated) {
    return {
      Current: prayer,
      Next: nextPrayer,
      Remaining: timeLeft,
      Updated: lastUpdated,
      Times: {
        Fajr: fajrInput,
        Sunrise: sunriseInput,
        Dhuhr: dhuhrInput,
        Asr: asrInput,
        Maghrib: maghribInput,
        Isha: ishaInput,
      },
    };
  }
}

async function getSalahTimes(city) {
  if (!city) {
    return {
      Error: "Missing required inputs.",
    };
  }

  const response = await fetch(`https://api.azwad.org/weather/${city}`, {
    method: "GET",
  });

  if (!response.ok) {
    return {
      Error: "Something went wrong.",
    };
  }

  const data = await response.json();

  const responseSecondary = await fetch(
    `https://salah.com/get?lt=${data.location.latitude}&lg=${data.location.longitude}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    return {
      Error: "Something went wrong.",
    };
  }

  const dataSecondary = await responseSecondary.json();

  return getSalahTimesCustom(
    `${dataSecondary.times.Fajr}`,
    `${dataSecondary.times.Sunrise}`,
    `${dataSecondary.times.Dhuhr}`,
    `${dataSecondary.times.Asr}`,
    `${dataSecondary.times.Maghrib}`,
    `${dataSecondary.times.Isha}`,
    `${strftime("%d/%m/%Y at %I:%M:%S")}`
  );
}

function getSalahTimesLocal(input) {
  try {
    if (
      !input.Times.Fajr ||
      !input.Times.Sunrise ||
      !input.Times.Dhuhr ||
      !input.Times.Asr ||
      !input.Times.Maghrib ||
      !input.Times.Isha
    ) {
      return { Error: "Incorrect input format." };
    } else {
      return getSalahTimesCustom(
        `${input.Times.Fajr}`,
        `${input.Times.Sunrise}`,
        `${input.Times.Dhuhr}`,
        `${input.Times.Asr}`,
        `${input.Times.Maghrib}`,
        `${input.Times.Isha}`,
        `${input.Updated || "Unknown"}`
      );
    }
  } catch {
    return { Error: "Incorrect input format provided." };
  }
}

function getTimeNow(input) {
  return strftime("%d/%m/%Y at %I:%M:%S");
}

module.exports = {
  getSalahTimesLocal,
  getSalahTimes,
  getTimeNow,
};
