import { Container, Grid, Typography } from '@mui/material'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { Suspense, useState } from 'react'
import News from '../components/News'
// import NewsCard from '../components/NewsCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsApi from 'newsapi'
import dynamic from 'next/dynamic'

const DynamicNewsCard = dynamic(() => import('../components/NewsCard'))
interface Article {
  source:object;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Response {
  status: string;
  totalResults:number;
  articles: Article[];
}

const business: NextPage = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [articlesFetched, setArticlesFetched] = useState<Article[]>();
  return (
    <>
      <Container>
      <Typography sx={{padding: "25px 0"}} variant="h4" component="h2" fontWeight={500}>
          Business  
        </Typography>
        <Grid container spacing={4}>
          {
            articles && articles.map((post:Article)=>(
              <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              
              >
               <Grid item sm={4} key={`post-${post.title}`}>
                <Suspense fallback={<>Loading</>}>
                <DynamicNewsCard>
                  <News  title={post.title} img={post.urlToImage} publishedAt={post.publishedAt} author={post.author?.split(' ')[0] || "Annonymous"} />
                </DynamicNewsCard>
                </Suspense>
              </Grid>
              </InfiniteScroll>
              
              )
            )
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
    category: 'business',
    language: 'en',
    pageSize: 10
  })
  return {
    props: {
      articles : data.articles
    }
  }
}


export default business