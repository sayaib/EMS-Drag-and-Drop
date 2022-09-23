import { React, useEffect, useState } from "react";
// import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import addHighchartsMore from 'highcharts/highcharts-more';



import '../css/HighCharts.css';

exporting(Highcharts);
addHighchartsMore(Highcharts);


// require("highcharts/modules/exporting")(Highcharts);


const BasicLineChart = ({ name, data }) => {

    const chartOptions = {

        title: {
            text: name,
            zoomType: 'xy',
            align: 'left'

        },

        subtitle: {
            text: ''
        },


        yAxis: {
            title: {
                text: 'Power',


            }
            ,
            min: 0,
            // opposite: true,
            labels: {

                align: "left"
            }
        },

        // xAxis: {
        //     // type: "date",         // type: 'datetime',
        //     // tickInterval: 3600 * 1000,
        //     // max: 100,
        //     title: {
        //         text: 'Time Period'
        //     },
        //     accessibility: {
        //         rangeDescription: 'Energy'
        //     },
        //     title: {
        //         text: 'Energy'
        //     },
        // categories: [
        //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        //     'Jan',
        //     'Feb',
        //     'Mar',
        //     'Apr',
        //     'May',
        //     'Jun',
        //     'Jul',
        //     'Aug',
        //     'Sep',
        //     'Oct',
        //     'Nov',
        //     'Dec'
        // ],
        // },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        rangeSelector: {
            inputEnabled: false,
            enabled: false,
            selected: 1
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: true
                },
                pointStart: 0
            }
        },

        //button
        // rangeSelector: {
        //     allButtonsEnabled: true,
        //     buttons: [{
        //         type: 'month',
        //         count: 0,
        //         text: 'Day',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['day', [1]]]
        //         }
        //     }, {
        //         type: 'year',
        //         count: 1,
        //         text: 'Week',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['week', [1]]]
        //         }
        //     }, {
        //         type: 'all',
        //         text: 'Month',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['month', [1]]]
        //         }
        //     }],
        //     buttonTheme: {
        //         width: 60
        //     },
        //     selected: 2
        // },
        // rangeSelector: {
        //     allButtonsEnabled: true,
        //     // selected: 2
        // },
        series: [{
            name: "chart",
            data: data,
        }],

    };


    return (
        <>
            <div className="Chart">
                <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'}
                    options={chartOptions} />
            </div>
        </>
    );

}

export default BasicLineChart;