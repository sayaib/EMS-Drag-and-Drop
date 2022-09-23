import React from "react";


import HighchartsReact from "highcharts-react-official";

import Highcharts from 'highcharts/highstock';

import noData from 'highcharts/modules/no-data-to-display';
import boost from 'highcharts/modules/boost'

import addHighchartsMore from 'highcharts/highcharts-more';



import '../css/HighCharts.css';
boost(Highcharts)
addHighchartsMore(Highcharts);
noData(Highcharts)

class LineChartMulValue extends React.Component {


    render() {
        const chartOptions = {
            chart: {
                animation: true,
                events: {
                    load() {
                        const chart = this;
                        chart.showLoading('Loading...');
                        setTimeout(function () {
                            chart.hideLoading();

                        }, 1000);
                    }
                }
            },
            title: {
                text: this.props.name,
                align: 'left'
            },


            subtitle: {
                text: ''
            },
            boost: {
                useGPUTranslations: true,
                usePreAllocated: true
            },
            yAxis: {

                title: {
                    text: 'Energy (KWh)'
                },
                labels: {

                    align: "left"
                }
            },

            xAxis: {
                type: "day",
                title: {
                    text: 'Time Period'
                },
                categories: [

                ],

                // crosshair: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {

                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointInterval: 1,
                    pointStart: 0,
                    tooltip: {
                        valueDecimals: 2
                    }
                },


            },

            rangeSelector: {
                inputEnabled: false,
                enabled: false,
                selected: 1
            },
            // lang: {
            //     lang: {
            //         noData: "no data found"
            //     }
            // },

            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#303030'
                }
            },
            series: [{

                name: 'Meter 1',
                data: this.props.averageDataMeterOne,
            }, {

                name: 'Meter 2',
                data: this.props.averageDataMeterTwo
            }, {

                name: 'Meter 3',
                data: this.props.averageDataMeterThree

            }, {

                name: 'Meter 4',
                data: this.props.averageDataMeterOne

            }
            ],


            //buttons
            // responsive: {
            //     rules: [{
            //         condition: {
            //             maxWidth: 500
            //         },
            //         chartOptions: {
            //             legend: {
            //                 layout: 'horizontal',
            //                 align: 'center',
            //                 verticalAlign: 'bottom'
            //             }
            //         }
            //     }]
            // }

        };

        return (
            <div className="Chart">

                <HighchartsReact constructorType={'stockChart'} options={chartOptions} highcharts={Highcharts} />
            </div>
        );
    }
}
export default LineChartMulValue;