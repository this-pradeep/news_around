import { Grid } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import dynamic from 'next/dynamic'
import News from './News';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const DynamicNewsCard = dynamic(() => import('../components/NewsCard'));

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
  
  const InfiniteScrollNews = () => {
    const [articlesFetched, setArticlesFetched] = useState<Article[]>();
   
    const fetchData = async () =>{
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.newsAPIKey}&pageSize=2`)
        const articlesData = await res.json().then((data)=>data.articles)
        setArticlesFetched(articlesData)
  
        console.log("Infinite Scroll Worked")
    }
    
    // useEffect(() => {
    
    // }, [articlesFetched])
    
  
  
  return (
    <>
        <InfiniteScroll
            dataLength={20}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }
            
            >
            {
                articlesFetched && articlesFetched.map((post:Article)=>(
                    <Grid item key={`post-${post.title}`}>
                <Suspense fallback={<>Loading</>}>
                <DynamicNewsCard>
                    <News  title={post.title} img={post.urlToImage} publishedAt={post.publishedAt} author={post.author?.split(' ')[0] || "Annonymous"} />
                </DynamicNewsCard>
                </Suspense>
                </Grid>
                ))
            }
         </InfiniteScroll>
            </>
  )
}

export default InfiniteScrollNews