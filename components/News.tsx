import React from 'react'
import { Box, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import Image from 'next/image';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Link from 'next/link';
interface NewsProps {
  title: string;
  img: string;
  publishedAt: string;
  author: string;
}

const News = ({title, img, publishedAt, author}: NewsProps):JSX.Element => {
  return (
    <>
    <Box mt={2}>
      <Grid container spacing={4} py={2}>
        <Grid item sm={9}>
        <Link href={'https://google.com'} target="_blank"><Typography variant='body1' fontWeight={500}> {title || "Default Title"}</Typography></Link>
        </Grid>
        <Grid item sm={3}>
          <Box height={60} width={60} overflow="hidden" borderRadius={2} >
            <Image src={"https://picsum.photos/200/300"} style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }} height={60} width={60} alt={title} />   
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item sm={4}>
         <Typography variant='overline'> {publishedAt || "13543153"}</Typography>
        </Grid>
        <Grid item sm={4}>
         <Typography variant='overline'> {author || "13543153"}</Typography>
        </Grid>
        <Grid item sm={4} display="flex" justifyContent="end">
            <IconButton size='small'>
              <ShareRoundedIcon fontSize={'small'}/>
            </IconButton>
        </Grid>
      </Grid>
    </Box>
      <Divider/>
    </>
  )
}

export default News