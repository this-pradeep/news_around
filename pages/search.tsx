import { Container, Grid, Typography } from '@mui/material'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { Suspense, useEffect, useState } from 'react'
import News from '../components/News'
import NewsApi from 'newsapi'
import dynamic from 'next/dynamic'
import { Article } from '../interfaces/Article'
import { useRouter } from 'next/router'
const NewsCard = dynamic(() => import('../components/NewsCard'))


const Search: NextPage = () => {
  const router = useRouter()
  const [articles,setArticles] = useState([])
  const { exactPhrase , searchIn, From, To, q} = router.query;
  useEffect(()=>{
    // console.log(exactPhrase , searchIn, From, To)
    getData()
  }, [exactPhrase, q])
  // console.log(pid)
  const getData = async() =>{
    if (exactPhrase) {
      const res =  await fetch(`https://newsapi.org/v2/everything?apiKey=42812dc9f8ac48a98aa4740520261e4d&q="${exactPhrase}"&searchIn=${searchIn}&from=${From}&to=${To}`);
      const data = await res.json();
      setArticles(data.articles)
    } else {
      const res =  await fetch(`https://newsapi.org/v2/everything?apiKey=42812dc9f8ac48a98aa4740520261e4d&q=${q}`);
      const data = await res.json();
      setArticles(data.articles)
    }
  } 
  return (
    <>
      <Container>
      <Typography sx={{padding: "25px 0"}} variant="h4" component="h2" fontWeight={500}>
          Search Results 
        </Typography>
        <Grid container spacing={4}>
          {
            articles && articles.map((post:Article, i:number)=>(
              <Grid item sm={4} key={`post-${i}-${post.title}`}>
                <Suspense fallback={<>Loading</>}>
                <NewsCard>
                  <News  title={post.title} img={post.urlToImage} publishedAt={post.publishedAt} description={post.description} />
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

export default Search