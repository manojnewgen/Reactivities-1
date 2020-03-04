import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';
//import { cars } from './demo';
//import { CarItem } from './CarItem';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  }
  componentDidMount() {

    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        console.log(response);
        this.setState({
          values: response.data
        })
      })
    /*
    this.setState({
      values: [{ id: 1, name: 'Value 101' }, { id: 2, name: 'value 102' }]
    })
    */
  }



  render() {
    return (
      <div className="App">
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}> {value.name} </List.Item>
          ))}
        </List>
      </div>
    );
  }

}

export default App;


/*
  <ul>
          {cars.map((car) => (
            <CarItem car={car} />
          ))}
        </ul>
*/