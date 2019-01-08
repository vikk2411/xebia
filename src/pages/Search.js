import React, { Component } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import Header from "../partials/Header"
import axios from "axios"
import "./Search.css"

const Option = Select.Option;

class Search extends React.Component {
  state = {
    data: [],
    value: undefined,
    fetching: false,
    searchCount: 0,
    planet: null
  }

  componentDidMount(){
    this.timer = setTimeout(() => {

    }, 60000)
  }

  componentWillUnmount(){
    clearTimeout(this.timer)
  }


  fetch(value, callback) {

    axios.get("https://swapi.co/api/planets?search="+value, { headers: {'Content-Type': 'application/json'} } )
    .then((res) => {
      console.log("res", res)
      let data = []

      res.data.results.forEach((r) => {
        data.push({
          value: r.name,
          population: r.population || 0,
          ...r
        });
      });

      callback(data);
    })
    .catch((err) => {
      console.log("err", err)
    })

  }

  handleSearch = (value) => {
    this.setState({fetching: true})
    const callback = data => this.setState({ data, fetching: false })
    this.fetch(value, callback);
  }

  handleChange = (value) => {
    console.log("calling onChange", value, this.state)
    const planet = this.state.data && this.state.data.filter((d) => d.name == value)[0]
    this.setState({ value, planet });
  }

  render() {
    const {planet} = this.state

    const options = this.state.data.map(d => {
      let fontSize = (parseInt(d.population) || 0)/1000000000 + 8
      if(fontSize > 30){
        fontSize = 30  // to prevent unusually large sizes
      }
      return (<Option style={{fontSize}} key={d.value}>{d.name}</Option>)
    });

    return (
      <div>
        <Header />

        Search: {` `}
        <Select
          showSearch
          className='search'
          value={this.state.value}
          placeholder={this.props.placeholder}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          notFoundContent={null}
        >
          {options}
        </Select>
        {
          this.state.fetching && "Fetching..."
        }

        {
          planet &&
          <div className='planetDetails'>
            <div className="row"><span className='col'>Name:</span> <span className='col'>{planet.name}</span></div><br/>
            <div className="row"><span className='col'>Diameter:</span> <span className='col'>{planet.diameter}</span></div><br/>
            <div className="row"><span className='col'>Gravity:</span> <span className='col'>{planet.gravity}</span></div><br/>
            <div className="row"><span className='col'>Orbital Period:</span> <span className='col'>{planet.orbital_period}</span></div><br/>
            <div className="row"><span className='col'>Rotation Period:</span> <span className='col'>{planet.rotation_period}</span></div><br/>
            <div className="row"><span className='col'>Surface Water:</span> <span className='col'>{planet.surface_water}</span></div><br/>
            <div className="row"><span className='col'>Population:</span> <span className='col'>{planet.population}</span></div><br/>
          </div>
        }
      </div>
    );
  }
}


export default Search;