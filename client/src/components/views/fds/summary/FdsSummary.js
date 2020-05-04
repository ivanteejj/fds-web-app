import React, {useEffect, useReducer} from "react"
import {Button, Dropdown, Grid, Header} from "semantic-ui-react";
import FdsSummaryDetails from "../../../elements/fds/summary/FdsSummaryDetails";

const fakeSummary = {
    data: [
        /* TODO: period is concat of Month and Year of dt_order_placed
        *  sorted in descending order by month and year
        */
        {period: "March 2020", totalNewCustomers: 20, totalNumberOfOrders: 2000, totalCost: 22049.2},
        {period: "February 2020", totalNewCustomers: 15, totalNumberOfOrders: 1500, totalCost: 20000.10},
    ]
}

const filterStats = (data, filter) => {
    return data && data.length > 0 ? data[filter] : null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "initialize":
            return {
                stats: action.payload,
                filterOptions: action.payload,
                filter: 0,
                filteredStats: filterStats(action.payload, 0)
            };
        case "filter":
            return {
                ...state,
                filter: action.payload,
                filteredStats: filterStats(state.stats, action.payload)
            };
        default:
            return state;
    }
}

export default function FdsSummary() {
    const [filterSummary, setFilterSummary] = useReducer(reducer, {
        stats: [],
        filterOptions: [],
        filter: "",
        filteredStats: {}
    })
    const {stats, filterOptions, filter, filteredStats} = filterSummary

    const options = filterOptions && filterOptions.map((item, idx) => ({
        key: idx,
        text: item.period,
        value: idx
    }))

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            setFilterSummary({type: "initialize", payload: fakeSummary.data})
        })()
    }, [])

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}/>
                <Grid.Column width={12}>
                    {(!stats || stats.length < 1) && (<h2>No Summary</h2>)}
                    {stats && stats.length > 0 && (
                        <>
                            <h1>Summary of {' '}
                                <Dropdown
                                    inline
                                    options={options}
                                    value={filter}
                                    onChange={(e, { value }) => {
                                        setFilterSummary({type: "filter", payload: value})
                                    }}
                                />
                            </h1>
                            <FdsSummaryDetails stats={filteredStats}/>
                        </>
                    )}

                    <Header as={'h3'}>View All Statistics Breakdown</Header>
                    <Button.Group>
                        <Button content={'By Customer'}/>
                        <Button content={'By Area'}/>
                        <Button content={'By Rider'}/>
                    </Button.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}