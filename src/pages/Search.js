import React, { Component } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import Header from "../partials/Header"
import axios from "axios"

const Option = Select.Option;
let currentValue;

function fetch(value, callback) {

  axios.get("https://swapi.co/api/planets?search="+value, { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'} } )
  .then((res) => {
    console.log("res", res)
    let data = []

    // result.forEach((r) => {
    //   data.push({
    //     value: r[0],
    //     text: r[0],
    //   });
    // });

    callback(data);
  })
  .catch((err) => {
    console.log("err", err)
  })

}


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
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div>
        <Header />
        <Select
          showSearch
          value={this.state.value}
          placeholder={this.props.placeholder}
          style={{width: '200px', height: '50px'}}
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