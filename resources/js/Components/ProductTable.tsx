import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import useFetchProducts from "../Hooks/useFetchProducts";

interface ProductListProps {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  isAllSelected: boolean;
  filteredProducts: any;
  handleSelectAll: (
    event: React.ChangeEvent<HTMLInputElement>,
    products: any[],
    rowsPerPage: number
  ) => void;
  handleSelect: (id: number, products: any[], rowsPerPage: number) => void;
  getCategoryName: (product: number) => string;
}

const ProductList: React.FC<ProductListProps> = ({
  selected,
  setSelected,
  isAllSelected,
  handleSelectAll,
  handleSelect,
  filteredProducts,
  getCategoryName
}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>

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
                        page * rowsPerPage + rowsPerPage
                      ).length
                  }
                  checked={isAllSelected}
                  onChange={(event) =>
                    handleSelectAll(event, filteredProducts, rowsPerPage)
                  }
                />
              </TableCell>
              <TableCell sx={{ color: "#1e40af", fontWeight: "bold" }}>
                Product ID
              </TableCell>
              <TableCell sx={{ color: "#1e40af", fontWeight: "bold" }}>
                Product Name
              </TableCell>
              <TableCell sx={{ color: "#1e40af", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#1e40af", fontWeight: "bold" }}>
                Stocks
              </TableCell>
              <TableCell sx={{ color: "#1e40af", fontWeight: "bold" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product:any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selected.includes(product.id)}
                      onChange={() =>
                        handleSelect(product.id, filteredProducts, rowsPerPage)
                      }
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{getCategoryName(product.category_id)}</TableCell>
                  <TableCell>{product.stocks || "N/A"}</TableCell>
                  <TableCell>₱ {product.pricing || "N/A"}</TableCell>
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
    </Paper>
  );
};

export default ProductList;
