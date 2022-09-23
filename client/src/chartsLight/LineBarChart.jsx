import React from "react";

import Plot from "react-plotly.js";

// require("highcharts/modules/exporting")(Highcharts);
class LineBarChart extends React.Component {
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
        font: {
          // family: 'Courier New, monospace',
          size: 14,
          color: "#000",
        },
      },
    },
    yaxis: {
      title: {
        text: "Active & Reactive",
        font: {
          // family: 'Courier New, monospace',
          size: 14,
          color: "#000",
        },
      },
    },
  };
  render() {
    var trace1 = {
      x: [0, 1, 2, 3, 4, 5],
      y: [1.5, 1, 1.3, 0.7, 0.8, 0.9],
      name: "active",
      type: "line",
      line: {
        color: "#FFAA00",
      },
    };

    var trace2 = {
      x: [0, 1, 2, 3, 4, 5],
      y: [1, 0.5, 0.7, 1.2, 0.3, 0.4],
      type: "bar",
      name: "reactive",
      marker: {
        color: "#249CFF",
      },
    };
    return (
      <>
        <Plot
          var
          data={[trace1, trace2]}
          layout={this.layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "50%" }}
          showSendToCloud={true}
          config={{ modeBarButtonsToRemove: ["lasso", "select2d"] }}
        ></Plot>
      </>
    );
  }
}
export default LineBarChart;
