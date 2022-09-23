import React, { useState } from "react";
import "../../css/popup/Popup.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Images

import linechart from "../../assets/images/linechart.png";
import violin from "../../assets/images/violin.png";
import gaugechart from "../../assets/images/gaugechart.png";
import barchart from "../../assets/images/barchart.png";
import piechart from "../../assets/images/piechart.png";

//Components
import Charts from "../../pages/ChartComponent/Charts";
import LineChart from "../../charts/LineChart";
// import LineBarChart from "../../charts/LineBarChart";

const closeDiv = () => {
  document.getElementById("main_div").style.display = "none";
  document.querySelector(".password_div").style.display = "none";
  document.querySelector(".mainPage").style.pointerEvents = "auto";
};
const lineChart = () => {
  console.log("clickme");
  document.getElementById("lineChart").visibility = "visible";
};

const ChartCard = () => {
  const [timeSeries, setTimeSeries] = useState([]);
  return (
    <>
      <div id="main_div">
        {/* <span onClick={closeDiv} className="close">
          &times;
        </span> */}

        <br />
        {/* <Charts style={{ display: "none" }} timeSeries={timeSeries} /> */}
        {/* {timeSeries} */}
        <div id="main_div_inner">
          {timeSeries}
          <Container>
            <Row xs={4} md={3}>
              <Col>
                <p>Time Series</p>
                <img
                  className="chartCardImage"
                  onClick={() => {
                    setTimeSeries(<LineChart />);
                  }}
                  src={linechart}
                  alt=""
                />
              </Col>
              <Col>
                <p>Statical</p>
                <img
                  className="chartCardImage"
                  onClick={() => {
                    setTimeSeries(<LineBarChart />);
                  }}
                  src={violin}
                  alt=""
                />
              </Col>
              <Col>
                <p>Progressive</p>
                <img className="chartCardImage" src={gaugechart} alt="" />
              </Col>
            </Row>
            <Row xs={4} md={3} className="mt-3">
              <Col>
                <p>Proportioned</p>
                <img className="chartCardImage" src={barchart} alt="" />
              </Col>
              <Col>
                <p>Categorical</p>
                <img className="chartCardImage" src={piechart} alt="" />
              </Col>
              <Col>
                <p>Multi-variate</p>
                <img className="chartCardImage" src={linechart} alt="" />
              </Col>
            </Row>
          </Container>
        </div>
        <button
          onClick={closeDiv}
          className="btn btn-primary mb-2 mt-3"
          style={{}}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ChartCard;
