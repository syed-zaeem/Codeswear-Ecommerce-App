
import React from 'react'
import Grid from '@mui/material/Grid'
import mongoose from 'mongoose'
import Product from '../../../models/Product'

// ** Styled Component
import DatePickerWrapper from '/src/@core/styles/libs/react-datepicker'

// import FormLayoutsSeparator from '/src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsSeparatorForUpdate from '@/views/form-layouts/FormLayoutSeparatorForUpdate'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const UpdateProduct = ({product}) => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormLayoutsSeparatorForUpdate product={product} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}


export const getServerSideProps = async (context) => {
    let error = null;
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    // Fetch data from external API
    let product = await Product.findOne({ slug: context.query.slug });
    console.log(product)
    if (product == null) {
      return {
        props: {
          error: 404,
        },
      };
    }
    
  
    // Pass data to the page via props
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  };
  


export default UpdateProduct





