import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Muse from "./muse";
import OpenBCI from "./openbci";
import { LineChart, Line } from "recharts";
import styled from "styled-components";
import Box from "./components/box";
import LineGraph from "./components/linegraph";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8080");

const data = [{ data: 1 }, { data: 2 }];

const Section = styled.div`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };

    this.addScript = src => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);
    };

    socket.on("eeg", data => console.log(data));
  }

  componentDidMount() {
    // BCIDevice.pack

    this.addScript(
      "https://drive.google.com/uc?export=view&id=1jG7w2D0NZIAFJYgtd25FYHT6jcoOY9FJ"
    );

    // BCIDevice.build
    this.addScript(
      "https://drive.google.com/uc?export=view&id=1qLcumUvtlX0vuIeowpVE6qHPDDfS7DjY"
    );

    //bci.jc
    this.addScript("https://cdn.jsdelivr.net/npm/bcijs@1.5.2/dist/bci.min.js");
  }

  updateData = recentData => {
    const newData = recentData;
    this.setState({ data: newData });
  };

  render() {
    //console.log(this.state.data[0]);
    return (
      <Section direction={"column"} height={"100vh"}>
        <button onClick={() => OpenBCI.startOpenBCI(this.updateData)}>
          Connect
        </button>
        <Section direction={"row"} height={"auto"}>
          <LineGraph channel={2} data={this.state.data} range={200} />
        </Section>
      </Section>
    );
  }
}

export default App;
