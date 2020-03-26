import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Dropdown,
  Search
} from 'semantic-ui-react'

const filterOptions = [
    {
        text: 'Restaurant',
        value: 'Restaurant',
    },
    {
        text: 'Food',
        value: 'Food',
    },
    {
        text: 'Category',
        value: 'Category',
    }
]

class Filter extends Component {
    
    render() {
        return (
            <span>
                filter by{' '}
                <Dropdown
                    inline
                    options={filterOptions}
                    defaultValue={
                        filterOptions[0].value
                    }
                    onChange={this.props.updateFilter}
                />
            </span>
        )
    }
}

export default Filter