import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'

const SectionNewsList = () => {
  return (
    <Paper sx={{borderRadius: '7px'}} elevation={0}>
      <Box p={3}>
       <Typography variant="h5" component="h2" fontWeight={500}>
         India
        </Typography>
        <Divider/>
      </Box>
    </Paper>
  )
}

export default SectionNewsList