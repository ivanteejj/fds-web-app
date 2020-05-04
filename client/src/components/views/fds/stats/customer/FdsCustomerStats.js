import React, {useState, useEffect, useMemo} from "react"
import {Grid, Header} from "semantic-ui-react";
import FdsStatsTable from "../../../../elements/fds/stats/FdsStatsTable";
import ReactTableFilters from "../../../../commons/ReactTableFilters";

const fakeCustStats = {
    //TODO: aggregated data
    //     period is concat of Month and Year
    //data should already be sorted in descending order by period
    data: [
        {period: "March 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "March 2020", custid: "ryan", totalNumberOfOrders: 50, totalCost: 1251.2},
        {period: "March 2020", custid: "bryan", totalNumberOfOrders: 1, totalCost: 11.2},
        {period: "March 2020", custid: "cody", totalNumberOfOrders: 5, totalCost: 51.2},
        {period: "March 2020", custid: "emily", totalNumberOfOrders: 23, totalCost: 451.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
        {period: "February 2020", custid: "ivantee", totalNumberOfOrders: 15, totalCost: 251.2},
    ]
}

export default function FdsCustomerStats() {
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: "Statistics",
                columns: [
                    {
                        Header: "Period",
                        accessor: "period"
                    },
                    {
                        Header: "Customer",
                        accessor: "custid"
                    },
                    {
                        Header: "Total Orders",
                        accessor: "totalNumberOfOrders",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    },
                    {
                        Header: "Total Spending",
                        accessor: "totalCost",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between",
                        Cell: ({cell: {value}}) => {
                            return (
                                <>
                                    {`$${value}`}
                                </>
                            )
                        }
                    }
                ]
            }
        ], []
    )

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            let stats = fakeCustStats.data
            setData(stats)
        })()
    }, [])

    const updateMyData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    return (
        <>
            <Header as={'h1'}>Customer Order Frequency</Header>
            <Header sub color={'grey'}>Monthly basis</Header>
            <Grid>
                <Grid.Column width={1}/>
                <Grid.Column width={14}>
                    <FdsStatsTable data={data} columns={columns}
                                   updateMyData={updateMyData}
                    />
                </Grid.Column>
                <Grid.Column width={1}/>
            </Grid>
        </>
    )
}