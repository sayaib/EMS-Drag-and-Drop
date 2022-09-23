import React from "react";

import Plot from "react-plotly.js";


const LineBarChartMulValue = ({ name, timestamp1, traceOneName, traceTwoName, traceThreeName, parameterChart1, parameterChart2, parameterChart3 }) => {
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
            // rangeselector: this.selectorOptions,
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
                text: "Frequency",
                font: {
                    // family: 'Courier New, monospace',
                    size: 14,
                    color: '#000'
                }
            }
        }
    }





    var trace1 = {
        x: timestamp1,
        y: parameterChart1,
        type: 'bar',
        name: traceOneName,
        marker: {
            color: '#43919B'
        }

    };
    var trace2 = {
        x: timestamp1,
        y: parameterChart2,
        type: 'bar',
        name: traceTwoName,
        marker: {
            color: '#44919B'
        }

    };
    var trace3 = {
        x: timestamp1,
        y: parameterChart3,
        type: 'bar',
        name: traceThreeName,
        marker: {
            color: '#45919B'
        }

    };
    return (
        <>
            <Plot
                var data={[trace1, trace2, trace3]}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "50%" }}
                showSendToCloud={true}
                config={{ modeBarButtonsToRemove: ['lasso', 'select2d'] }}
            />
        </>
    )

}
export default LineBarChartMulValue;