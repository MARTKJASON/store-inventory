import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";

interface TableComponentProps {
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    isAllSelected: boolean;
    filteredProducts: any;
    handleSelectAll: (
        event: React.ChangeEvent<HTMLInputElement>,
        products: any[],
        rowsPerPage: number,
    ) => void;
    handleSelect: (id: number, products: any[], rowsPerPage: number) => void;
    isLoading: boolean;
    tableColumns: string[];
    columns: (item: any) => React.ReactNode[];
    rowKey: (item: any) => string | number;
    sortFn?: (a: any, b: any) => number;
}

const TableComponent: React.FC<TableComponentProps> = ({
    selected,
    isAllSelected,
    handleSelectAll,
    handleSelect,
    filteredProducts,
    isLoading,
    tableColumns,
    columns,
    rowKey,
    sortFn,
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const paginatedData = filteredProducts
        .sort(sortFn)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {isLoading ? (
                <TableContainer sx={{ maxHeight: 490 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Array(6)
                                    .fill("")
                                    .map((_, index) => (
                                        <TableCell key={index}>
                                            <Skeleton height={40} />
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array(rowsPerPage)
                                .fill("")
                                .map((_, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {Array(6)
                                            .fill("")
                                            .map((_, cellIndex) => (
                                                <TableCell key={cellIndex}>
                                                    <Skeleton height={30} />
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 490 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={
                                                selected.length > 0 &&
                                                selected.length <
                                                    filteredProducts.slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage +
                                                            rowsPerPage,
                                                    ).length
                                            }
                                            checked={isAllSelected}
                                            onChange={(event) =>
                                                handleSelectAll(
                                                    event,
                                                    filteredProducts,
                                                    rowsPerPage,
                                                )
                                            }
                                        />
                                    </TableCell>
                                    {tableColumns.map((column) => (
                                        <TableCell
                                            key={column}
                                            sx={{
                                                color: "#1e40af",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((item: any) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={rowKey(item)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={selected.includes(
                                                    rowKey(item) as number,
                                                )}
                                                onChange={() =>
                                                    handleSelect(
                                                        rowKey(item) as number,
                                                        filteredProducts,
                                                        rowsPerPage,
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        {columns(item).map(
                                            (cellContent, index) => {
                                                return (
                                                    <TableCell key={index}>
                                                        {cellContent}
                                                    </TableCell>
                                                );
                                            },
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </Paper>
    );
};

export default TableComponent;
