import React, { useMemo, useEffect, useState } from 'react'
import Results from './Results'
import axios from 'axios';

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
            const result = await axios.get("/customer/shop");
            setData(result.data);
        })();
    }, []);

    return (
        <>
            <Results columns = {columns} data={data} />
        </>
    );
}

export default Catalog;
 