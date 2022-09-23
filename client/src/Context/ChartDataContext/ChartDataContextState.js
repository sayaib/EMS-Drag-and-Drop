import React, { useEffect, useState } from 'react'
import RoutingContext from './ChartDataContextAPI'

const ChartDataContextState = (props) => {
    // const [chartData, setChartData] = useState([]);
    const [dateTime, setDateTime] = useState([]);
    const [dataMeter, setMeterData] = useState({
        Vrn: "", Vyn: "", Vbn: "",
        Vry: "", Vyb: "", Vbr: "",
        Ir: "", Iy: "", Ib: "",
    });

    const fetchPowerInfo = async () => {
        try {
            const res = await fetch("/displayChartData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();

            let timestamp = [];
            // Line to Neutral Voltage
            let Vrn = [];
            let Vyn = [];
            let Vbn = [];
            // Line to Neutral Voltage
            let Vry = [];
            let Vyb = [];
            let Vbr = [];
            // Phase wise Current
            let Ir = [];
            let Iy = [];
            let Ib = [];

            for (let i = 0; i < data.length; i++) {
                timestamp.push(data[i].status.datetime);
                Vrn.push(data[i].status.Vrn);
                Vyn.push(data[i].status.Vyn);
                Vbn.push(data[i].status.Vbn);

                Vry.push(data[i].status.Vry);
                Vyb.push(data[i].status.Vyb);
                Vbr.push(data[i].status.Vbr);


                Ir.push(data[i].status.Ir);
                Iy.push(data[i].status.Iy);
                Ib.push(data[i].status.Ib);


            }
            setDateTime(timestamp);
            setMeterData({ Vrn: Vrn, Vyn: Vyn, Vbn: Vbn, Vry: Vry, Vyb: Vyb, Vbr: Vbr, Ir: Ir, Iy: Iy, Ib: Ib });

        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchPowerInfo();
    }, []);

    console.log(dataMeter)
    console.log(dateTime)


    return (

        <RoutingContext.Provider value={{ dateTime, dataMeter }}>
            {props.children}
        </RoutingContext.Provider >

    )
}

export default ChartDataContextState;