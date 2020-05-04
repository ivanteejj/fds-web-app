import React, {useState, useMemo, useEffect} from "react"
import ReactTableFilters from "../../../../commons/ReactTableFilters";
import {Grid, Header} from "semantic-ui-react";
import FdsStatsTable from "../../../../elements/fds/stats/FdsStatsTable";

const fakeRiderStats = {
    //TODO: aggregated data
    //      totalRatings refers to total number of reviews (NOT STARS!) for the month
    //      avgRating = total number of stars for the month / totalRatings
    data: [
        {period: "March 2020", riderid: "chukai", totalNumberOfOrders: 105, totalHours: 80, totalSalary: 1200,
            avgDeliveryTime: 23, totalRatings: 12, avgRating: 3.4},
        {period: "March 2020", riderid: "sean", totalNumberOfOrders: 150, totalHours: 100, totalSalary: 1800,
            avgDeliveryTime: 10, totalRatings: 42, avgRating: 4.4},
        {period: "March 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9},
        {period: "February 2020", riderid: "chukai", totalNumberOfOrders: 105, totalHours: 80, totalSalary: 1200,
            avgDeliveryTime: 23, totalRatings: 12, avgRating: 3.4},
        {period: "February 2020", riderid: "sean", totalNumberOfOrders: 150, totalHours: 100, totalSalary: 1800,
            avgDeliveryTime: 10, totalRatings: 42, avgRating: 4.4},
        {period: "February 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9},
        {period: "February 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9},
        {period: "February 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9},
        {period: "February 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9},
        {period: "February 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9},
        {period: "February 2020", riderid: "alexandra", totalNumberOfOrders: 120, totalHours: 110, totalSalary: 1900,
            avgDeliveryTime: 15, totalRatings: 70, avgRating: 4.9}
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
                        accessor: "totalNumberOfOrders",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    },
                    {
                        Header: "Hours Worked",
                        accessor: "totalHours",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    },
                    {
                        Header: "Salary",
                        accessor: "totalSalary",
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
                        accessor: "avgDeliveryTime",
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
                        accessor: "totalRatings"
                    },
                    {
                        Header: "Average Rating",
                        accessor: "avgRating",
                        Filter: ReactTableFilters.NumberRangeColumnFilter,
                        filter: "between"
                    }
                ]
            }
        ], []
    )

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            setData(fakeRiderStats.data)
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