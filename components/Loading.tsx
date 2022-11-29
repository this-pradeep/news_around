import { Backdrop, LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { URL } from 'url';

const Loading = ():JSX.Element =>  {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        const handleStart = (url:string) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url:string) => (url === router.asPath) && setTimeout(() =>{setLoading(false)},5000);
  
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError',  handleComplete)
  
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    return ( <>{loading && <>
  <LinearProgress color='secondary' sx={{position: 'sticky', top: 0, zIndex: 99999}} />
    <Backdrop
    sx={{ color: '#fff', zIndex: 9999, backgroundColor: "rgba(241, 245, 249, 0.8)", backdropFilter: 'blur(2px)', margin: 0, height: '100%', overflow: 'hidden' }}
    open={true}/>
    </> 
    } </>)
}

export default Loading;