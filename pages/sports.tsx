import { Container, Grid, Typography } from '@mui/material'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import News from '../components/News'
import NewsCard from '../components/NewsCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsApi from 'newsapi'

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

const sports: NextPage = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  
  return (
    <>
      <Container>
      <Typography sx={{padding: "25px 0"}} variant="h4" component="h2" fontWeight={500}>
          Sports  
        </Typography>
        <Grid container spacing={4}>
          {
            articles && articles.map((post:Article)=>(
              <Grid item sm={4} key={`post-${post.title}`}>
                <NewsCard children={<News  title={post.title} img={post.urlToImage} publishedAt={post.publishedAt} author={post.author?.split(' ')[0] || "Annonymous"} />} />
              </Grid>
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
    category: 'sports',
    language: 'en',
  })
  // .then((response:Response) => {
  //   console.log(response.articles.length);
  //   /*
  //     {
  //       status: "ok",
  //       articles: [...]
  //     }
  //   */
  // });

  return {
    props: {
      articles : data.articles
    }
  }
}


export default sports