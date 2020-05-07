import React, {useState, useEffect} from "react"
import {Grid, Header, Card, Divider, Item} from "semantic-ui-react";
import moment from "moment"
import Utils from "../../../commons/Utils";
import axios from "axios";

const fakeEarnings = {
    // TODO: For each Schedule ID, get the following:
    //  1) Min Date as start_dt, Max Date as end_dt
    //  2) Total Orders delivered
    //  3) Sum(time_interval) as total_hours
    //  4) Sum (rider_bonus) as bonus
    // data should already be sorted in desc order by data
    data: [
        {sch_id: 1221, start_dt: "25/04/2020", end_dt: "02/05/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1000},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1200},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1300},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1000},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1200},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1200},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1000},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1300},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1200},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 100, bonus: 1100}
    ]
}

const fakeRider = {
    // NOTE: Incentives are on % basis for each completed order
    data: {rider_type: "part-time", base_salary: 1000}
    // {rider_type: "full-time, incentive: 0.05, base_salary: "220"}
}

const date_format = "DD/MM/YYYY";

export default function Earnings({userid}) {
    const [currEarnings, setCurrEarnings] = useState(null)
    const [pastEarnings, setPastEarnings] = useState(null)
    const [rider, setRider] = useState(null)


    useEffect(() => {
        (async() => {
            setRider(fakeRider.data);

            await axios.get("/Rider/getEarningsForRider/", {
                params: {
                    rider_id: userid
                }
            }).then((response) => groupEarnings(response.data))
            // TODO: (backend) code here for first rendering of page

            // retrieve rider information

        })()
    }, [])


    const groupEarnings = (data) => {
        var curr = [];
        var past = [];
        data.forEach(item => moment(item.end_dt, date_format).isBefore(moment()) ? past.push(item) : curr.push(item))
        setCurrEarnings(curr.length > 0 ? curr : null);
        setPastEarnings(past.length > 0 ? past : null);
        return;
    }

    const computeIncentive = (item) => {
        return item.bonus
    }

    const computeTotalSalary = (item) => {
        return rider.base_salary + computeIncentive(item)
    }

    return (
        <>
            <Grid relaxed>
                <Grid.Column width={1}/>
                <Grid.Column width={3}>
                    {rider && (
                        <>
                            <Header as={'h1'}>{`My Earnings`}</Header>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{`${rider.rider_type} rider`}</Card.Header>
                                    <Card.Description>
                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h4>Base Salary</h4>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h4>{`$${Utils.roundDecimalPlace(rider.base_salary,1)}`}</h4>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </>
                    )}
                </Grid.Column>

                <Grid.Column width={8}>
                    {currEarnings && currEarnings.length > 0 && (
                        <>
                            <Header as={'h1'} textAlign={'left'}>{`Current Earnings`}</Header>
                            <Divider/>
                            {currEarnings.map(item => (
                                <Card fluid>
                                    <Card.Content>
                                        <h2>
                                            {`${moment(item.start_dt, date_format).format("Do MMM YY")} 
                                            - ${moment(item.end_dt, date_format).format("Do MMM YY")}`}
                                        </h2>
                                        <Item>
                                            <Item.Description>{`Total Orders Delivered: ${item.total_orders_delivered}`}</Item.Description>
                                            <Item.Description>{`Total Hours: ${item.total_hours} hours`}</Item.Description>
                                        </Item>

                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h3>Base Salary</h3>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${Utils.roundDecimalPlace(rider.base_salary,1)}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h4>{`Rider Bonus (+${item.total_orders_delivered} orders)`}</h4>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${item.bonus}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h2>Expected Payout</h2>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${Utils.roundDecimalPlace((computeTotalSalary(item)), 1)}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                    </Card.Content>
                                </Card>
                            ))}
                        </>
                    )}

                    {(!pastEarnings || pastEarnings.length < 1) && (<Header as={'h1'}>No Past Earnings!</Header>)}
                    {pastEarnings && pastEarnings.length > 0 && (
                        <>
                            <Header as={'h1'} textAlign={'left'}>{`Past Earnings`}</Header>
                            <Divider/>
                            {pastEarnings.map(item => (
                                <Card fluid>
                                    <Card.Content>
                                        <h2>
                                            {`${moment(item.start_dt, date_format).format("Do MMM YY")} 
                                            - ${moment(item.end_dt, date_format).format("Do MMM YY")}`}
                                        </h2>
                                        <Item>
                                            <Item.Description>{`Total Orders Delivered: ${item.total_orders_delivered}`}</Item.Description>
                                            <Item.Description>{`Total Hours: ${item.total_hours} hours`}</Item.Description>
                                        </Item>

                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h3>Base Salary</h3>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${Utils.roundDecimalPlace(rider.base_salary,1)}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h4>{`Incentives (+${item.total_orders_delivered} orders)`}</h4>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${Utils.roundDecimalPlace((computeIncentive(item)),1)}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column textAlign={'left'}>
                                                    <h2>Total Payout</h2>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${Utils.roundDecimalPlace((computeTotalSalary(item)), 1)}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                    </Card.Content>
                                </Card>
                            ))}
                        </>
                    )}
                </Grid.Column>

                <Grid.Column width={4}/>
            </Grid>
        </>
    )
}