import React, {useState, useMemo, useEffect} from "react"
import ReactTableFilters from "../../../../commons/ReactTableFilters";
import {Grid, Header} from "semantic-ui-react";
import FdsStatsTable from "../../../../elements/fds/stats/FdsStatsTable";
import moment from "moment"
import axios from "axios";

const fakeAreaStats = {
    //TODO: aggregated data
    //data should already be sorted in descending order by date
    data: [
        {date: "02/05/2020", hour: 11, area: "North", totalorders: 200},
        {date: "02/05/2020", hour: 11, area: "South", totalorders: 220},
        {date: "02/05/2020", hour: 11, area: "East", totalorders: 210},
        {date: "02/05/2020", hour: 11, area: "West", totalorders: 100},
        {date: "01/05/2020", hour: 20, area: "North", totalorders: 300},
        {date: "01/05/2020", hour: 20, area: "South", totalorders: 210},
        {date: "01/05/2020", hour: 20, area: "East", totalorders: 50},
        {date: "01/05/2020", hour: 20, area: "West", totalorders: 70},
    ]
}

const formatHour = (data) => {
    return data.map(x => {
        return {...x, hour: moment(x.hour, "HH").format("hA").toString()}
    })
}

export default function FdsAreaStats() {
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: "Statistics",
                columns: [
                    {
                        Header: "Date",
                        accessor: "date"
                    },
                    {
                        Header: "Hour",
                        accessor: "hour"
                    },
                    {
                        Header: "Area",
                        accessor: "area",
                        Filter: ReactTableFilters.SelectColumnFilter,
                        filter: "includes"
                    },
                    {
                        Header: "Total Orders",
                        accessor: "totalorders",
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
                .get('/FDSManager/getSummaryDataByArea/', {

                })
                .then((response) => setData(formatHour(response.data))
                )
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
            <Header as={'h1'}>Delivery Area</Header>
            <Header sub color={'grey'}>Hourly basis</Header>
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