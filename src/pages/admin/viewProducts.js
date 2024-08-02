import React from 'react'

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableStickyHeader from '/src/views/tables/TableStickyHeader'

const ViewProducts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='text-center' style={{fontWeight: 'bold'}}>
            All Products
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewProducts

