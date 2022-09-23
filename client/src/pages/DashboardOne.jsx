import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Chart from "../PlotlyChart/Chart";
import VerticalBarChart from "../chartsEMS/VarticalBarChart";
import AverageCurrent from "../chartsEMS/AverageCurrent";
import HorizontalBarChart from "../chartsEMS/HorizonatalBarCharts";
import LineAreaChart from "../chartsEMS/LineAreaChart";
// import Footer from "../pages/Footer";
import "../css/DashboardOne.css";

class DashboardOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp1: "",
      timestamp2: "",
      timestamp3: "",
      timestamp4: "",
      setVal: "",

      fiveMinuteAgo: [],
      oneHourAgoData: [],
      oneDayAgoData: [],
      oneWeekAgoData: [],
      oneMonthAgoData: [],
      meterList: [],
      listOfParameter: [],

      materName: "",
      parameterNameChart1: "",
      parameterNameChart2: "",
      parameterNameChart3: "",
      parameterNameChart4: "",
      selectedParameterData: "",

      defaultDataForOtherMeter: "",

      defaultData: "",
      selectedParameterDataChart1: "",
      selectedParameterDataChart2: "",
      selectedParameterDataChart3: "",
      selectedParameterDataChart4: "",
    };
    this.postSelectedParameterChart1 =
      this.postSelectedParameterChart1.bind(this);
    this.postSelectedParameterChart2 =
      this.postSelectedParameterChart2.bind(this);
    this.fetchMeterNameInfo = this.fetchMeterNameInfo.bind(this);
    this.getDefaultMeterData = this.getDefaultMeterData.bind(this);
    // this.fetchParamterMeterWiseInfo =
    //   this.fetchParamterMeterWiseInfo.bind(this);
  }

  //Fetch all meter for selection and based on this show all parameter which belogs the selected meter
  fetchMeterNameInfo = async () => {
    try {
      const res = await fetch("/getAllMeters", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data[0].meterList);
      this.setState({ meterList: data[0].meterList });
      // console.log(this.state.meterList);
    } catch (error) {
      // console.log(error);
      console.log("Not getting meter data !!!");
    }
  };

  //fetch all parameter based on selected meter
  fetchParamterMeterWiseInfo = async () => {
    // if (this.state.defaultDataForOtherMeter) {
    //   this.setState({ defaultDataForOtherMeter: "" });
    // }

    try {
      const res = await fetch("/getParameterMeterWise", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      this.setState({ defaultDataForOtherMeter: data });

      // console.log(this.state.meterList);
    } catch (error) {
      console.log("Not getting meter data !!!");
    }
  };
  //for meter
  postSelectedMeter = async (e) => {
    if (e) {
      this.setState({
        materName: e.target.value,
        selectedParameterDataChart1: undefined,
        timestamp1: undefined,
        parameterNameChart1: undefined,
        selectedParameterDataChart2: undefined,
        timestamp2: undefined,
        parameterNameChart2: undefined,
        selectedParameterDataChart3: undefined,
        timestamp3: undefined,
        parameterNameChart3: undefined,
        selectedParameterDataChart4: undefined,
        timestamp4: undefined,
        parameterNameChart4: undefined,
      });
    }
    console.log("Before_____", this.state.defaultDataForOtherMeter);
    // console.log(e.target.value);
    // console.log(this.state.parameter);
    try {
      const res = await fetch("/postSelectedMeter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meterName: e ? e.target.value : "",
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("Data Post Successful");
        this.fetchParamterMeterWiseInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for parameter chart1
  postSelectedParameterChart1 = async (e) => {
    // this.setState({
    //   parameter: { parameterNameChart1: e.target.value },
    // });
    this.setState({ parameterNameChart1: e.target.value });
    // console.log(e.target.value);
    // console.log(this.state.parameter);
    try {
      const res = await fetch("/postSelectedParameterChart1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parameterNameChart1: e.target.value,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("Data Post Successful");
        this.getSelectedParameterChart1();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for parameter chart2
  postSelectedParameterChart2 = async (e) => {
    this.setState({ parameterNameChart2: e.target.value });
    // console.log(e.target.value);
    // console.log(this.state.parameter);
    try {
      const res = await fetch("/postSelectedParameterChart2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parameterNameChart2: e.target.value,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("Data Post Successful");
        this.getSelectedParameterChart2();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for parameter chart3
  postSelectedParameterChart3 = async (e) => {
    this.setState({ parameterNameChart3: e.target.value });
    // console.log(e.target.value);
    // console.log(this.state.parameter);
    try {
      const res = await fetch("/postSelectedParameterChart3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parameterNameChart3: e.target.value,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("Data Post Successful");
        this.getSelectedParameterChart3();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for parameter chart4
  postSelectedParameterChart4 = async (e) => {
    this.setState({ parameterNameChart4: e.target.value });
    // console.log(e.target.value);
    // console.log(this.state.parameter);
    try {
      const res = await fetch("/postSelectedParameterChart4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parameterNameChart4: e.target.value,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("Data Post Successful");
        this.getSelectedParameterChart4();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //geting data of chart1
  getSelectedParameterChart1 = async () => {
    try {
      const res = await fetch("/getSelectedParameterChart1", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      let timestamp = [];
      let selectedParameterDataChart1 = [];

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        // console.log(testVar);
        timestamp.push(data[i].status.datetime);
        selectedParameterDataChart1.push(
          data[i].status[this.state.parameterNameChart1]
        );
        // console.log(data[i].status[testVar]);
        // selectedParameterDataChart1.push(data[i].status.Current_Average);
      }
      this.setState({
        selectedParameterDataChart1,
        timestamp1: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //geting data of chart2
  getSelectedParameterChart2 = async () => {
    try {
      const res = await fetch("/getSelectedParameterChart2", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      let timestamp = [];
      let selectedParameterDataChart2 = [];

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        // console.log(testVar);
        timestamp.push(data[i].status.datetime);
        selectedParameterDataChart2.push(
          data[i].status[this.state.parameterNameChart2]
        );
        // console.log(data[i].status[testVar]);
        // selectedParameterDataChart2.push(data[i].status.Current_Average);
      }
      this.setState({
        selectedParameterDataChart2,
        timestamp2: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //geting data of chart3
  getSelectedParameterChart3 = async () => {
    try {
      const res = await fetch("/getSelectedParameterChart3", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      let timestamp = [];
      let selectedParameterDataChart3 = [];

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        // console.log(testVar);
        timestamp.push(data[i].status.datetime);
        selectedParameterDataChart3.push(
          data[i].status[this.state.parameterNameChart3]
        );
        // console.log(data[i].status[testVar]);
        // selectedParameterDataChart2.push(data[i].status.Current_Average);
      }
      this.setState({
        selectedParameterDataChart3,
        timestamp3: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //geting data of chart4
  getSelectedParameterChart4 = async () => {
    try {
      const res = await fetch("/getSelectedParameterChart4", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      let timestamp = [];
      let selectedParameterDataChart4 = [];

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        // console.log(testVar);
        timestamp.push(data[i].status.datetime);
        selectedParameterDataChart4.push(
          data[i].status[this.state.parameterNameChart4]
        );
        // console.log(data[i].status[testVar]);
        // selectedParameterDataChart2.push(data[i].status.Current_Average);
      }
      this.setState({
        selectedParameterDataChart4,
        timestamp4: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getDefaultMeterData = async () => {
    try {
      const res = await fetch("/getDefaultMeterData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);

      this.setState({
        defaultData: data,
      });
      // let finalData = [];
      // for (let i = 0; i < data.finalData.length; i++) {
      //   console.log(data.finalData[i].Current_Average);
      //   finalData.push(data.finalData[i].Current_Average);
      // }
      // console.log(finalData);
      // this.setState({
      //   defaultValues: {
      //     // defaultMeterName: data.selectedMeterparameter,
      //     // defaultParameterName: data.finalParameter,
      //     defaultData: data.firstParameterData,
      //   },
      // });
      // let timestamp = [];
      // let selectedParameterData = [];

      // for (let i = 0; i < data.length; i++) {
      //   timestamp.push(data[i].status.datetime);
      //   selectedParameterData.push(
      //     data[i].status[this.state.parameterName]
      //   );
      // }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetchMeterNameInfo();
    this.getDefaultMeterData();
    this.postSelectedMeter();
  }

  // One Hour Ago Data

  oneHourAgoData = () => {
    this.setState({ setVal: "oneHour" });

    // console.log("hello");
    const oneHourAgoData = [];

    const date2 = new Date(Date.now());
    var oneHourAgo = new Date(date2.getTime() - 1000 * 60 * 60);

    //For loop for time stamp 1
    for (let i = 0; i < this.state.timestamp.length; i++) {
      const newTime = new Date(this.state.timestamp[i]).getTime();
      const newTime2 = new Date(newTime);
      newTime2.setHours(newTime2.getHours() - 0);
      newTime2.setMinutes(newTime2.getMinutes() - 0); //

      // console.log(new Date(newTime2.setHours(newTime2.getHours())));

      if (
        oneHourAgo < new Date(newTime2.setHours(newTime2.getHours())) &&
        date2 > new Date(newTime2.setHours(newTime2.getHours()))
      ) {
        // console.log(
        //   ` True: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        // );

        oneHourAgoData.push(new Date(newTime2.setHours(newTime2.getHours())));
      } else {
        // console.log(
        //   ` False: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        // );
      }
    }
    this.setState({ oneHourAgoData: oneHourAgoData });
  };

  // One Day Ago Data
  oneDayAgoData = () => {
    this.setState({ setVal: "oneDay" });
    const oneDayAgoData = [];

    const date2 = new Date(Date.now());
    var oneDayAgo = new Date(date2.getTime() - 1000 * 60 * 60 * 24);

    //for loop for timestamp 1
    for (let i = 0; i < this.state.timestamp.length; i++) {
      const newTime = new Date(this.state.timestamp[i]).getTime();
      const newTime2 = new Date(newTime);
      newTime2.setHours(newTime2.getHours() - 0);
      newTime2.setMinutes(newTime2.getMinutes() - 0); //

      // console.log(new Date(newTime2.setHours(newTime2.getHours())));

      if (
        oneDayAgo < new Date(newTime2.setHours(newTime2.getHours())) &&
        date2 > new Date(newTime2.setHours(newTime2.getHours()))
      ) {
        // console.log(
        //   ` True: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        // );

        oneDayAgoData.push(new Date(newTime2.setHours(newTime2.getHours())));
      } else {
        // console.log(
        //   ` False: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        // );
      }
    }
    this.setState({ oneDayAgoData: oneDayAgoData });
  };

  //One Week Ago Data
  oneWeekAgoData = () => {
    this.setState({ setVal: "oneWeek" });
    // alert("hello");
    const oneWeekAgoData = [];

    const date2 = new Date(Date.now());
    var oneWeekAgo = new Date(date2.getTime() - 1000 * 60 * 60 * 168);

    //for loop for timestamp 1
    for (let i = 0; i < this.state.timestamp.length; i++) {
      const newTime = new Date(this.state.timestamp[i]).getTime();
      const newTime2 = new Date(newTime);
      newTime2.setHours(newTime2.getHours() - 0);
      newTime2.setMinutes(newTime2.getMinutes() - 0); //

      // console.log(new Date(newTime2.setHours(newTime2.getHours())));

      if (
        oneWeekAgo < new Date(newTime2.setHours(newTime2.getHours())) &&
        date2 > new Date(newTime2.setHours(newTime2.getHours()))
      ) {
        // console.log(
        //   ` True: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        // );

        oneWeekAgoData.push(new Date(newTime2.setHours(newTime2.getHours())));
      } else {
        // console.log(
        //   ` False: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        // );
      }
    }
    this.setState({ oneWeekAgoData: oneWeekAgoData });
  };

  //One Month Ago Data
  oneMonthAgoData = () => {
    let timestampForFiltering = this.state.timestamp
      ? this.state.timestamp
      : this.state.defaultData.dateTime;

    this.setState({ setVal: "oneMonth" });
    // alert("hello");
    const oneMonthAgoData = [];

    const date2 = new Date(Date.now());
    var oneMonthAgo = new Date(date2.getTime() - 1000 * 60 * 60 * 720);

    //for loop for timestamp 1
    for (let i = 0; i < timestampForFiltering.length; i++) {
      const newTime = new Date(timestampForFiltering[i]).getTime();
      const newTime2 = new Date(newTime);
      newTime2.setHours(newTime2.getHours() - 0);
      newTime2.setMinutes(newTime2.getMinutes() - 0); //

      // console.log(new Date(newTime2.setHours(newTime2.getHours())));

      if (
        oneMonthAgo < new Date(newTime2.setHours(newTime2.getHours())) &&
        date2 > new Date(newTime2.setHours(newTime2.getHours()))
      ) {
        console.log(
          ` True: ${new Date(newTime2.setHours(newTime2.getHours()))}`
        );

        oneMonthAgoData.push(new Date(newTime2.setHours(newTime2.getHours())));
      } else {
      }
    }
    this.setState({ oneMonthAgoData: oneMonthAgoData });
  };

  allDataSet = () => {
    this.setState({ setVal: "" });
  };

  render() {
    return (
      <>
        <div className="dashboardOne">
          <Container>
            <Row className="mb-3 mt-3">
              <Col sm={12} lg={12}>
                <div className="col_div">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    // style={{ width: "94%", marginLeft: "-0.6rem" }}
                    id="standard-select-currency"
                    name="materName"
                    className="textField"
                    fullWidth
                    select // label="Select"
                    autoComplete="off"
                    variant="standard"
                    value={this.state.meterName}
                    onChange={(e) => this.postSelectedMeter(e)}
                  >
                    <option selected disabled value="">
                      {this.state.meterList[0]}
                    </option>
                    {this.state.meterList === undefined
                      ? ""
                      : this.state.meterList.map((meters) => {
                          return <option value={meters}>{meters}</option>;
                        })}
                  </select>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} lg={6}>
                <div className="col_div">
                  {/* <button id="filterBtn" onClick={this.oneHourAgoData}>
                    1hr
                  </button>
                  <button id="filterBtn" onClick={this.oneDayAgoData}>
                    1Day
                  </button>
                  <button id="filterBtn" onClick={this.oneWeekAgoData}>
                    1Week
                  </button>
                  <button id="filterBtn" onClick={this.oneMonthAgoData}>
                    1Month
                  </button>
                  <button id="filterBtn" onClick={this.allDataSet}>
                    All
                  </button> */}

                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    // style={{ width: "94%", marginLeft: "-0.6rem" }}
                    id="standard-select-currency"
                    name="parameterNameChart1"
                    className="textField"
                    fullWidth
                    select // label="Select"
                    autoComplete="off"
                    // value={this.state.parameterNameChart1}
                    value={
                      this.state.parameterNameChart1
                        ? this.state.parameterNameChart1
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[0]
                        : ""
                    }
                    onChange={(e) => this.postSelectedParameterChart1(e)}
                    // error={
                    //   formik.touched.object_head &&
                    //   Boolean(formik.errors.object_head)
                    // }
                    // helperText={
                    //   formik.touched.object_head && formik.errors.object_head
                    // }
                    variant="standard"
                  >
                    <option selected disabled value="">
                      {this.state.materName === ""
                        ? this.state.defaultData
                          ? this.state.defaultData.finalParameter[0]
                          : ""
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[0]
                        : ""}
                    </option>
                    {(this.state.materName === "" ||
                      this.state.materName === undefined) &&
                    this.state.defaultDataForOtherMeter
                      .perticularMeterParameter === undefined
                      ? this.state.defaultData
                        ? this.state.defaultData.finalParameter.map(
                            (parameters) => {
                              return (
                                <option value={parameters}>{parameters}</option>
                              );
                            }
                          )
                        : ""
                      : this.state.defaultDataForOtherMeter
                      ? this.state.defaultDataForOtherMeter.perticularMeterParameter.map(
                          (parameters) => {
                            return (
                              <option value={parameters}>{parameters}</option>
                            );
                          }
                        )
                      : ""}
                  </select>
                  <div className="dashboardOneChart">
                    <VerticalBarChart
                      // name="Current Phases (Meter 1) "
                      yaxis={this.state.parameterNameChart1}
                      // timestamp1={
                      //   this.state.setVal === "oneDay"
                      //     ? this.state.oneDayAgoData
                      //     : this.state.setVal === "oneHour"
                      //     ? this.state.oneHourAgoData
                      //     : this.state.setVal === "oneWeek"
                      //     ? this.state.oneWeekAgoData
                      //     : this.state.setVal === "oneMonth"
                      //     ? this.state.oneMonthAgoData
                      //     : this.state.materName
                      //     ? this.state.parameterNameChart1 === ""
                      //       ? this.state.defaultDataForOtherMeter.dateTime
                      //       : this.state.timestamp1 === undefined
                      //       ? this.state.defaultDataForOtherMeter.dateTime
                      //       : this.state.timestamp1
                      //     : this.state.materName === ""
                      //     ? this.state.parameterNameChart1 === ""
                      //       ? this.state.defaultData.dateTime
                      //       : this.state.timestamp1
                      //     : ""
                      // }
                      timestamp1={this.state.timestamp1}
                      parameterChart1={
                        this.state.materName
                          ? this.state.parameterNameChart1 === ""
                            ? this.state.defaultDataForOtherMeter
                                .firstParameterData
                            : this.state.selectedParameterDataChart1 ===
                              undefined
                            ? this.state.defaultDataForOtherMeter
                                .firstParameterData
                            : this.state.selectedParameterDataChart1
                          : this.state.materName === ""
                          ? this.state.parameterNameChart1 === ""
                            ? this.state.defaultData.firstParameterData
                            : this.state.selectedParameterDataChart1
                          : ""
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col sm={12} lg={6}>
                <div className="col_div">
                  {/* <button id="filterBtn" onClick={this.oneHourAgoData}>
                    1hr
                  </button>
                  <button id="filterBtn" onClick={this.oneDayAgoData}>
                    1Day
                  </button>
                  <button id="filterBtn" onClick={this.oneWeekAgoData}>
                    1Week
                  </button>
                  <button id="filterBtn" onClick={this.oneMonthAgoData}>
                    1Month
                  </button>
                  <button id="filterBtn" onClick={this.allDataSet}>
                    All
                  </button> */}
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    // style={{ width: "94%", marginLeft: "-0.6rem" }}
                    id="standard-select-currency"
                    name="parameterNameChart2"
                    className="textField"
                    fullWidth
                    select // label="Select"
                    autoComplete="off"
                    value={
                      this.state.parameterNameChart2
                        ? this.state.parameterNameChart2
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[1]
                        : ""
                    }
                    onChange={(e) => this.postSelectedParameterChart2(e)}
                    // value={formik.values.object_head}
                    // onChange={formik.handleChange}
                    // error={
                    //   formik.touched.object_head &&
                    //   Boolean(formik.errors.object_head)
                    // }
                    // helperText={
                    //   formik.touched.object_head && formik.errors.object_head
                    // }
                    variant="standard"
                  >
                    <option selected disabled value="">
                      {(this.state.materName === "" ||
                        this.state.materName === undefined) &&
                      this.state.defaultDataForOtherMeter
                        .perticularMeterParameter === undefined
                        ? this.state.defaultData
                          ? this.state.defaultData.finalParameter[1]
                          : ""
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[1]
                        : ""}
                    </option>
                    {(this.state.materName === "" ||
                      this.state.materName === undefined) &&
                    this.state.defaultDataForOtherMeter
                      .perticularMeterParameter === undefined
                      ? this.state.defaultData
                        ? this.state.defaultData.finalParameter.map(
                            (parameters) => {
                              return (
                                <option value={parameters}>{parameters}</option>
                              );
                            }
                          )
                        : ""
                      : this.state.defaultDataForOtherMeter
                      ? this.state.defaultDataForOtherMeter.perticularMeterParameter.map(
                          (parameters) => {
                            return (
                              <option value={parameters}>{parameters}</option>
                            );
                          }
                        )
                      : ""}
                  </select>
                  <div className="dashboardOneChart">
                    <AverageCurrent
                      // chartTitle="Average Current"
                      yaxis="Current"
                      // timestamp2={
                      //   this.state.setVal === "fiveMinute"
                      //     ? this.state.fiveMinuteAgo
                      //     : this.state.setVal === "oneDay"
                      //     ? this.state.oneDayAgoData
                      //     : this.state.setVal === "oneHour"
                      //     ? this.state.oneHourAgoData
                      //     : this.state.setVal === "oneWeek"
                      //     ? this.state.oneWeekAgoData
                      //     : this.state.setVal === "oneMonth"
                      //     ? this.state.oneMonthAgoData
                      //     : this.state.materName
                      //     ? this.state.parameterNameChart2 === ""
                      //       ? this.state.defaultDataForOtherMeter.dateTime
                      //       : this.state.timestamp2 === undefined
                      //       ? this.state.defaultDataForOtherMeter.dateTime
                      //       : this.state.timestamp2
                      //     : this.state.materName === ""
                      //     ? this.state.parameterNameChart2 === ""
                      //       ? this.state.defaultData.dateTime
                      //       : this.state.timestamp2
                      //     : ""
                      // }
                      timestamp2={this.state.timestamp2}
                      parameterChart2={
                        this.state.materName
                          ? this.state.parameterNameChart2 === ""
                            ? this.state.defaultDataForOtherMeter
                                .secondParameterData
                            : this.state.selectedParameterDataChart2 ===
                              undefined
                            ? this.state.defaultDataForOtherMeter
                                .secondParameterData
                            : this.state.selectedParameterDataChart2
                          : this.state.materName === ""
                          ? this.state.parameterNameChart2 === ""
                            ? this.state.defaultData.secondParameterData
                            : this.state.selectedParameterDataChart2
                          : ""
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} lg={6}>
                <div className="col_div">
                  {/* <button id="filterBtn" onClick={this.oneHourAgoData}>
                    1hr
                  </button>
                  <button id="filterBtn" onClick={this.oneDayAgoData}>
                    1Day
                  </button>
                  <button id="filterBtn" onClick={this.oneWeekAgoData}>
                    1Week
                  </button>
                  <button id="filterBtn" onClick={this.oneMonthAgoData}>
                    1Month
                  </button>
                  <button id="filterBtn" onClick={this.allDataSet}>
                    All
                  </button> */}
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    // style={{ width: "94%", marginLeft: "-0.6rem" }}
                    id="standard-select-currency"
                    name="parameterNameChart3"
                    className="textField"
                    fullWidth
                    select // label="Select"
                    autoComplete="off"
                    value={
                      this.state.parameterNameChart3
                        ? this.state.parameterNameChart3
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[2]
                        : ""
                    }
                    onChange={(e) => this.postSelectedParameterChart3(e)}
                    // value={formik.values.object_head}
                    // onChange={formik.handleChange}
                    // error={
                    //   formik.touched.object_head &&
                    //   Boolean(formik.errors.object_head)
                    // }
                    // helperText={
                    //   formik.touched.object_head && formik.errors.object_head
                    // }
                    variant="standard"
                  >
                    <option selected disabled value="">
                      {(this.state.materName === "" ||
                        this.state.materName === undefined) &&
                      this.state.defaultDataForOtherMeter
                        .perticularMeterParameter === undefined
                        ? this.state.defaultData
                          ? this.state.defaultData.finalParameter[2]
                          : ""
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[2]
                        : ""}
                    </option>
                    {(this.state.materName === "" ||
                      this.state.materName === undefined) &&
                    this.state.defaultDataForOtherMeter
                      .perticularMeterParameter === undefined
                      ? this.state.defaultData
                        ? this.state.defaultData.finalParameter.map(
                            (parameters) => {
                              return (
                                <option value={parameters}>{parameters}</option>
                              );
                            }
                          )
                        : ""
                      : this.state.defaultDataForOtherMeter
                      ? this.state.defaultDataForOtherMeter.perticularMeterParameter.map(
                          (parameters) => {
                            return (
                              <option value={parameters}>{parameters}</option>
                            );
                          }
                        )
                      : ""}
                  </select>
                  <div className="dashboardOneChart">
                    <HorizontalBarChart
                      // name="Current Phases (Meter 3) "
                      yaxis="Current"
                      // timestamp3={
                      //   this.state.setVal === "fiveMinute"
                      //     ? this.state.fiveMinuteAgo
                      //     : this.state.setVal === "oneDay"
                      //     ? this.state.oneDayAgoData
                      //     : this.state.setVal === "oneHour"
                      //     ? this.state.oneHourAgoData
                      //     : this.state.setVal === "oneWeek"
                      //     ? this.state.oneWeekAgoData
                      //     : this.state.setVal === "oneMonth"
                      //     ? this.state.oneMonthAgoData
                      //     : this.state.materName
                      //     ? this.state.parameterNameChart3 === ""
                      //       ? this.state.defaultDataForOtherMeter.dateTime
                      //       : this.state.timestamp3 === undefined
                      //       ? this.state.defaultDataForOtherMeter.dateTime
                      //       : this.state.timestamp3
                      //     : this.state.materName === ""
                      //     ? this.state.parameterNameChart3 === ""
                      //       ? this.state.defaultData.dateTime
                      //       : this.state.timestamp3
                      //     : ""
                      // }
                      timestamp3={this.state.timestamp3}
                      parameterChart3={
                        this.state.materName
                          ? this.state.parameterNameChart3 === ""
                            ? this.state.defaultDataForOtherMeter
                                .thirdParameterData
                            : this.state.selectedParameterDataChart3 ===
                              undefined
                            ? this.state.defaultDataForOtherMeter
                                .thirdParameterData
                            : this.state.selectedParameterDataChart3
                          : this.state.materName === ""
                          ? this.state.parameterNameChart3 === ""
                            ? this.state.defaultData.thirdParameterData
                            : this.state.selectedParameterDataChart3
                          : ""
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col sm={12} lg={6}>
                <div className="col_div">
                  {/* <button id="filterBtn" onClick={this.oneHourAgoData}>
                    1hr
                  </button>
                  <button id="filterBtn" onClick={this.oneDayAgoData}>
                    1Day
                  </button>
                  <button id="filterBtn" onClick={this.oneWeekAgoData}>
                    1Week
                  </button>
                  <button id="filterBtn" onClick={this.oneMonthAgoData}>
                    1Month
                  </button>
                  <button id="filterBtn" onClick={this.allDataSet}>
                    All
                  </button> */}
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    // style={{ width: "94%", marginLeft: "-0.6rem" }}
                    id="standard-select-currency"
                    name="parameterNameChart4"
                    className="textField"
                    fullWidth
                    select // label="Select"
                    autoComplete="off"
                    value={
                      this.state.parameterNameChart4
                        ? this.state.parameterNameChart4
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[3]
                        : ""
                    }
                    onChange={(e) => this.postSelectedParameterChart4(e)}
                    // value={formik.values.object_head}
                    // onChange={formik.handleChange}
                    // error={
                    //   formik.touched.object_head &&
                    //   Boolean(formik.errors.object_head)
                    // }
                    // helperText={
                    //   formik.touched.object_head && formik.errors.object_head
                    // }
                    variant="standard"
                  >
                    <option selected disabled value="">
                      {(this.state.materName === "" ||
                        this.state.materName === undefined) &&
                      this.state.defaultDataForOtherMeter
                        .perticularMeterParameter === undefined
                        ? this.state.defaultData
                          ? this.state.defaultData.finalParameter[3]
                          : ""
                        : this.state.defaultDataForOtherMeter
                        ? this.state.defaultDataForOtherMeter
                            .perticularMeterParameter[3]
                        : ""}
                    </option>
                    {(this.state.materName === "" ||
                      this.state.materName === undefined) &&
                    this.state.defaultDataForOtherMeter
                      .perticularMeterParameter === undefined
                      ? this.state.defaultData
                        ? this.state.defaultData.finalParameter.map(
                            (parameters) => {
                              return (
                                <option value={parameters}>{parameters}</option>
                              );
                            }
                          )
                        : ""
                      : this.state.defaultDataForOtherMeter
                      ? this.state.defaultDataForOtherMeter.perticularMeterParameter.map(
                          (parameters) => {
                            return (
                              <option value={parameters}>{parameters}</option>
                            );
                          }
                        )
                      : ""}
                  </select>
                </div>

                <div className="dashboardOneChart">
                  <LineAreaChart
                    // name="Current Phases (Meter 4) "
                    yaxis="Current"
                    // timestamp4={
                    //   this.state.setVal === "fiveMinute"
                    //     ? this.state.fiveMinuteAgo
                    //     : this.state.setVal === "oneDay"
                    //     ? this.state.oneDayAgoData
                    //     : this.state.setVal === "oneHour"
                    //     ? this.state.oneHourAgoData
                    //     : this.state.setVal === "oneWeek"
                    //     ? this.state.oneWeekAgoData
                    //     : this.state.setVal === "oneMonth"
                    //     ? this.state.oneMonthAgoData
                    //     : this.state.materName
                    //     ? this.state.parameterNameChart4 === ""
                    //       ? this.state.defaultDataForOtherMeter.dateTime
                    //       : this.state.timestamp4 === undefined
                    //       ? this.state.defaultDataForOtherMeter.dateTime
                    //       : this.state.timestamp4
                    //     : this.state.materName === ""
                    //     ? this.state.parameterNameChart4 === ""
                    //       ? this.state.defaultData.dateTime
                    //       : this.state.timestamp4
                    //     : ""
                    // }
                    timestamp4={this.state.timestamp4}
                    parameterChart4={
                      this.state.materName
                        ? this.state.parameterNameChart4 === ""
                          ? this.state.defaultDataForOtherMeter
                              .fourthParameterData
                          : this.state.selectedParameterDataChart4 === undefined
                          ? this.state.defaultDataForOtherMeter
                              .fourthParameterData
                          : this.state.selectedParameterDataChart4
                        : this.state.materName === ""
                        ? this.state.parameterNameChart4 === ""
                          ? this.state.defaultData.fourthParameterData
                          : this.state.selectedParameterDataChart4
                        : ""
                    }
                  />
                </div>
              </Col>
            </Row>
          </Container>

          {/* <Footer /> */}
        </div>
      </>
    );
  }
}

export default DashboardOne;
