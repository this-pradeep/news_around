import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Footer = (): JSX.Element => {
  return (
    <Box py={2} sx={{backgroundColor: '#f1f5f9'}}>
        <Typography variant='body1' textAlign={'center'}>Designed &amp; Developed with love by <Link href={"https://pradeep-resume-latest.vercel.app"} target="_blank">Pradeep Nayak</Link></Typography>
    </Box>
  )
}

export default Footer