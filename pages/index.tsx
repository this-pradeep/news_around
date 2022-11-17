import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Button variant='outlined' color='error'>
        Hello
      </Button>
      Index Page
    </div>
  )
}

export default Home
