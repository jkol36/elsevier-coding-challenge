import React from 'react';

import './App.css';
import agent from 'superagent-bluebird-promise';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.state = {
      result: {name: [{}]}
    }
  }

  componentWillMount() {
    this.getData()
  }
  getData() {
    var headers = {
      'Accept': 'application/json+fhir'
  };
    agent.get(' https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/1316024')
    .set(headers)
    .then(res => {
      this.setState({
        result:res.body
      })
    })
    .catch(console.log)
  }

  render() {
    console.log(this.state)
    const data = [{
      name: this.state.result.name[0].text,
      age: 26,
      Gender: this.state.result.gender,
      Birthdate: this.state.result.birthDate ? this.state.result.birthDate: null,
    }]
   
    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Birthdate',
      accessor: 'Birthdate',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header:"Gender", // Custom header components!
      accessor: 'Gender'
    }]
   
    return (
      <>
        <div> 
          <h1> Patient Details</h1>
          <p> name: {this.state.result.name[0].text}</p>
          <p> Birthdate: {this.state.result.birthDate}</p>
          <p> gender: {this.state.result.gender}</p>
        </div>
        <div> 
          <h1> Patient Conditions</h1>
        </div>
      </>
    )
  }
}


