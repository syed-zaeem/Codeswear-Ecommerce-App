import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts, fetchAllOutOfStockProducts } from "@/features/productsSlice";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

const DashboardTable = () => {
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  const getProducts = async () => {
    let res = await dispatch(fetchAllOutOfStockProducts());
    // console.log("This is the response : " , res.payload.products)
    setRows(res.payload.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // const rows = [
  //   {
  //     age: 27,
  //     status: 'current',
  //     date: '09/27/2018',
  //     name: 'Sally Quinn',
  //     salary: '$19586.23',
  //     email: 'eebsworth2m@sbwire.com',
  //     designation: 'Human Resources Assistant'
  //   },
  //   {
  //     age: 61,
  //     date: '09/23/2016',
  //     salary: '$23896.35',
  //     status: 'professional',
  //     name: 'Margaret Bowers',
  //     email: 'kocrevy0@thetimes.co.uk',
  //     designation: 'Nuclear Power Engineer'
  //   },
  //   {
  //     age: 59,
  //     date: '10/15/2017',
  //     name: 'Minnie Roy',
  //     status: 'rejected',
  //     salary: '$18991.67',
  //     email: 'ediehn6@163.com',
  //     designation: 'Environmental Specialist'
  //   },
  //   {
  //     age: 30,
  //     date: '06/12/2018',
  //     status: 'resigned',
  //     salary: '$19252.12',
  //     name: 'Ralph Leonard',
  //     email: 'dfalloona@ifeng.com',
  //     designation: 'Sales Representative'
  //   },
  //   {
  //     age: 66,
  //     status: 'applied',
  //     date: '03/24/2018',
  //     salary: '$13076.28',
  //     name: 'Annie Martin',
  //     designation: 'Operator',
  //     email: 'sganderton2@tuttocitta.it'
  //   },
  //   {
  //     age: 33,
  //     date: '08/25/2017',
  //     salary: '$10909.52',
  //     name: 'Adeline Day',
  //     status: 'professional',
  //     email: 'hnisius4@gnu.org',
  //     designation: 'Senior Cost Accountant'
  //   },
  //   {
  //     age: 61,
  //     status: 'current',
  //     date: '06/01/2017',
  //     salary: '$17803.80',
  //     name: 'Lora Jackson',
  //     designation: 'Geologist',
  //     email: 'ghoneywood5@narod.ru'
  //   },
  //   {
  //     age: 22,
  //     date: '12/03/2017',
  //     salary: '$12336.17',
  //     name: 'Rodney Sharp',
  //     status: 'professional',
  //     designation: 'Cost Accountant',
  //     email: 'dcrossman3@google.co.jp'
  //   }
  // ]

  const statusObj = {
    applied: { color: "info" },
    rejected: { color: "error" },
    current: { color: "primary" },
    resigned: { color: "warning" },
    professional: { color: "success" },
  };

  return (
    <Card>
      <CardHeader
        title="Out of Stock Products"
        variant="h3"
        titleTypographyProps={{
          sx: {
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
        //     <DotsVertical />
        //   </IconButton>
        // }
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell sx={170} align="center">Title</TableCell>
              <TableCell sx={170} align="center">Price</TableCell>
              <TableCell sx={170} align="center">Variant</TableCell>
              <TableCell sx={170} align="center">Available</TableCell>
              <TableCell sx={170} align="center">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                key={row.slug}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {row.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                  {row.size}/{row.color}
                </TableCell>
                <TableCell align="center">{row.availableQty}</TableCell>
                <TableCell align="center">
                  <img
                    src={row.img}
                    alt=""
                    className="w-[20%] ml-[40%] md:w-[20%] md:ml-[40%] lg:w-[16%] lg:ml-[42%]"
                  />
                </TableCell>
                {/* <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                      "& .MuiChip-label": { fontWeight: 500 },
                    }}
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
