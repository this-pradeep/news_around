import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Box, CssBaseline, Paper, ThemeProvider, CircularProgress } from '@mui/material'
import theme from '../src/theme'

// Dynamically Importing Components
const DynamicHeader = dynamic(() => import('../components/Header'), {
  suspense: true,
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
   <>
     <Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </Head>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Suspense fallback={ 
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      }>
      <DynamicHeader />
    </Suspense>
    <Paper sx={{backgroundColor: '#f1f5f9', minHeight: '90vh'}}>
      <Component {...pageProps} />
    </Paper>
  </ThemeProvider>
   </>
  )
}


export default MyApp
