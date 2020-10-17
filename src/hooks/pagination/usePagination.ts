import { useState } from "react";

export function usePagination() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (nextPage: number) => {
        setCurrentPage(nextPage);
    };

    const handleChangeRowsPerPage = (nextRowsPerPage: number) => {
        setRowsPerPage(nextRowsPerPage);
        setCurrentPage(0);
    };

    return { currentPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
}
