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
    fetching: false
  }



  fetch(value, callback) {

    axios.get("https://swapi.co/api/planets?search="+value, { headers: {'Content-Type': 'application/json'} } )
    .then((res) => {
      console.log("res", res)
      let data = []

      res.data.results.forEach((r) => {
        data.push({
          value: r.name,
          text: r.name,
          population: r.population || 0
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
    this.setState({ value });
  }

  render() {
    const options = this.state.data.map(d => {
      let fontSize = (parseInt(d.population) || 0)/1000000000 + 8
      if(fontSize > 30){
        fontSize = 30
      }

      return (<Option style={{fontSize}} key={d.value}>{d.text}</Option>)
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
      </div>
    );
  }
}


export default Search;