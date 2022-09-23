import React from "react";

import Plot from "react-plotly.js";

// require("highcharts/modules/exporting")(Highcharts);
class PieChart extends React.Component {
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
    var data = [
      {
        values: [19, 26, 55],
        labels: ["Residential", "Non-Residential", "Utility"],
        type: "pie",
      },
    ];

    return (
      <>
        <Plot
          var
          data={data}
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
export default PieChart;
