import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Dropdown,
  Search
} from 'semantic-ui-react'
import SearchBar from './SearchBar'
import Filter from './Filter'

class Catalog extends Component {
    constructor(props) {
        super(props)
        this.handler = this.updateFilter.bind(this)
        this.state = {
            value: 'Restaurant',
            search: null,
            results:[]
        }
    }

    updateFilter = (e, {value}) => {
        this.setState({value})
    }

    handleSearch = (e) => {
        this.setState({search: e});
    }

    render() {
        return (
            <div>
                <Search onSearchChange={this.handleSearch}/>
                <Filter updateFilter = {this.handler} />
                <label>{this.state.value}</label>
            </div>
        )
    }
}

export default Catalog
 