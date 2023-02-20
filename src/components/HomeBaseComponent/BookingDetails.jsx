import { Grid } from '@material-ui/core'
import React from 'react'

export default function HotelList() {
  const bookingDetails=JSON.parse(sessionStorage.getItem('bookingDetails'))
  console.log('bookingDetails',bookingDetails)
  return (
    <Grid>
    <div className='hotel'>BOOKING DETAILS</div>
    {

    }
    </Grid>
  )
}