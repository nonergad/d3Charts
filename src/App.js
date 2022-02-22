import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import PeriodButton from './PeriodButton';
import Chart from './Chart';

function App() {
  const [data, setData] = useState([ 50, 100, 150]);
  const [planed, setPlaned] = useState([70, 120, 130])
  const PeriodHandler = (period) =>{
    let newData = [];
    for (let i = 0; i < period; i++) {
      newData.push(Math.floor(Math.random()*(200-50+1)+50));
    }
    setData(newData);
    console.log(getPeriod(period))
    setDate(getPeriod(period))
  }
  
  const getPeriod = (period) => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(endDate.getMonth() - period)
    const step = (endDate - startDate) / (period || 1)
    const dates = []
    for (let i = 0; i <= period - 1; i++) {
      let newDate = new Date(startDate.getTime() + step * i).toString().split(' ');
      newDate = `${newDate[1]} ${newDate[2]}`
      dates.push(newDate)
    }
    return dates
  }
  const [date, setDate] = useState(getPeriod(3));
  

  return (
    <div className="App">
      <div>
        <h1>Доля рынка КФЛ%</h1>
        <div className='InfoContainer'>
          <p>
          {date[0]}
          </p>
          <p>
          {`${(data[0]/planed[0] * 100).toFixed(2)} % к плану`}
          </p>
        </div>
      </div>
      <Chart data={data} date={date}> </Chart>
      <div className='ButtonContainer'>
        <PeriodButton period={3} periodHandler={PeriodHandler}/>
        <PeriodButton period={6} periodHandler={PeriodHandler}/>
        <PeriodButton period={12} periodHandler={PeriodHandler}/>
        <PeriodButton period={24} periodHandler={PeriodHandler}/>
      </div>
    </div>
  );
}

export default App;