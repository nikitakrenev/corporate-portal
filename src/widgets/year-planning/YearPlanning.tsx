import React, { useEffect, useRef } from "react";
import { CellValue } from "entities/sheet";
import { makeStyles } from "@material-ui/core/styles";
import { Sheet } from "../sheet";
import moment from "moment";
import { noop } from "lodash";
import cn from "classnames";

interface Props {
    headers: string[];
    tableHeaders: string[];
    tableData: CellValue[][];
    className?: string;

    onCellsChange?(changes: CellValue[]): void;

    onScrollToColumn?(index: number): void;
}

const useStyles = makeStyles(() => ({
    wrapper: {
        overflowX: "auto",
        width: "calc(100% - 720px)",
    },
    content: {
        display: "grid",
    },
    weeks: {
        display: "grid",
    },
    week: {
        width: 240,
        fontWeight: 600,
        fontSize: 16,
        height: 45,
        lineHeight: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRight: "1px solid #999999",
        "&:first-child": {
            borderLeft: "1px solid #999999",
        },
    },
}));

const columnWidth = 80;

export const YearPlanning = (props: Props) => {
    const {
        headers,
        tableHeaders,
        tableData,
        onCellsChange = noop,
        onScrollToColumn = noop,
    } = props;
    const styles = useStyles();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onScroll = (event: React.UIEvent<HTMLDivElement>): void => {
        onScrollToColumn(Math.floor((event.currentTarget.scrollLeft || 0) / (columnWidth * 3)));
    };

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft = columnWidth * (moment().week() - 1) * 3;
        }
    }, []);

    return (
        <div className={cn(styles.wrapper, props.className)} ref={wrapperRef} onScroll={onScroll}>
            <div className={styles.content}>
                <div
                    className={styles.weeks}
                    style={{ gridTemplateColumns: `repeat(${moment().isoWeeksInYear()}, 240px)` }}
                >
                    {(headers || []).map((header) => (
                        <div className={styles.week} key={header}>
                            {header}
                        </div>
                    ))}
                </div>
                <Sheet headers={tableHeaders} data={tableData} onChange={onCellsChange} />
            </div>
        </div>
    );
};
