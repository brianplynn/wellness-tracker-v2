import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter } from 'victory';
import "./SleepGraph.css"

const SleepGraph = ({ sleepData, editSleep }) => {
	const hoursArr=sleepData.coordinates.map(item => item.hours);
  return (
    <div className="center flex flex-column graph-container">
    <div className="z-3 flex graph-header">
      <div className="w-100">
          <h1 className="white tc">Your 7-day sleep totals</h1>
      </div>
      <div className="z-3 edit-sleep-btn">
      <button className="z-3 b center pv2 ph3 tc light-blue ba br2 b--light-blue bg-transparent grow pointer outline-0 f4"
              onClick={editSleep.bind(null, sleepData.coordinates)}>Edit</button>
      </div>
    </div>
		<VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
        style={{
          width: window.innerWidth > 770 ? "80%" : "100%"
        }}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          style={{
            axis: {stroke: "white"},
            ticks: {stroke: "white", size: 5},
            tickLabels: {stroke: "transparent", fill: "white", fontSize: 12, padding: 5}
          }}
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={sleepData.dates}
        />
        <VictoryAxis
          dependentAxis
          domain={[0,Math.max(...hoursArr)+2]}
          style={{
            axis: {stroke: "white"},
            tickLabels: {stroke: "transparent", fill: "white", fontSize: 12, padding: 5}
          }}
          tickFormat={(x) => (`${x} hr`)}
        />
        <VictoryLine
          style={{
            data: { stroke: "white" },
          }}
          data={sleepData.coordinates}
          x="date"
          y="hours"
          animate={{
            onLoad: {
              duration: 1500,
              before: () => ({ _y: 0 }),
              after: (datum) => ({  _y: datum._y })
            }
          }}
        />
        <VictoryScatter
          size={5}
          style={{
            data: {
              fill: (d) => d.quality === "Good" ? "rgba(155,255,155,1)" : (d.quality === "OK" ? "rgba(255,255,155,1)" : "rgba(255,155,155,1)"),
              opacity: (d) => d.opacity || 1
            }
          }}
          data={sleepData.coordinates}
          x="date"
          y="hours"
          animate={{
            onLoad: {
              duration: 1500,
              before: () => ({ _y: 0 }),
              after: (datum) => ({  _y: datum._y })
            }
          }}
        />
      </VictoryChart>
      </div>
    );
}

export default SleepGraph;