import React, {useState, useEffect, createRef} from "react";
import {
    Input,
    Dropdown,
    GridRow
} from 'semantic-ui-react'
import {useTable, useFilters, useSortBy, useRowSelect} from "react-table";
import "./Results.css"

const filterOptions = [
    {
        text: 'Restaurant',
        value: 'rname',
    },
    {
        text: 'Food',
        value: 'fname',
    },
    {
        text: 'Category',
        value: 'category',
    }
]

const searchFocus = createRef()
const handleClick = () => searchFocus.current.focus()


export default function Results({columns, data}) {

    const [filterInput, setFilterInput] = useState("")

    const [searchType, setSearchType] = useState(filterOptions[0].value) 

    const [selectedRid, setSelectedRid] = useState("")

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        selectedFlatRows
    } = useTable(
        {
            columns,
            data,
            initialState: {
                hiddenColumns: ["fid", "rid"]
            }
        },
        useFilters,
        useSortBy,
        useRowSelect
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter(searchType, value);
        setFilterInput(value);
    };

    const handleSearchTypeChange = (e, {value}) => {
        setSearchType(value);
    }

    const handleRedirect = (flatRows) => {
        flatRows.map(
            d => setSelectedRid(d.original.rid)
        )
        // redirect here
    }

    return (
        <>
            <GridRow>
                <div>
                <Input
                    style={{width: "370px"}}
                    ref={searchFocus}
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Type anything..."}
                />
                </div>
                <span>
                    filter by{' '}
                    <Dropdown
                        inline
                        options={filterOptions}
                        defaultValue={filterOptions[0].value}
                        onChange={handleSearchTypeChange}
                    />
                </span>
            </GridRow>

            <table {...getTableProps} >
                <thead>
                    {headerGroups.map(hg => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map(col => (
                                <th {...col.getHeaderProps(col.getSortByToggleProps())}
                                    className = {
                                        col.isSorted 
                                        ? col.isSortedDesc ? "sort-desc" : "sort-asc" 
                                        : "" }
                                >   
                                    {col.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}
                                onClick={() => {
                                    row.toggleRowSelected();
                                    handleRedirect(selectedFlatRows);
                                }}
                            >
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {selectedFlatRows.map(d => {
                return <>{`${d.original.rid}`}</>;
            })}
        </>
    )
}