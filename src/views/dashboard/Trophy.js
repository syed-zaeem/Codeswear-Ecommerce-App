import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {

  const [totalOrders, setTotalOrders] = useState([])

  const router = useRouter()

  const getAllOrders = async () => {
    const a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchAllOrders`
    );
  
    const response = await a.json();
    // console.log("This is response from the backend side: ", response);

    setTotalOrders(response.orders)
  }

  useEffect(() => {
    getAllOrders()
  }, [])  
  
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Congratulations Zaeem! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          All orders from Customers
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {totalOrders.length}
        </Typography>
        <Button onClick={()=>{router.push('/admin/viewOrders')}} size='small' variant='contained'>
          View Orders
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
