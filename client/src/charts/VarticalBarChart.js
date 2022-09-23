import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";

class VerticalBarChart extends React.Component {


  selectorOptions = {
    buttons: [
      {
        step: 'second',
        stepmode: 'backward',
        count: 45,
        label: '45Sec',
        default: true
      },
      {
        step: 'minute',
        stepmode: 'backward',
        count: 5,
        label: '5Min'
      }, {
        step: 'hour',
        stepmode: 'backward',
        count: 1,
        label: '1Hr'
      }, {
        step: 'day',
        stepmode: 'backward',
        count: 1,
        label: '1D'
      }, {
        step: 'day',
        stepmode: 'backward',
        count: 7,
        label: '1W'
      },
      {
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1M'
      },
      {
        step: 'all',

      }],
  };

  layout = {
    title: {
      text: this.props.name,
      font: {
        size: 15
      },
      xref: 'paper',
      x: 0.00,
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
      }
    },
    yaxis: {
      title: {
        text: this.props.yaxis,
        // font: {
        //     family: 'Courier New, monospace',
        //     size: 18,
        //     color: '#7f7f7f'
        // }
      }
    }
  }

  render() {




    var trace1 = {
      x: this.props.timestamp,
      y: this.props.phase1,
      name: 'Phase 1',
      type: 'bar',
      marker: {
        color: "#4E709D"
      }
    };

   

    return (
      <>
        <Plot
          var data={[trace1]}
          layout={this.layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "50%" }}
          showSendToCloud={true}
          config={{ modeBarButtonsToRemove: ['lasso', 'select2d'] }}

        />
      </>
    )
  }

}
export default VerticalBarChart;