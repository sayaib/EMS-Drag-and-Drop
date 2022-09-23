import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";

class VerticalBarChart extends React.Component {
  selectorOptions = {
    buttons: [
      {
        step: "second",
        stepmode: "backward",
        count: 45,
        label: "45Sec",
        default: true,
      },
      {
        step: "minute",
        stepmode: "backward",
        count: 5,
        label: "5Min",
      },
      {
        step: "hour",
        stepmode: "backward",
        count: 1,
        label: "1Hr",
      },
      {
        step: "day",
        stepmode: "backward",
        count: 1,
        label: "1D",
      },
      {
        step: "day",
        stepmode: "backward",
        count: 7,
        label: "1W",
      },
      {
        step: "month",
        stepmode: "backward",
        count: 1,
        label: "1M",
      },
      {
        step: "all",
      },
    ],
  };

  layout = {
    title: {
      text: this.props.name,
      font: {
        size: 15,
      },
      xref: "paper",
      x: 0.0,
    },
    xaxis: {
      // rangeselector: this.selectorOptions,
      rangeslider: { visible: false },
      title: {
        text: "Time",
        // font: {
        //     family: 'Courier New, monospace',
        //     size: 18,
        //     color: '#7f7f7f'
        // }
      },
    },
    yaxis: {
      title: {
        text: this.props.yaxis,
        // font: {
        //     family: 'Courier New, monospace',
        //     size: 18,
        //     color: '#7f7f7f'
        // }
      },
    },
  };

  render() {
    var trace1 = {
      x: [1, 0.5, 1.7, 1.2, 0.3, 0.4],
      y: [1, 3.5, 0.7, 1.2, 0.3, 0.4],
      name: "Phase 1",
      type: "bar",
      marker: {
        color: "#4E709D",
      },
    };

    var trace2 = {
      x: [1, 0.5, 0.7, 1.2, 0.3, 0.4],
      y: [1, 2.5, 0.7, 1.2, 0.3, 0.4],
      name: "Phase 2",
      type: "bar",
      marker: {
        color: "#F5B17B",
      },
    };
    var trace3 = {
      x: [1, 0.5, 1.7, 1.2, 0.3, 0.4],
      y: [1, 0.5, 3.7, 1.2, 0.3, 0.4],
      name: "Phase 3",
      type: "bar",
    };

    return (
      <>
        <Plot
          var
          data={[trace1, trace2, trace3]}
          layout={this.layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "50%" }}
          showSendToCloud={true}
          config={{ modeBarButtonsToRemove: ["lasso", "select2d"] }}
        />
      </>
    );
  }
}
export default VerticalBarChart;
