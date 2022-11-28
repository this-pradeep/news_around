import { Divider, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
interface NewsCardProps {
    children?: React.ReactNode; // best, accepts everything React can render
  }
const NewsCard = ({children}: NewsCardProps): JSX.Element => {
  return (
    <Paper sx={{borderRadius: '7px', height: '100%'}}  elevation={0}>
      <Box p={3}>
        {children}
      </Box>
    </Paper>
  )
}

export default NewsCard