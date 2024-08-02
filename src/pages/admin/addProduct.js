
import React from 'react'
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from '/src/@core/styles/libs/react-datepicker'

import FormLayoutsSeparator from '/src/views/form-layouts/FormLayoutsSeparator'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const AddProduct = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormLayoutsSeparator />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default AddProduct





