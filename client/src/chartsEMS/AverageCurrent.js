
import React from "react";
import ReactDOM from "react-dom";
import Plot from "react-plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';

// const Plot = createPlotlyComponent(Plotly);

class AverageCurrent extends React.Component {

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


    // }
    layout = {
        title: {
            text: this.props.chartTitle,
            font: {

                size: 15
            },
            xref: 'paper',
            x: 0.00,
        },
        xaxis: {
            rangeselector: this.props.selectorOptions,
            rangeslider: { visible: false },
            title: {
                text: 'Time',
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
        },
        // "annotations": [
        //     {
        //         "text": "No matching data found",
        //         "xref": "paper",
        //         "yref": "paper",
        //         "showarrow": false,
        //         "font": {
        //             "size": 28
        //         }
        //     }
        // ]
    }



    render() {
        return (
            <Plot
                data={[{
                    y: this.props.parameterChart2, x: this.props.timestamp2,
                    // name: "Meter One",
                    line: {
                        color: '#8D0033',
                        width: 2
                    },
                    marker: {
                        color: '#8D0033',
                        size: 10
                    }
                }
                ]}
                layout={this.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "50%" }}
                showSendToCloud={true}
                config={{ modeBarButtonsToRemove: ['lasso', 'select2d'] }}

            />


        );
    }
}

export default AverageCurrent;