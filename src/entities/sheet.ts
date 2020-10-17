import ReactDataSheet from "react-datasheet";

export interface CellValue extends ReactDataSheet.Cell<CellValue> {
    id?: number | string;
    value?: number | string | null;
}
