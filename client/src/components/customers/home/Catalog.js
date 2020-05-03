import React, { useMemo, useEffect, useState } from 'react'
import Results from './Results'
import axios from 'axios';

const fakeData = {
    data: [
        {fid: 100, fname: "Regular Milk Tea", rid: 1000, rname: "LiWOW", price: 3.5, category: "Beverages", qty_left: "100", area: "North"},
        {fid: 101, fname: "Avocado Melon Tea", rid: 1001, rname: "GongWah", price: 2.9, category: "Beverages", qty_left: "20", area: "North"},
        {fid: 102, fname: "Brown Sugar Fries", rid: 1000, rname: "TigerMeow", price: 9.70, category: "Western", qty_left: "10", area: "South"},
        {fid: 103, fname: "Eww Eel Bento", rid: 1020, rname: "SumoBentos", price: 25.90, category: "Japanese", qty_left: "15", area: "West"},
        {fid: 104, fname: "Yaya Papaya Macaron", rid: 1999, rname: "AuthenticSG", price: 10.9, category: "Dessert", qty_left: "5", area: "South"}
    ]
}

function Catalog() {
    const columns = useMemo(
        () => [
            {
                Header: "Restaurant",
                columns: [
                    {
                        Header: "Name",
                        accessor: "rname"
                    },
                    {
                        Header: "id",
                        accessor: "rid"
                    },
                    {
                        Header: "Region",
                        accessor: "area"
                    }
                ]
            },
            {
                Header: "Food",
                columns: [
                    {
                        Header: "Name",
                        accessor: "fname"
                    },
                    {
                        Header: "id",
                        accessor: "fid"
                    },
                    {
                        Header: "Price",
                        accessor: "price",
                        Cell: ({cell: {value}}) => {
                            return (
                                <>
                                    {`$${value}`}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Category",
                        accessor: "category"
                    },
                    {
                        Header: "Quantity Left",
                        accessor: "qty_left"
                    }
                ]
            }
        ], []
    )
    
    const [data, setData] = useState([]);

    useEffect(() => {
        (async() => {
            // const result = await axios.get("/customer/shop");
            // setData(result.data); //replace the param with const variable above
            setData(fakeData.data)
        })();
    }, []);

    return (
        <>
            <Results columns = {columns} data={data} />
        </>
    );
}

export default Catalog;
 