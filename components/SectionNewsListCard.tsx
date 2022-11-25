import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
interface SectionNewsListProps {
  children?: React.ReactNode; // best, accepts everything React can render
  heading: string;
}
const SectionNewsList = ({children, heading}: SectionNewsListProps ) => {
  return (
    <Paper sx={{borderRadius: '7px'}} elevation={0}>
      <Box p={3}>
       <Typography variant="h5" component="h2" fontWeight={500}>
         {heading}
        </Typography>
        <Divider></Divider>
        {children}
      </Box>
    </Paper>
  )
}

export default SectionNewsList