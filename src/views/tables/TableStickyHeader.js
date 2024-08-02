// ** React Imports
import React, { useState, useEffect } from "react";
import mongoose from "mongoose";
import Product from "../../../models/Product";
import { useRouter } from "next/router";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch } from "react-redux";
import { fetchAllProducts, deleteProduct } from "@/features/productsSlice";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableStickyHeader = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const router = useRouter()

  const dispatch = useDispatch();

  const columns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "price", label: "Price", minWidth: 100 },
  ];
  function createData(title, price, size, color) {
    return { title, price, size, color };
  }

  // const rows = [
  // createData('India', 'IN', 1324171354, 3287263, "zaeem"),
  // createData('China', 'CN', 1403500365, 9596961),
  // createData('Italy', 'IT', 60483973, 301340),
  // createData('United States', 'US', 327167434, 9833520),
  // createData('Canada', 'CA', 37602103, 9984670),
  // createData('Australia', 'AU', 25475400, 7692024),
  // createData('Germany', 'DE', 83019200, 357578),
  // createData('Ireland', 'IE', 4857000, 70273),
  // createData('Mexico', 'MX', 126577691, 1972550),
  // createData('Japan', 'JP', 126317000, 377973),
  // createData('France', 'FR', 67022000, 640679),
  // createData('United Kingdom', 'GB', 67545757, 242495),
  // createData('Russia', 'RU', 146793744, 17098246),
  // createData('Nigeria', 'NG', 200962417, 923768),
  // createData('Brazil', 'BR', 210147125, 8515767)
  // ]

  const getProducts = async () => {
    let res = await dispatch(fetchAllProducts());
    // console.log("This is the response : " , res.payload.products)
    setRows(res.payload.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const removeProduct = async (id) => {
    // console.log("Here")
    const res = await dispatch(deleteProduct({ id: id }));

    let newRows = rows.filter((row) => {
      return row._id !== id;
    });

    setRows(newRows);

    if (res.payload.success) {
      toast.success("Product deleted Successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Error while Deleting the Product!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" sx={170}>
                Variant
              </TableCell>
              <TableCell align="center" sx={170}>
                Available
              </TableCell>
              <TableCell align="center" sx={170}>
                Image
              </TableCell>
              <TableCell align="right" sx={170}>
                Edit
              </TableCell>
              <TableCell align="right" sx={170}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      {row.size}/{row.color}
                    </TableCell>
                    <TableCell align="center">
                      {row.availableQty}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={row.img}
                        alt=""
                        className="md:w-[50%] md:ml-[25%] lg:w-[18%] lg:ml-[41%]"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Fab
                        style={{
                          backgroundColor: "pink",
                          height: "38px",
                          width: "38px",
                        }}
                        aria-label="edit"
                        onClick={() => {
                          router.push(`/admin/updateProduct?slug=${row.slug}`)
                        }}
                      >
                        <EditIcon />
                      </Fab>
                    </TableCell>
                    <TableCell align="right">
                      <Fab
                        style={{
                          backgroundColor: "pink",
                          height: "38px",
                          width: "38px",
                        }}
                        aria-label="delete"
                        onClick={async () => {
                          // alert(row._id)
                          removeProduct(row._id);
                        }}
                      >
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableStickyHeader;
