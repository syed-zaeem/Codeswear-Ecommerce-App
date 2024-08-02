import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "@/features/userSlice";
import { fetchAllProducts } from "@/features/productsSlice";
import { getTotalSales, getRevenue } from "@/features/ordersSlice";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import TrendingUp from "mdi-material-ui/TrendingUp";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import DotsVertical from "mdi-material-ui/DotsVertical";
import CellphoneLink from "mdi-material-ui/CellphoneLink";
import AccountOutline from "mdi-material-ui/AccountOutline";

const StatisticsCard = () => {
  const [allCustomers, setAllCustomers] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)

  const dispatch = useDispatch()

  const fetchAllCustomers = async () => {
    // console.log("I am here")
    const res = await dispatch(getAllUsers())

    // console.log("The response customers are: " , res.payload.customers)
    setAllCustomers(res.payload.customers)
  }

  const getAllProducts = async () => {
    const res = await dispatch(fetchAllProducts())

    setAllProducts(res.payload.products)
  }

  const calculateTotalSales = async () => {
    const res = await dispatch(getTotalSales())

    // console.log("This is the response: " , res)

    setTotalSales(res.payload.totalSales)
  }

  const calculateTotalRevenue = async () => {
    const res = await dispatch(getRevenue())

    setTotalRevenue(res.payload.totalRevenue)
  }

  useEffect(() => {
    fetchAllCustomers()
    getAllProducts()
    calculateTotalSales()
    calculateTotalRevenue()
  }, [])  

  const salesData = [
    {
      stats: totalSales,
      title: "Sales",
      color: "primary",
      icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: allCustomers.length-1,
      title: "Customers",
      color: "success",
      icon: <AccountOutline sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: allProducts.length,
      color: "warning",
      title: "Products",
      icon: <CellphoneLink sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: `$${totalRevenue}`,
      color: "info",
      title: "Revenue",
      icon: <CurrencyUsd sx={{ fontSize: "1.75rem" }} />,
    },
  ];

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${item.color}.main`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.title}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title="Statistics Card"
        // action={
        //   <IconButton
        //     size="small"
        //     aria-label="settings"
        //     className="card-more-options"
        //     sx={{ color: "text.secondary" }}
        //   >
        //     <DotsVertical />
        //   </IconButton>
        // }
        subheader={
          <Typography variant="body2">
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
