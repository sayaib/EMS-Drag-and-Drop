
import React from "react";
import ReactDOM from "react-dom";
import Plot from "react-plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';

// const Plot = createPlotlyComponent(Plotly);

class AverageCurrent extends React.Component {

    selectorOptions = {
        buttons: [
            {
                step: "hour",
                stepmode: "backward",
                count: 1,
                label: "1HR",
            },
            {
                step: "day",
                stepmode: "backward",
                count: 1,
                label: "1D",
                event: {
                    click: () => {
                        alert("hello");
                    },
                },
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
                    y: this.props.averageDataMeterOne, x: this.props.timestamp1,
                    name: "Meter One",
                    line: {
                        color: '#8D0033',
                        width: 2
                    },
                    marker: {
                        color: '#8D0033',
                        size: 10
                    }
                },
                {
                    y: this.props.averageDataMeterTwo, x: this.props.timestamp2,
                    name: "Meter Two",
                    line: {
                        color: '#E04D01',
                        width: 2
                    },
                    marker: {
                        color: '#E04D01',
                        size: 10
                    }
                },
                {
                    y: this.props.averageDataMeterThree, x: this.props.timestamp3,
                    name: "Meter Three",
                    line: {
                        color: '#4E709D',
                        width: 2
                    },
                    marker: {
                        color: '#4E709D',
                        size: 10
                    }
                },
                {
                    y: this.props.averageDataMeterFour, x: this.props.timestamp4,
                    name: "Meter Four",
                    line: {
                        color: '#D29D2B',
                        width: 2
                    },
                    marker: {
                        color: '#D29D2B',
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