import React from 'react'
import { AppBar, Box, Button, Container, Dialog, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography } from '@mui/material'
import Image from 'next/image';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface NewsProps {
  title: string;
  img: string;
  publishedAt: string;
  description: string;
}



const News = ({title, img, publishedAt, description}: NewsProps):JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box mt={2} onClick={handleClickOpen} sx={{cursor: 'pointer'}} >
      <Grid container spacing={4} py={2}>
        <Grid container item xs={8}>
        <Typography variant='body1' fontWeight={500}> {title || "Default Title"}</Typography>
        <Grid item xs={6}>
         <Typography variant='overline'> {new Date(publishedAt).toDateString()}</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <IconButton size='small'>
              <ShareRoundedIcon fontSize={'small'}/>
            </IconButton>
        </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box  maxHeight={100} maxWidth={100} overflow="hidden" borderRadius={2} >
            <img src={img} loading="lazy" style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }} height={100}  width={100} alt={'post'} />   
          </Box>
        </Grid>
      </Grid>
      {/* <Grid container spacing={4}>
        
      </Grid> */}
    </Box>
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative'}} color="default" >
          <Toolbar sx={{paddingTop: 3, paddingBottom:3}}>
            <Container>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             {title}
            </Typography>
            </Container>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
        <Typography variant='h6' component={'h5'}  mt={3}> {description}</Typography>
        </Container>
      </Dialog>
      {/* <Divider/> */}
    </>
  )
}

export default News