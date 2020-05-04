import React, {useState, useEffect, useMemo} from "react"
import {Grid, Header} from "semantic-ui-react";
import FdsStatsTable from "../../../../elements/fds/stats/FdsStatsTable";
import ReactTableFilters from "../../../../commons/ReactTableFilters"
import DateTimeUtils from "../../../../commons/DateTimeUtils";

const fakeCustStats = {
    //TODO: aggregated data
    //     period is concat of Month and Year
    //data should already be sorted in descending order by period
    data: [
        {month: 3, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 3, year: 2020, custid: "ryan", totalorders: 50, totalcost: 1251.2},
        {month: 3, year: 2020, custid: "bryan", totalorders: 1, totalcost: 11.2},
        {month: 3, year: 2020, custid: "cody", totalorders: 5, totalcost: 51.2},
        {month: 3, year: 2020, custid: "emily", totalorders: 23, totalcost: 451.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
        {month: 2, year: 2020, custid: "ivantee", totalorders: 15, totalcost: 251.2},
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
                        accessor: "totalorders",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    },
                    {
                        Header: "Total Spending",
                        accessor: "totalcost",
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
            setData(DateTimeUtils.formatDataPeriod(stats))
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