import React, { useContext } from "react";

import Plot from "react-plotly.js";
import ChartDataContextAPI from '../Context/ChartDataContext/ChartDataContextAPI'



// require("highcharts/modules/exporting")(Highcharts);
const LineChartSingleValue = ({ name, traceOneName, timestamp1, parameterChart1 }) => {
    const context = useContext(ChartDataContextAPI);
    console.log(context)
    const selectorOptions = {
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

    const layout = {
        title: {
            text: name,
            font: {
                size: 15
            },
            xref: 'paper',
            x: 0.00,
        },
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: { visible: false },
            title: {
                text: "Time",
                font: {
                    // family: 'Courier New, monospace',
                    size: 14,
                    color: '#000'
                }
            }
        },
        yaxis: {
            title: {
                text: "Power",
                font: {
                    // family: 'Courier New, monospace',
                    size: 14,
                    color: '#000'
                }
            }
        },

    }


    var trace1 = {
        x: timestamp1,
        y: parameterChart1,
        name: traceOneName,
        type: 'line',

    };


    return (
        <>
            <Plot
                var data={[trace1]}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "50%" }}
                showSendToCloud={true}
                config={{ modeBarButtonsToRemove: ['lasso', 'select2d'] }}
            />
        </>
    )

}
export default LineChartSingleValue;