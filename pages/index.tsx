import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import NewsApi from 'newsapi'
import { Suspense } from 'react'

// Dynamically Importing Components
// const DynamicSection = dynamic(() => import('../components/Section'), {
//   suspense: false,
// })
const DynamicNewsListCard = dynamic(() => import('../components/SectionNewsListCard'), {
  suspense: true,
})
const DynamicNewsCard = dynamic(() => import('../components/News'), {
  suspense: true,
})
// const newsapi = new NewsApi(process.env.NEWS_API_KEY)
const Home: NextPage = () => {
  return (
    <>
       <Container >
        <Typography sx={{padding: "25px 0"}} variant="h4" component="h2" fontWeight={500}>
          Your Topics  
        </Typography>
        <Grid container spacing={4}>
            <Grid item md={4}>
            <Suspense fallback={ 
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            }>
            <DynamicNewsListCard heading='Business'>
            <Suspense fallback={ 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              }>
              <DynamicNewsCard  title="Amazon's smart thermostat is back down to $42 for Black Friday" img='hello' publishedAt="12/12/2022" author='Pradeep nayak'></DynamicNewsCard>    
          </Suspense>
          <Suspense fallback={ 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              }>
              <DynamicNewsCard  title="Amazon's smart thermostat is back down to $42 for Black Friday" img='hello' publishedAt="12/12/2022" author='Pradeep nayak'></DynamicNewsCard>    
          </Suspense>
          <Suspense fallback={ 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              }>
              <DynamicNewsCard  title="Amazon's smart thermostat is back down to $42 for Black Friday" img='hello' publishedAt="12/12/2022" author='Pradeep nayak'></DynamicNewsCard>    
          </Suspense>
            </DynamicNewsListCard>     
          </Suspense>
        </Grid>
        <Grid item md={4}>
          <Suspense fallback={ 
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            }>
            <DynamicNewsListCard heading='Technology'>
            <Suspense fallback={ 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              }>
              <DynamicNewsCard  title="Amazon's smart thermostat is back down to $42 for Black Friday" img='hello' publishedAt="12/12/2022" author='Pradeep nayak'></DynamicNewsCard>    
          </Suspense>
          <Suspense fallback={ 
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            }>
           <DynamicNewsCard  title="Amazon's smart thermostat is back down to $42 for Black Friday" img='hello' publishedAt="12/12/2022" author='Pradeep nayak'></DynamicNewsCard>    
          </Suspense>
            <Suspense fallback={ 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              }>
            <DynamicNewsCard  title="Amazon's smart thermostat is back down to $42 for Black Friday" img='hello' publishedAt="12/12/2022" author='Pradeep nayak'></DynamicNewsCard>    
            </Suspense>
            </DynamicNewsListCard>     
          </Suspense>
            </Grid>
            <Grid item md={4}>
            <Suspense fallback={ 
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            }>
            <DynamicNewsListCard heading='Entertainment'></DynamicNewsListCard>     
          </Suspense>
            </Grid>
        </Grid>
    </Container>
    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

// export const getStaticProps: GetStaticProps = async (ctx) => {
  
//   // const res = await newsapi.v2.topHeadlines({
//   //   from: '2022-11-24',
//   //   language: 'en',
//   //   category:'sports',
//   //   sortBy: 'popularity',
//   // })

//   return {
//     props: {}
//   }
// }


export default Home
