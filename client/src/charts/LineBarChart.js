import React from "react";

import Plot from "react-plotly.js";



// require("highcharts/modules/exporting")(Highcharts);
class LineBarChart extends React.Component {
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
                font: {
                    // family: 'Courier New, monospace',
                    size: 14,
                    color: '#000'
                }
            }
        },
        yaxis: {
            title: {
                text: "Active & Reactive",
                font: {
                    // family: 'Courier New, monospace',
                    size: 14,
                    color: '#000'
                }
            }
        }
    }
    render() {


        var trace1 = {
            x: this.props.timestamp,
            y: this.props.active,
            name: 'active',
            type: 'line',
            line: {
                color: '#FF6B6B'
            }

        };

        var trace2 = {
            x: this.props.timestamp,
            y: this.props.reactive,
            type: 'bar',
            name: 'reactive',
            marker: {
                color: '#43919B'
            }

        };
        return (
            <>
                <Plot
                    var data={[trace1, trace2,]}
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
export default LineBarChart;