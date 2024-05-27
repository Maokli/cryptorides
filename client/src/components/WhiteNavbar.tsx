// src/components/WhiteNavbar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box } from '@mui/material';
import { Search, Notifications, Settings, AccountCircle } from '@mui/icons-material';
import { makeStyles, createStyles } from '@mui/styles';
import { useTheme, Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: 'white',
      borderBottom: '1px solid lightgray',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    brand: {
      color: '#0CC0DF',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    search: {
      position: 'relative',
      borderRadius: '50px',
      backgroundColor: '#f1f1f1',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    icons: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

const Navbar: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme(); 

  console.log("WhiteNavbar rendered"); 

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.brand} variant="h6" noWrap>
          CRYPTORIDES
        </Typography>
        <Box className={classes.search}>
          <Box className={classes.searchIcon}>
            <Search />
          </Box>
          <InputBase
            placeholder="Search Something here…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <Box className={classes.icons}>
          <IconButton aria-label="show notifications" color="inherit">
            <Notifications />
          </IconButton>
          <IconButton aria-label="settings" color="inherit">
            <Settings />
          </IconButton>
          <IconButton edge="end" aria-label="account of current user" color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
