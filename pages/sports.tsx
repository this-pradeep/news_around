import { Container, Grid, Typography } from '@mui/material'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { Suspense } from 'react'
import News from '../components/News'
import NewsCard from '../components/NewsCard'
import NewsApi from 'newsapi'
import { Article } from '../interfaces/Article'


const sports: NextPage = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  
  return (
    <>
      <Container>
      <Typography sx={{padding: "25px 0"}} variant="h4" component="h2" fontWeight={500}>
          Sports  
        </Typography>
        <Grid container spacing={4}>
        {
            articles && articles.map((post:Article, i:number )=>(
              <Grid item sm={4} key={`post-${i}-${post.title}`}>
                <Suspense fallback={<>Loading</>}>
                <NewsCard>
                  <News  title={post.title} img={post.urlToImage} publishedAt={post.publishedAt} description={post.description || "Annonymous"} />
                </NewsCard>
                </Suspense>
              </Grid>
              ))
          }
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const newsapi = new NewsApi(process.env.newsAPIKey)
   // All options passed to topHeadlines are optional, but you need to include at least one of them
   const data = await newsapi.v2.topHeadlines({
    category: 'sports',
    language: 'en',
    pageSize: 10
  })


  return {
    props: {
      articles : data.articles
    }
  }
}


export default sports