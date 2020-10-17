import React, { FC, useEffect, useState } from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import { CellValue } from "entities/sheet";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TBody, TCell, THead, TRow } from "components/table";
import cn from "classnames";
import { noop } from "lodash";

interface Props {
    headers: string[];
    data: CellValue[][];
    widthSheet?: number;

    onChange?(changes: CellValue[]): void;
}

const useStyles = makeStyles(() => ({
    sheet: {
        flexGrow: 1,
        borderLeft: "1px solid #999999",
        height: "fit-content",
        "&:last-child": {
            borderRight: "1px solid #999999",
        },
    },
    cell: {
        width: 80,
        borderRight: "1px solid #999999",
    },
    selected: {
        border: "2px solid #333333",
    },
    title: {
        height: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        fontWeight: 600,
    },
    bodyCell: {
        height: 45,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
    },
    input: {
        border: "none",
        outline: "none",
    },
    sheetRendererRow: {
        display: "inline-flex",
    },
}));

const SheetRenderer: FC<{ headers: string[] }> = (props) => {
    const styles = useStyles();
    return (
        <Table>
            <THead>
                <TRow className={styles.sheetRendererRow}>
                    {props.headers.map((header, index) => (
                        <TCell key={index} className={styles.cell}>
                            {header}
                        </TCell>
                    ))}
                </TRow>
            </THead>
            <TBody>{props.children}</TBody>
        </Table>
    );
};

const CellRenderer = (props: ReactDataSheet.CellRendererProps<CellValue>) => {
    const styles = useStyles();
    const {
        cell,
        row,
        col,
        attributesRenderer,
        selected,
        editing,
        updated,
        style,
        ...rest
    } = props;
    return (
        <TCell
            classes={{
                root: cn(
                    props.selected && styles.selected,
                    styles.cell,
                    styles.bodyCell,
                    styles.sheetRendererRow,
                ),
            }}
            {...rest}
        >
            {props.children}
        </TCell>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataEditor = (props: ReactDataSheet.DataEditorProps<any>) => {
    const { value, cell, col, onChange, onCommit, onKeyDown, onRevert, row, ...rest } = props;
    const styles = useStyles();
    return (
        <input
            type="text"
            className={styles.input}
            style={{ width: 70 }}
            {...props}
            value={Number(value)}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
            {...rest}
        />
    );
};

export const Sheet = (props: Props) => {
    const { data, headers, onChange = noop } = props;
    const [grid, setGrid] = useState<CellValue[][]>(data);
    const styles = useStyles();

    useEffect(() => {
        setGrid(data);
    }, [data]);

    return (
        <div className={styles.sheet}>
            <ReactDataSheet
                data={grid}
                valueRenderer={(cell) => cell.value}
                sheetRenderer={(props) => <SheetRenderer {...props} headers={headers} />}
                cellRenderer={CellRenderer}
                dataEditor={DataEditor}
                onCellsChanged={(changes) => {
                    const _grid = grid.map((row) => [...row]);
                    changes.forEach(({ row, col, value }) => {
                        _grid[row][col] = { ..._grid[row][col], value: Number(value) };
                    });
                    setGrid(_grid);
                    onChange(changes.map(({ cell, value }) => ({ ...cell, value })));
                }}
            />
        </div>
    );
};
