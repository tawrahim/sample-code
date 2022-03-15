import React, { useState, useEffect } from 'react';
import TimeDropdown from './TimeDropdown';
import './Home.css';

function Home() {
  const [timeOptions, setTimeOptions] = useState([]);
  const [bedDuration, setBedDuration] = useState('');
  const [durationSleep, setDurationSleep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  // Load prepareTimeOptions when
  // component renders (first time only!)
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  useEffect(() => {
    prepareTimeOptions();
  }, []);

  /**
   * This builds time option from 00:00 to 24:00
   * in a 30 minute incremenent.
   */
  const prepareTimeOptions = () => {
    let startTime = 0;
    const arrTimes = [];
    const interval = 30;

    for (var i = 0; startTime <= 24 * 60; i++) {
      var hh = Math.floor(startTime / 60);
      var mm = (startTime % 60);
      arrTimes[i] = `${(hh < 10) ? ("0" + hh) : hh}:${(mm < 10) ? ("0" + mm) : mm}`;
      startTime = startTime + interval;
    }
    setTimeOptions(arrTimes);
  };

  const isValid = () => {
    return bedDuration !== '' && durationSleep !== '';
  }

  /**
   * Calculates the result
   */
  const calculate = async () => {
    const bedDurationSplit = bedDuration.split(':');
    const bedDurationMinutes = (+bedDurationSplit[0]) * 60 + (+bedDurationSplit[1])

    const durationSleepSplit = durationSleep.split(':');
    const durationSleepMinutes = (+durationSleepSplit[0]) * 60 + (+durationSleepSplit[1]);

    try {
      setIsLoading(true);
      // Use react fetch to make a call to a dummy API.
      // If this was a complex service, I'd refactor it to its own file
      // using a library like https://react-query.tanstack.com/
      const req = await fetch("https://reqres.in/api/users/2");
      const response = await req.json();
      // console.log(response.data);

      const calculatedResult = 100 * (durationSleepMinutes / bedDurationMinutes);
      setResult(calculatedResult);


      // Post the result to a dummy backend
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: calculatedResult })
      };

      fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.result));

      // console.log(calculatedResult)

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  // Alternatively we could useEffect if we want to store the 
  // data after it has been computed
  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  return (
    <div className="container">
      <div className="form-container">
        <TimeDropdown
          testID="bedDurationSelection"
          label="Duration in bed"
          options={timeOptions}
          value={bedDuration}
          onChange={setBedDuration}
        />

        <TimeDropdown
          testID="sleepDurationSelection"
          label="Duration asleep"
          options={timeOptions}
          value={durationSleep}
          onChange={setDurationSleep}
        />

        <button className="button" disabled={!isValid() || isLoading} onClick={calculate}>
          {isLoading ? 'Loading...' : 'Calculate'}
        </button>

        {(result && !isLoading) && <div data-testid={'score'} className="your-score">
          Your score: {result}
        </div>}
      </div>
    </div>
  )
}

export default Home