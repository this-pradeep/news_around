import  React, {useCallback, useEffect, useRef, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import { debounce } from "lodash";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Article } from '../interfaces/Article'
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import CallMadeIcon from '@mui/icons-material/CallMade';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {  Autocomplete, Button, Container, Dialog, DialogActions, DialogTitle, FormControl, Grid, InputAdornment, InputBase, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, OutlinedInput, Select, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchObject from '../interfaces/SearchObject';
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
];
const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    outerHeight: '5px',
    innerHeight: '5px',
    height:'4px',
    // maxWidth:'20px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.87)'
  },
});
const StyledSearchMenu = styled(Menu)({
  '& .MuiMenu-paper': {
   padding: '20px 20px 0',
   width: '600px'
  },
});


export default function PrimarySearchAppBar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElSearch, setAnchorElSearch] = useState<null | HTMLElement>(null);
  const [suggestions, setSuggestions] = useState<Article[]>();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [advanceSearch, setAdvanceSearch] = useState<SearchObject | null>(null);
  const formRef = useRef(null)

useEffect(() => {
 console.log(suggestions)
//  return()=>{console.log(suggestions)}
}, [suggestions, advanceSearch])

// Handling form submission;
const handleFormSubmit = (e:React.FormEvent<HTMLElement>) => {
  e.preventDefault()
  
  console.log("Form submitted Successfully", advanceSearch?.exactPhrase, advanceSearch?.fromDate, advanceSearch?.searchIn, advanceSearch?.sortBy, advanceSearch?.toDate)
}
// Reseting Form Data
const resetFormData = () => {
  // @ts-ignore
  formRef.current?.reset()
 setAdvanceSearch(null)
}
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  
  const isMenuOpen = Boolean(anchorEl);
  const isSearchSuggestionOpen = Boolean(anchorElSearch);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
  const handleSearchInputChange = debounce((value:string):void => {
    fetch(`https://newsapi.org/v2/everything?q=${value}&searchIn=title&apiKey=42812dc9f8ac48a98aa4740520261e4d&pageSize=5`)
      .then((res) => res.json())
      .then((json) => {
        setSuggestions(json.articles)
      });
  }, 500);

