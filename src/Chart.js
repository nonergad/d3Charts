import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Chart.css'
import ReactDOM from 'react-dom';
import { arc } from 'd3';

const Chart = (props) => {
  const data = props.data;
  const date = props.date
  const chart = useRef();

  const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	const update = useRef(false)

	useEffect(()=>{
		window.addEventListener('resize', ()=>{
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})

			if(update){
				d3.selectAll('g').remove()
			} else {update = true}
		})

    d3.selectAll('g').remove()

		ChartRender(dimensions)

	},[dimensions, data])

  const margine = {top: 50, right: 30, bottom: 30, left: 60};
  useEffect(() =>{
    
  })

  function ChartRender(dimensions) {
    
    const chartWidth = parseInt(d3.select('.Chart').style('width')) - margine.left - margine.right;
    const chartHiegth = parseInt(d3.select('.Chart').style('width')) - margine.top - margine.bottom;
    const svg = d3.select(chart.current)
                  .attr('width', chartWidth + margine.left + margine.right)
                  .attr('height', chartHiegth + margine.top + margine.bottom)
    const xAxis = d3.scaleBand()
                    .domain(d3.range(date.length))
                    .range([margine.left, chartWidth - margine.right])
                    .padding(0.1)
    svg.append('g')
        .attr('transform', `translate(0, ${chartHiegth})`)
        .attr('fill', 'red')
        .call(d3.axisBottom(xAxis).tickFormat(i=>date[i]).tickSizeOuter(0))
    
    const max = d3.max(data, function(d){
      return d
    })    
    const yAxis = d3.scaleLinear()
                    .domain([0, max])
                    .range([chartHiegth, margine.top])
    
    svg.append('g')
        .attr('transform', `translate(${margine.left},0)`)
        .call(d3.axisLeft(yAxis))
    

    svg.append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
          .attr('fill', function(d){
            return d > 120 ? '#80b997' : '#f26c64';
          })
          .attr('x', (d,i) => xAxis(i))
          .attr('y', d => yAxis(d))
          .attr('height', d=>yAxis(0) - yAxis(d))
          .attr('width', xAxis.bandwidth());
          
      //   svg.selectAll("text")
      //     .data(data)
      //     .enter()
      //     .append("text")
      //     .text(function(d) {
      //       return d;
      //     })
      //     .attr("x", function(d, i) {
      //       return i * (charWidth / data.length);
      //  })
      //  .attr("y", function(d) {
      //       return chartHiegth - (d * 4);
      //  });  
       
  }

  return (
    <div className='Chart'>
       <svg ref={chart}></svg>
    </div>
  );
};

export default Chart