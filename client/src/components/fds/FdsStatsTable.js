import React, {useMemo} from "react"
import {useTable, useFilters, usePagination, useSortBy} from "react-table"
import matchSorter from "match-sorter";
import Filters from "./Filters";
import "../customers/home/Results.css";

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export default function FdsStatsTable({columns, data, updateMyData}) {

    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = useMemo(() => ({
            // Let's set up our default Filter UI
            Filter: Filters.DefaultColumnFilter
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {
            pageIndex,
            pageSize
        },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            updateMyData,
            disableMultiSort: true,
        },
        useFilters,
        useSortBy,
        usePagination,
    );

    return (
        <div className={'Results'}>
            <table {...getTableProps}>
                <thead>
                {headerGroups.map(hg => (
                    <tr {...hg.getHeaderGroupProps()}>
                        {hg.headers.map(col => (
                            <th {...col.getHeaderProps()}
                                className = {col.isSorted
                                        ? col.isSortedDesc ? "sort-desc" : "sort-asc"
                                        : "" }
                            >
                                <div>
                                    <span {...col.getSortByToggleProps()}>
                                        {col.render("Header")}
                                    </span>
                                </div>
                                {col.canFilter ? col.render('Filter') : null}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody {...getTableBodyProps}>
                {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
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

            <div style={{ marginTop: '20px'}}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span style={{ marginRight: "0.5rem", marginLeft: "0.5rem"}}>
                  Page{' '}
                            <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}