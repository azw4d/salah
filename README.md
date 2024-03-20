## Salah

The salah module gives you accurate prayer times for any provided city.

- One requires one dependency (strftime)
- Local mode available to avoid rate limits
- Only updates requires async-await

### Import the module

```
npm i salah --save
```

### Usage

```
const salah = require("salah");

async function fetchTimes() {
  const result = await salah.getSalahTimes("London");
  console.log(result);

  // The 'getSalahTimes' function requires the name of a city as the input.
  // Updated times are rate limited, use cautiously.


  const localResult = salah.getSalahTimesLocal(result);
  console.log(localResult);

  // Feed the 'result' from the 'getSalahTimes' function into the 'getSalahTimesLocal' function to calculate times locally on your computer, avoiding rate limits and the need for internet access.
}

fetchTimes();
```

### Local times only

Need pure local calculation? No worries.

```
const result = salah.getSalahTimesLocal({
  Updated: `${salah.getTimeNow()}`,
  Times: {
    Fajr: '4:00 AM',
    Sunrise: '6:00 AM',
    Dhuhr: '1:00 PM',
    Asr: '3:00 PM',
    Maghrib: '5:00 PM',
    Isha: '7:00 PM'
  }
})

// 'Updated' can be set to anything, only useful as a reference.
// Only 'Dhuhr' times can be in either 'X:XX XM' or 'XX:XX XM' format, all the other times are required to be in 'X:XX XM' format only. (This will be fixed soon)
```
