import React, {useState, useMemo, useEffect} from "react"
import ReactTableFilters from "../../../../commons/ReactTableFilters";
import {Grid, Header} from "semantic-ui-react";
import FdsStatsTable from "../../../../elements/fds/stats/FdsStatsTable";
import DateTimeUtils from "../../../../commons/DateTimeUtils";
import axios from "axios";

const fakeRiderStats = {
    data: [
        {month: 3, year: 2020, riderid: "chukai", totalorders: 105, totalhours: 80, totalsalary: 1200,
            avgdeliverytime: 23, totalratings: 12, avgrating: 3.4},
        {month: 3, year: 2020, riderid: "sean", totalorders: 150, totalhours: 100, totalsalary: 1800,
            avgdeliverytime: 10, totalratings: 42, avgrating: 4.4},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9},
        {month: 3, year: 2020, riderid: "chukai", totalorders: 105, totalhours: 80, totalsalary: 1200,
            avgdeliverytime: 23, totalratings: 12, avgrating: 3.4},
        {month: 3, year: 2020, riderid: "sean", totalorders: 150, totalhours: 100, totalsalary: 1800,
            avgdeliverytime: 10, totalratings: 42, avgrating: 4.4},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9},
        {month: 3, year: 2020, riderid: "alexandra", totalorders: 120, totalhours: 110, totalsalary: 1900,
            avgdeliverytime: 15, totalratings: 70, avgrating: 4.9}
    ]
}

export default function FdsRiderStats() {
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
                        Header: "Rider",
                        accessor: "riderid"
                    },
                    {
                        Header: "Total Orders",
                        accessor: "totalorders",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    },
                    {
                        Header: "Hours Worked",
                        accessor: "totalhours",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    },
                    {
                        Header: "Salary",
                        accessor: "totalsalary",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between",
                        Cell: ({cell: {value}}) => {
                            return (
                                <>
                                    {`$${value}`}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Average Delivery Time",
                        accessor: "avgdeliverytime",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between",
                        Cell: ({cell: {value}}) => {
                            return (
                                <>
                                    {`${value} mins`}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Total Reviews",
                        accessor: "totalratings"
                    },
                    {
                        Header: "Average Rating",
                        accessor: "avgrating",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    }
                ]
            }
        ], []
    )
    useEffect(() => {
        (async() => {
            const allRelevantOrders = await axios
                .get('/FDSManager/getRiderSummaryStats/', )
                .then((response) => setData((DateTimeUtils.formatDataPeriod(response.data))))
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
            <Header as={'h1'}>Rider's Performance</Header>
            <Header sub color={'grey'}>Monthly basis</Header>
            <Grid>
                <Grid.Column width={1}/>
                <Grid.Column width={14}>
                    <div style={{ overflow: 'auto'}}>
                        <FdsStatsTable data={data} columns={columns}
                                       updateMyData={updateMyData}
                        />
                    </div>
                </Grid.Column>
                <Grid.Column width={1}/>
            </Grid>
        </>
    )
}