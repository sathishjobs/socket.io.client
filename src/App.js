import React, { Component } from 'react';
import logo from './logo.svg';
//initiate client socket
import io from 'socket.io-client';
import { Header, Segment, Table, Container } from 'semantic-ui-react'


import './App.css';

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      socket: io("http://localhost:3001", {
        transports: ["websocket"]
      }),
      sampleData: null
    }
    this.initSocket();
  }

  // componentDidMount() {
  //   console.log("CDM triggered");
  //   this.initSocket();
  // }

  initSocket() {
    this.state.socket.on("realTimeUpdate", (data) => {
      let randomNumber = Math.floor(Math.random() * 5);
      randomNumber = randomNumber++ > 5 ? randomNumber - 2 : randomNumber++;
      let sampleData = data.Table_cluster.slice(0, randomNumber ? randomNumber : 2);
      console.log(sampleData);
      this.setState({
        sampleData
      })
    })
  }

  render() {
    return (
      <Container>
        <br />
        <h2 className='header'>Real-Time Data Fetching from Socket.io</h2>
        <div className="rootWrapper">
          <div className="columnWrapper">
            <h1>Chat Window here</h1>
          </div>
          <div className="columnWrapper">
            <h3>Cluster Info</h3>
            <Table color={"green"}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Height</Table.HeaderCell>
                  <Table.HeaderCell>ULX</Table.HeaderCell>
                  <Table.HeaderCell>ULY</Table.HeaderCell>
                  <Table.HeaderCell>Width</Table.HeaderCell>
                  <Table.HeaderCell>Page Number</Table.HeaderCell>
                  <Table.HeaderCell>PDFID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              {
                this.state.sampleData ?
                  //load sample data 
                  this.state.sampleData.map((data, index) => (
                    <Table.Body key={index}>
                      <Table.Row>
                        <Table.Cell>{data.Cluster_Id}</Table.Cell>
                        <Table.Cell>{data.cluster_height}</Table.Cell>
                        <Table.Cell>{data.cluster_ulx}</Table.Cell>
                        <Table.Cell>{data.cluster_uly}</Table.Cell>
                        <Table.Cell>{data.cluster_width}</Table.Cell>
                        <Table.Cell>{data.pageNumber}</Table.Cell>
                        <Table.Cell>{data.pdfId}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))
                  :
                  //loading loader
                  <Table.Body>
                    <Table.Row><Table.Cell>loading....</Table.Cell></Table.Row>
                  </Table.Body>
              }
            </Table>

          </div>
        </div>
      </Container>
    );
  }
}

export default App;
