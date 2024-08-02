import React from 'react'
import mongoose from 'mongoose'
import Order from '../../../models/Order'

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableStickyHeader from '/src/views/tables/TableStickyHeader'
import TableStickyHeaderForOrders from '@/views/tables/TableStickyHeaderForOrders'

const ViewOrders = ({orders}) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='text-center' style={{fontWeight: 'bold'}}>
            All Orders
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableStickyHeaderForOrders orders={orders} />
        </Card>
      </Grid>
    </Grid>
  )
}


export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // Fetch data from external API
  // console.log("Context id: " , context.query.id)
  let orders = await Order.find();

  // Pass data to the page via props
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
};

export default ViewOrders