// console.log(suggestions)

  const menuId = 'primary-search-account-menu';
  const menuId2 = 'search-articles-dropdown-list';
  const renderSearchSuggestions = (
    <List
    sx={{
      width: '100%',
      maxWidth: 900,
      bgcolor: 'background.paper',
      position: 'absolute',
      top:50,
      overflow: 'auto',
      maxHeight: 300,
      '& ul': { padding: 0 },
    }}
    subheader={<li />}
  >
    {
      <li >
        <ul>
          <ListSubheader>{`your search results are: `}</ListSubheader>
          { suggestions &&  suggestions?.length != 0 && suggestions.map((item, i) => (
            <ListItem key={`item-${item.title}${i}`} onClick={() => {
                setSuggestions([])
              router.push(`/item-${item.title}`,'',{ shallow: true })
              }}>
              <ListItemText primary={`${item.title}`} />
            </ListItem>
          ))}
        </ul>
      </li>
    }
  </List>
  );
  // Styled Search Menu
  const renderMenu = (
    <StyledSearchMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Advance Search Form Begins */}
      <form onSubmit={handleFormSubmit} ref={formRef}  action="submit" method='post'>
      <FormControl fullWidth size='small' margin={'normal'}>
        <OutlinedInput 
        color='secondary' 
        size='small' 
        fullWidth 
        error={advanceSearch?.exactPhrase == ''}
        placeholder='Exact Phrase'
        onChange={debounce((e) => {
          // @ts-ignore
          setAdvanceSearch((previousState:SearchObject) => {
            return { ...previousState, exactPhrase: e.target.value }
          })
        },500)}
        ></OutlinedInput>
      </FormControl>
      <FormControl fullWidth size='small' color='secondary' margin={'normal'}>
        <Select
          value={advanceSearch?.searchIn || 'Search In'}
          onChange={(e) => {
            // @ts-ignore
            setAdvanceSearch((previousState:SearchObject) => {
              return { ...previousState, searchIn: e.target.value }
            })
          }}
        >
          <MenuItem value={'Search In'} disabled>Search In</MenuItem>
          <MenuItem value={'title'} >Title</MenuItem>
          <MenuItem value={'description'}>Description</MenuItem>
          <MenuItem value={'content'}>Content</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={5}>
        <Grid item sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat="DD-MM-YYYY"
          label="From"
          value={advanceSearch?.fromDate}
          onChange={debounce((newValue) => {
            // @ts-ignore
           const date =  newValue?.$d.getFullYear() + "-" + (newValue?.$d.getMonth() + 1) + "-" + newValue?.$d.getDate();
            // @ts-ignore
            setAdvanceSearch((previousState:SearchObject) => {
              return { ...previousState, fromDate: date }
            })
          },500)}
          renderInput={(params) => <TextField size='small' color='secondary'  margin='normal' {...params} />}
        />
    </LocalizationProvider>
        </Grid>
        <Grid item sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat="DD-MM-YYYY"
          label="To"
          value={advanceSearch?.toDate}
          onChange={debounce((newValue) => {
            // @ts-ignore
           const date =  newValue?.$d.getFullYear() + "-" + (newValue?.$d.getMonth() + 1) + "-" + newValue?.$d.getDate();
            // @ts-ignore
            setAdvanceSearch((previousState:SearchObject) => {
              return { ...previousState, toDate: date }
            })
          },500)}
          renderInput={(params) => <TextField size='small' color='secondary'  margin='normal' {...params} />}
        />
    </LocalizationProvider>
        </Grid>
      </Grid>
      <DialogActions>
          <Button onClick={resetFormData} color='secondary'>Clear</Button>
          <Button type="submit" autoFocus color='secondary' variant='contained'>
            Search
          </Button>
        </DialogActions>
      </form>
    </StyledSearchMenu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box >
      <AppBar position="sticky" color='transparent'>
      <Container maxWidth={'lg'}>
        <Toolbar sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}} >
        <svg width="300" height="45" viewBox="0 0 405 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M68.22 48.4106H65.58C65.02 48.4106 64.74 48.1306 64.74 47.5706V10.6706C64.74 10.1106 65.02 9.83064 65.58 9.83064H68.04C68.52 9.83064 68.84 9.99064 69 10.3106L85.56 39.4106H85.8V10.6706C85.8 10.1106 86.08 9.83064 86.64 9.83064H89.28C89.84 9.83064 90.12 10.1106 90.12 10.6706V47.5706C90.12 48.1306 89.84 48.4106 89.28 48.4106H87.06C86.62 48.4106 86.2 48.1506 85.8 47.6306L69.3 18.8306H69.06V47.5706C69.06 48.1306 68.78 48.4106 68.22 48.4106ZM119.283 48.4106H100.443C99.8833 48.4106 99.6033 48.1306 99.6033 47.5706V10.6706C99.6033 10.1106 99.8833 9.83064 100.443 9.83064H119.283C119.843 9.83064 120.123 10.1106 120.123 10.6706V12.8306C120.123 13.3906 119.843 13.6706 119.283 13.6706H104.583C104.183 13.6706 103.983 13.8506 103.983 14.2106V26.3306C103.983 26.6906 104.183 26.8706 104.583 26.8706H117.423C117.983 26.8706 118.263 27.1506 118.263 27.7106V29.8706C118.263 30.4306 117.983 30.7106 117.423 30.7106H104.583C104.183 30.7106 103.983 30.8906 103.983 31.2506V44.0306C103.983 44.3906 104.183 44.5706 104.583 44.5706H119.283C119.843 44.5706 120.123 44.8506 120.123 45.4106V47.5706C120.123 48.1306 119.843 48.4106 119.283 48.4106ZM138.631 48.4106H134.011C133.451 48.4106 133.111 48.1306 132.991 47.5706L125.311 10.6706C125.191 10.1106 125.451 9.83064 126.091 9.83064H129.331C129.931 9.83064 130.251 10.1106 130.291 10.6706L136.351 43.7306H136.711L144.811 10.6106C144.931 10.0906 145.251 9.83064 145.771 9.83064H149.371C149.891 9.83064 150.211 10.0906 150.331 10.6106L158.551 43.7306H158.911L164.911 10.7306C165.031 10.1306 165.371 9.83064 165.931 9.83064H169.171C169.811 9.83064 170.071 10.1306 169.951 10.7306L162.211 47.5706C162.091 48.1306 161.771 48.4106 161.251 48.4106H156.631C156.071 48.4106 155.731 48.1306 155.611 47.5706L147.751 15.3506H147.511L139.591 47.5706C139.471 48.1306 139.151 48.4106 138.631 48.4106ZM175.824 39.5306V37.6106C175.824 37.0506 176.104 36.7706 176.664 36.7706H179.364C179.924 36.7706 180.204 37.0506 180.204 37.6106V39.1706C180.204 42.7706 181.984 44.5706 185.544 44.5706H190.824C194.384 44.5706 196.164 42.7306 196.164 39.0506V37.0106C196.164 34.1306 193.784 32.2506 189.024 31.3706C187.024 31.0106 185.024 30.5906 183.024 30.1106C181.024 29.6306 179.324 28.7106 177.924 27.3506C176.524 25.9506 175.824 24.0506 175.824 21.6506V18.7106C175.824 15.9506 176.604 13.7906 178.164 12.2306C179.764 10.6306 181.944 9.83064 184.704 9.83064H191.364C194.084 9.83064 196.244 10.6306 197.844 12.2306C199.444 13.7906 200.244 15.9506 200.244 18.7106V20.2106C200.244 20.8106 199.984 21.1106 199.464 21.1106H196.704C196.184 21.1106 195.924 20.8106 195.924 20.2106V19.1306C195.924 15.4906 194.144 13.6706 190.584 13.6706H185.484C181.924 13.6706 180.144 15.5706 180.144 19.3706V21.7706C180.144 23.8106 181.484 25.2106 184.164 25.9706C185.364 26.2906 186.684 26.5906 188.124 26.8706C189.564 27.1106 191.004 27.4506 192.444 27.8906C193.924 28.2906 195.264 28.8106 196.464 29.4506C197.664 30.0506 198.624 30.9906 199.344 32.2706C200.104 33.5106 200.484 35.0306 200.484 36.8306V39.5306C200.484 42.2906 199.684 44.4706 198.084 46.0706C196.484 47.6306 194.324 48.4106 191.604 48.4106H184.704C181.984 48.4106 179.824 47.6306 178.224 46.0706C176.624 44.4706 175.824 42.2906 175.824 39.5306ZM210.005 48.4106H207.005C206.485 48.4106 206.305 48.1306 206.465 47.5706L217.685 10.6706C217.845 10.1106 218.225 9.83064 218.825 9.83064H223.145C223.745 9.83064 224.125 10.1106 224.285 10.6706L235.505 47.5706C235.665 48.1306 235.485 48.4106 234.965 48.4106H231.905C231.465 48.4106 231.185 48.1306 231.065 47.5706L228.245 38.8106H213.725L210.905 47.5706C210.745 48.1306 210.445 48.4106 210.005 48.4106ZM220.865 14.3306L214.685 35.0906H227.285L221.105 14.3306H220.865ZM245.468 48.4106H242.768C242.208 48.4106 241.928 48.1306 241.928 47.5706V10.6706C241.928 10.1106 242.208 9.83064 242.768 9.83064H256.568C259.328 9.83064 261.508 10.6306 263.108 12.2306C264.708 13.7906 265.508 15.9506 265.508 18.7106V24.1706C265.508 26.4106 264.968 28.2706 263.888 29.7506C262.808 31.1906 261.308 32.1506 259.388 32.6306V32.8706L266.348 47.4506C266.708 48.0906 266.508 48.4106 265.748 48.4106H263.048C262.368 48.4106 261.868 48.1306 261.548 47.5706L254.827 33.0506H246.908C246.508 33.0506 246.308 33.2306 246.308 33.5906V47.5706C246.308 48.1306 246.028 48.4106 245.468 48.4106ZM246.908 29.3906H255.968C259.408 29.3906 261.128 27.6706 261.128 24.2306V18.8906C261.128 15.4106 259.408 13.6706 255.968 13.6706H246.908C246.508 13.6706 246.308 13.8506 246.308 14.2106V28.8506C246.308 29.2106 246.508 29.3906 246.908 29.3906ZM282.914 44.5706H289.034C292.394 44.5706 294.074 42.8306 294.074 39.3506V18.8906C294.074 15.4106 292.394 13.6706 289.034 13.6706H282.914C279.594 13.6706 277.934 15.4106 277.934 18.8906V39.3506C277.934 42.8306 279.594 44.5706 282.914 44.5706ZM289.574 48.4106H282.434C279.674 48.4106 277.494 47.6306 275.894 46.0706C274.334 44.5106 273.554 42.3306 273.554 39.5306V18.7106C273.554 15.9106 274.334 13.7306 275.894 12.1706C277.494 10.6106 279.674 9.83064 282.434 9.83064H289.574C292.334 9.83064 294.494 10.6306 296.054 12.2306C297.654 13.7906 298.454 15.9506 298.454 18.7106V39.5306C298.454 42.2906 297.654 44.4706 296.054 46.0706C294.494 47.6306 292.334 48.4106 289.574 48.4106ZM327.838 9.83064H330.538C331.098 9.83064 331.378 10.0906 331.378 10.6106V39.5306C331.378 42.3306 330.598 44.5106 329.038 46.0706C327.478 47.6306 325.318 48.4106 322.558 48.4106H315.898C313.138 48.4106 310.958 47.6306 309.358 46.0706C307.798 44.5106 307.018 42.3306 307.018 39.5306V10.6706C307.018 10.1106 307.298 9.83064 307.858 9.83064H310.558C311.118 9.83064 311.398 10.1106 311.398 10.6706V39.3506C311.398 42.8306 313.058 44.5706 316.378 44.5706H322.018C325.378 44.5706 327.058 42.8306 327.058 39.3506V10.6706C327.058 10.1106 327.318 9.83064 327.838 9.83064ZM344.021 48.4106H341.381C340.821 48.4106 340.541 48.1306 340.541 47.5706V10.6706C340.541 10.1106 340.821 9.83064 341.381 9.83064H343.841C344.321 9.83064 344.641 9.99064 344.801 10.3106L361.361 39.4106H361.601V10.6706C361.601 10.1106 361.881 9.83064 362.441 9.83064H365.081C365.641 9.83064 365.921 10.1106 365.921 10.6706V47.5706C365.921 48.1306 365.641 48.4106 365.081 48.4106H362.861C362.421 48.4106 362.001 48.1506 361.601 47.6306L345.101 18.8306H344.861V47.5706C344.861 48.1306 344.581 48.4106 344.021 48.4106ZM380.384 44.5706H390.464C393.824 44.5706 395.504 42.8306 395.504 39.3506V18.8906C395.504 15.4106 393.824 13.6706 390.464 13.6706H380.384C379.984 13.6706 379.784 13.8506 379.784 14.2106V44.0306C379.784 44.3906 379.984 44.5706 380.384 44.5706ZM375.404 47.5706V10.6706C375.404 10.1106 375.684 9.83064 376.244 9.83064H391.004C393.764 9.83064 395.924 10.6306 397.484 12.2306C399.084 13.7906 399.884 15.9506 399.884 18.7106V39.5306C399.884 42.2906 399.084 44.4706 397.484 46.0706C395.924 47.6306 393.764 48.4106 391.004 48.4106H376.244C375.684 48.4106 375.404 48.1306 375.404 47.5706Z" fill="black"/>
            <path d="M29.0625 19.5122H32.6953M29.0625 26.7778H32.6953M14.5313 34.0435H32.6953M14.5313 41.3091H32.6953M39.9609 19.5122H48.1348C49.6388 19.5122 50.8594 20.7328 50.8594 22.2368V44.9419C50.8594 46.3871 50.2853 47.7732 49.2633 48.7951C48.2414 49.817 46.8554 50.3911 45.4102 50.3911M39.9609 19.5122V44.9419C39.9609 46.3871 40.5351 47.7732 41.557 48.7951C42.5789 49.817 43.9649 50.3911 45.4102 50.3911M39.9609 19.5122V13.1548C39.9609 11.6508 38.7403 10.4302 37.2363 10.4302H9.99023C8.48625 10.4302 7.26562 11.6508 7.26562 13.1548V44.9419C7.26562 46.3871 7.83974 47.7732 8.86166 48.7951C9.88359 49.817 11.2696 50.3911 12.7148 50.3911H45.4102M14.5313 19.5122H21.7969V26.7778H14.5313V19.5122Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Search Field Begins */}
          <FormControl sx={{ ml: 4 }} fullWidth variant="outlined" color='secondary' style={{position: 'relative'}}>
          <OutlinedInput
            id="filled-adornment-password"
            size='small'
            placeholder='Search for topics, countries, &amp; sources'
            onChange={(e) => {
              if(e.target.value!== '') {
                console.log("If",e.target.value)
                handleSearchInputChange(e.target.value)
              } else{
                console.log("Else", e.target.value)
                setSuggestions([])
              }
              }}
            startAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Search Dropdown"
                  edge="start"
                >
                   <SearchOutlinedIcon /> 
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Search Dropdown"
                  onClick={handleMenuOpen}
                  edge="end"
                >
                  {!open ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          { suggestions && suggestions?.length != 0 && renderSearchSuggestions }
          {renderMenu}
        </FormControl>
        {suggestions && (
        <div className="autocomplete">
          {suggestions.map((el:any, i) => (
            <div key={i} className="autocompleteItems">
              <span>{el.name}</span>
            </div>
          ))}
        </div>
      )}
        </Toolbar>
          <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor='secondary'
          allowScrollButtonsMobile
          aria-label="Categories"
          // centered
        >
          <Tab disableRipple label="Home" onClick={()=>{router.push('/','',{ shallow: true })}} />
          <Tab disableRipple label="Business" onClick={()=>{router.push('/business','',{ shallow: true })}}/>
          <Tab disableRipple label="Entertainment"onClick={()=>{router.push('/entertainment','',{ shallow: true })}} />
          <Tab disableRipple label="General" onClick={()=>{router.push('/general','',{ shallow: true })}} />
          <Tab disableRipple label="Health" onClick={()=>{router.push('/health','',{ shallow: true })}} />
          <Tab disableRipple label="Science" onClick={()=>{router.push('/science','',{ shallow: true })}} />
          <Tab disableRipple label="Sports" onClick={()=>{router.push('/sports','',{ shallow: true })}}/>
          <Tab disableRipple label="Technology" onClick={()=>{router.push('/technology','',{ shallow: true })}} />
        </StyledTabs>
        </Container>
      </AppBar>
      {renderMobileMenu}    
    </Box>
  );
}