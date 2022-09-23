import React from "react";
import ReactDOM from "react-dom";
import Plot from "react-plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";

// const Plot = createPlotlyComponent(Plotly);

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: [],
      x: [],
      setData: 1,
    };
  }

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

  data = {
    type: "line",
    mode: "points",
    marker: { color: "#00FA96" },
  };
  layout = {
    xaxis: {
      rangeselector: this.selectorOptions,
      rangeslider: { visible: false },
    },
    // plot_bgcolor: "#b0bdeb",
    // paper_bgcolor: "#b0bdeb",
  };

  // limitData = {
  //     type: 'scatter',
  //     mode: 'line',
  //     x: [0, 20],
  //     y: [2, 2],

  // }
  // layout = {
  //     xaxis: {
  //         rangeselector: selectorOptions,
  //         rangeslider: { visible: false },

  //     }
  // }
  // fetchPowerInfo = async () => {
  //   try {
  //     const res = await fetch("/displayChartData", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     let x = [];
  //     let y = [];
  //     for (let i = 0; i < data.length; i++) {
  //       console.log(data);

  //       y.push(data[i].moisture);
  //       x.push(new Date(data[i].timestamp));
  //       // if(cnt === 100) clearInterval(interval);
  //     }
  //     this.setState({ x: x });
  //     this.setState({ y: y });
  //     // console.log(this.state.y)
  //     console.log(this.state.x);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  componentDidMount() {
    // setInterval(this.fetchPowerInfo, 300);
    this.streamData();
    // this.fetchPowerInfo();
  }

  addData = () => {
    this.setState((prevState) => ({ y: [...prevState.y, this.state.y] }));
    this.setState((prevState) => ({ x: [...prevState.x, this.state.x] }));
  };

  // resetData = () => {
  //     this.setState({ y: [1] })

  // }

  streamData = () => {
    const timer = setInterval(() => this.addData(), 1000);
    this.setState((prevState) => ({ ...prevState, timer }));
  };

  // stopData = () => {
  //     clearInterval(this.state.timer);
  // }
  hello = () => {
    this.setState({ setData: 0 });
  };

  render() {
    console.log(this.setData);
    return (
      <div>
        <div>
          {/* <button onClick={this.streamData}> Add data </button> */}
          {/* <button onClick={this.stopData}> Stop </button>
                    <button onClick={this.resetData}> Reset </button> */}
        </div>

        <Plot
          data={[
            {
              ...this.data,
              y: [10, 15, 13, 17],
              ...this.data,
              x: [1, 2, 3, 4],
            },
          ]}
          layout={this.layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "50%" }}
          showSendToCloud={true}
          config={{ modeBarButtonsToRemove: ["lasso", "select2d"] }}
        />
      </div>
    );
  }
}

export default LineChart;
