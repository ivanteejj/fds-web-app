import React, {Component, useMemo} from "react"
import {Input} from "semantic-ui-react";

export default class Filters extends Component {

    static DefaultColumnFilter({column: { filterValue, preFilteredRows, setFilter },}) {
        const count = preFilteredRows.length
        return (
            <Input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${count} records...`}
            />
        )
    }

    static SliderColumnFilter({column: { filterValue, setFilter, preFilteredRows, id }}) {
        // Calculate the min and max
        // using the preFilteredRows
        const [min, max] = useMemo(() => {
            let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
            let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
            preFilteredRows.forEach(row => {
                min = Math.min(row.values[id], min);
                max = Math.max(row.values[id], max);
            });
            return [min, max];
        }, [id, preFilteredRows]);

        return (
            <>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={filterValue || min}
                    onChange={e => {
                        setFilter(parseInt(e.target.value, 10));
                    }}
                />
                <button onClick={() => setFilter(undefined)}>Off</button>
            </>
        );
    };

    static NumberRangeColumnFilter({column: { filterValue = [], preFilteredRows, setFilter, id }}) {
        const [min, max] = React.useMemo(() => {
            let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
            let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
            preFilteredRows.forEach(row => {
                min = Math.min(row.values[id], min);
                max = Math.max(row.values[id], max);
            });
            return [min, max];
        }, [id, preFilteredRows]);

        return (
            <div
                style={{
                    display: "flex"
                }}
            >
                <Input size={'tiny'}
                    value={filterValue[0] || ""}
                    type="number"
                    onChange={e => {
                        const val = e.target.value;
                        setFilter((old = []) => [
                            val ? parseInt(val, 10) : undefined,
                            old[1]
                        ]);
                    }}
                    placeholder={`Min (${min})`}
                    style={{
                        width: "100px",
                        marginRight: "0.5rem"
                    }}
                />
                to
                <Input size={'tiny'}
                    value={filterValue[1] || ""}
                    type="number"
                    onChange={e => {
                        const val = e.target.value;
                        setFilter((old = []) => [
                            old[0],
                            val ? parseInt(val, 10) : undefined
                        ]);
                    }}
                    placeholder={`Max (${max})`}
                    style={{
                        width: "100px",
                        marginLeft: "0.5rem"
                    }}
                />
            </div>
        );
    }

    static SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id }}) {
        // Calculate the options for filtering
        // using the preFilteredRows
        const options = React.useMemo(() => {
            const options = new Set();
            preFilteredRows.forEach(row => {
                options.add(row.values[id]);
            });
            return [...options.values()];
        }, [id, preFilteredRows]);

        // Render a multi-select box
        return (
            <select
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }

    // Define a custom filter filter function!
    static filterGreaterThan(rows, id, filterValue) {
        return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue >= filterValue;
        });
    };
}