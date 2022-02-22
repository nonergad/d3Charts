import React from 'react'
import './PeriodButton.css'

export default  function PeriodButton(props) {
  return (
    <div>
      <button className='PeriodButton' onClick={() => props.periodHandler(props.period)}>{props.period >= 12 ? props.period/12 : props.period} {props.period > 11 ? 'Г' : 'М'}</button>
    </div>
  );
}