import { Button, DialogActions, FormControl, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, ListSubheader, Menu, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { debounce } from "lodash";
import SearchObject from '../interfaces/SearchObject';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Article } from '../interfaces/Article'
import { styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';

const StyledSearchMenu = styled(Menu)({
    '& .MuiMenu-paper': {
     padding: '20px 20px 0',
     width: '600px'
    },
  });

const SearchBar = ():JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [advanceSearch, setAdvanceSearch] = useState<SearchObject | null>(null);
    const [suggestions, setSuggestions] = useState<Article[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElSearch, setAnchorElSearch] = useState<null | HTMLElement>(null);
    const formRef = useRef(null);
    const router = useRouter();


useEffect(() => {}, [suggestions])
        
const handleMenuClose = () => {
    setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
  
  const isMenuOpen = Boolean(anchorEl);
  const isSearchSuggestionOpen = Boolean(anchorElSearch);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchInputChange = debounce(async(value:string)=>{
    const res = await fetch(`https://newsapi.org/v2/everything?apiKey=42812dc9f8ac48a98aa4740520261e4d&q=${value}&pageSize=5`);
    const data = await res.json();
    console.log("Data:",data)
    setSuggestions(data.articles)
  },500)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // @ts-ignore
    if (event.key === 'Enter' && event?.target?.value!= '') {
      setSuggestions([])
      // @ts-ignore
      router.push(`/search?q=${event?.target?.value}`)
    }
  }
  
        // Handling form submission;
const handleFormSubmit = (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(`/search?exactPhrase=${advanceSearch?.exactPhrase}&searchIn=${advanceSearch?.searchIn}&From=${advanceSearch?.fromDate}&To=${advanceSearch?.toDate}`)
    handleMenuClose()
    // console.log("Form submitted Successfully", advanceSearch?.exactPhrase, advanceSearch?.fromDate, advanceSearch?.searchIn, advanceSearch?.sortBy, advanceSearch?.toDate)
  }
  // Reseting Form Data
  const resetFormData = () => {
    // @ts-ignore
    formRef.current?.reset()
   setAdvanceSearch(null)
  }
// Render Search Suggestions
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
    <form onSubmit={handleFormSubmit} ref={formRef} >
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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


  return (
    <>
    <FormControl sx={{ ml: 4 }} fullWidth variant="outlined" color='secondary' style={{position: 'relative'}}>
          <OutlinedInput
            id="filled-adornment-password"
            size='small'
            // value={searchQ}
            placeholder='Search for topics, countries, &amp; sources'
            onChange={(e) =>{handleSearchInputChange(e.target.value)}}
            onKeyDown={handleKeyDown} 
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
    </>
  )
}

export default SearchBar