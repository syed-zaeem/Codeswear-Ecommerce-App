import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { calculateWeeklySales } from '@/features/ordersSlice'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from '/src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  const [weeklySales, setWeeklySales] = useState([])
  const [weekDays, setWeekDays] = useState([])
  const router = useRouter()

  const dispatch = useDispatch()

  const fetchWeeklySales = async () => {
    const res = await dispatch(calculateWeeklySales())

    // console.log("The response customers are: " , res.payload)
    setWeeklySales(res.payload.weeklySales)
    setWeekDays(res.payload.previousDays)
  }

  useEffect(() => {
    fetchWeeklySales()
  }, [])
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '20%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },

    dataLabels: { enabled: true },
    
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: weekDays,
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: false,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
        //     <DotsVertical />
        //   </IconButton>
        // }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: weeklySales }]} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          {/* <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography> */}
          <Typography variant='body2'>Above is your Sales Performance for previous 7 days.</Typography>
        </Box>
        <Button onClick={()=>{router.push('/admin/viewOrders')}} variant='contained'>
          Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
