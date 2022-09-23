import React, { useState, useContext } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../../css/Chart.css";
// import "../App.css";

//Images

import linechart from "../../assets/images/linechart.png";
import areachart from "../../assets/images/areachart.png";
import violin from "../../assets/images/violin.png";
import gaugechart from "../../assets/images/gaugechart.png";
import barchart from "../../assets/images/barchart.png";
import piechart from "../../assets/images/piechart.png";

//Comonent
import LineAreaChartSingleValue from "../../chartsEMS/LineAreaChartSingleValue";
import LineChartSingleValue from "../../chartsEMS/LineChartSingleValue";
import LineBarChart from "../../chartsEMS/LineBarChart";

import LineAreaChart from "../../chartsEMS/LineAreaChart";
import LineChart from "../../chartsEMS/LineChart";
import LineBarChartMulValue from "../../chartsEMS/LineBarChartMulValue";

import ChartDataContextAPI from "../../Context/ChartDataContext/ChartDataContextAPI";

import Dropdown from "react-bootstrap/Dropdown";
import useLocalStorage from "use-local-storage";

// //Plotly Charts

// import PieChart from "../Charts/PlotlyJS/PieChart";

const Charts = () => {
  const [board, setBoard] = useState([]);
  const [value, setValue] = useLocalStorage("");
  const context = useContext(ChartDataContextAPI);

  const chartData = [
    { label: "Frequency", value: "Frequency" },
    { label: "LNV", value: "LNV" },
    { label: "LLV", value: "LLV" },
    { label: "Phase wise current", value: "Phase wise current" },
    {
      label: "Active_Energy",
      value: "Active_Energy",
    },
    {
      label: "Active_Power_Total",
      value: "Active_Power_Total",
    },
  ];
  const PictureList = [
    {
      id: 1,
      url: linechart,
      name: "Time Series",
      component:
        value === "LNV" ? (
          <LineChart
            name="Line to Neutral Voltage"
            timestamp1={context.dateTime}
            parameterChart1={context.dataMeter.Vrn}
            parameterChart2={context.dataMeter.Vyn}
            parameterChart3={context.dataMeter.Vbn}
            traceOneName="Vrn"
            traceTwoName="Vyn"
            traceThreeName="Vbn"
          />
        ) : value === "LLV" ? (
          <LineChart
            name="Line to Line Voltage"
            timestamp1={context.dateTime}
            parameterChart1={context.dataMeter.Vry}
            parameterChart2={context.dataMeter.Vyb}
            parameterChart3={context.dataMeter.Vbr}
            traceOneName="Vry"
            traceTwoName="Vyb"
            traceThreeName="Vbr"
          />
        ) : (
          <LineChartSingleValue
            name={
              value === "Active_Energy"
                ? "Active Energy"
                : value === "Active_Power_Total"
                ? "Active Power"
                : value === "Frequency"
                ? "Frequency"
                : "No Data Found"
            }
            timestamp1={context.dateTime}
            parameterChart1={
              value === "Active_Energy" ? (
                context.dataMeter.Active_Energy
              ) : value === "Active_Power_Total" ? (
                context.dataMeter.Active_Power_Total
              ) : value === "Frequency" ? (
                context.dataMeter.Frequency
              ) : (
                <h1>No Data</h1>
              )
            }
          />
        ),
    },
    {
      id: 2,
      url: barchart,
      name: "Proportined",
      component:
        value === "LNV" ? (
          <LineBarChartMulValue
            name="Line to Neutral Voltage"
            timestamp1={context.dateTime}
            parameterChart1={context.dataMeter.Vrn}
            parameterChart2={context.dataMeter.Vyn}
            parameterChart3={context.dataMeter.Vbn}
            traceOneName="Vrn"
            traceTwoName="Vyn"
            traceThreeName="Vbn"
          />
        ) : value === "LLV" ? (
          <LineBarChartMulValue
            name="Line to Line Voltage"
            timestamp1={context.dateTime}
            parameterChart1={context.dataMeter.Vry}
            parameterChart2={context.dataMeter.Vyb}
            parameterChart3={context.dataMeter.Vbr}
            traceOneName="Vry"
            traceTwoName="Vyb"
            traceThreeName="Vbr"
          />
        ) : (
          <LineBarChart
            name={
              value === "Active_Energy"
                ? "Active Energy"
                : value === "Active_Power_Total"
                ? "Active Power"
                : value === "Frequency"
                ? "Frequency"
                : "No Data Found"
            }
            timestamp1={context.dateTime}
            parameterChart1={
              value === "Active_Energy" ? (
                context.dataMeter.Active_Energy
              ) : value === "Active_Power_Total" ? (
                context.dataMeter.Active_Power_Total
              ) : value === "Frequency" ? (
                context.dataMeter.Frequency
              ) : (
                <h1>No Data</h1>
              )
            }
          />
        ),
    },
    {
      id: 3,
      url: areachart,
      name: "Time Series",
      component:
        value === "LNV" ? (
          <LineAreaChart
            name="Line to Neutral Voltage"
            timestamp1={context.dateTime}
            parameterChart1={context.dataMeter.Vrn}
            parameterChart2={context.dataMeter.Vyn}
            parameterChart3={context.dataMeter.Vbn}
            traceOneName="Vrn"
            traceTwoName="Vyn"
            traceThreeName="Vbn"
          />
        ) : value === "LLV" ? (
          <LineAreaChart
            name="Line to Line Voltage"
            timestamp1={context.dateTime}
            parameterChart1={context.dataMeter.Vry}
            parameterChart2={context.dataMeter.Vyb}
            parameterChart3={context.dataMeter.Vbr}
            traceOneName="Vry"
            traceTwoName="Vyb"
            traceThreeName="Vbr"
          />
        ) : (
          <LineAreaChartSingleValue
            name={
              value === "Active_Energy"
                ? "Active Energy"
                : value === "Active_Power_Total"
                ? "Active Power"
                : value === "Frequency"
                ? "Frequency"
                : "No Data Found"
            }
            timestamp1={context.dateTime}
            parameterChart1={
              value === "Active_Energy" ? (
                context.dataMeter.Active_Energy
              ) : value === "Active_Power_Total" ? (
                context.dataMeter.Active_Power_Total
              ) : value === "Frequency" ? (
                context.dataMeter.Frequency
              ) : (
                <h1>No Data</h1>
              )
            }
          />
        ),
    },

    // {
    //   id: 5,
    //   name: "Categorical",
    //   url: piechart,
    //   component: <PieChart />,
    // },
  ];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    //setBoard((board) => [...board, pictureList[0]]); //for multiple drag and drop
    setBoard([pictureList[0]]); // for replacing
  };

  console.log(context.dataMeter.Frequency);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }} className="m-1">
        <span style={{ fontWeight: "500", fontSize: "12px" }}>Data</span>
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          style={{ width: "100%" }}
          id="standard-select-currency"
          name="plant"
          className="textField"
          select
          fullWidth
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            window.location.reload();
          }}
          variant="standard"
        >
          <option
            selected
            disabled
            value=""
            style={{ backgroundColor: "skyblue" }}
          >
            Please select
          </option>

          {chartData.map((option) => {
            return <option>{option.label}</option>;
          })}
        </select>
      </div>
      <div className="mainChartContainer">
        <div className="images">
          {PictureList.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
          })}
        </div>
        <div className="chartContainer" ref={drop}>
          {board.map((picture) => {
            return (
              <Picture
                // url={linechart}
                component={picture.component}
                id={picture.id}
                name={picture.name}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Charts;
