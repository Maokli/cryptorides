import React, { useState } from 'react';
import { List, ListItem, Divider, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Dashboard as DashboardIcon,
  DriveEta as CarRentIcon,
  AttachMoney as ReimburseIcon,
  Mail as InboxIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const useStyles = makeStyles({
  sidebar: {
    width: 250,
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid lightgrey',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    color: 'lightgrey',
    fontFamily: 'Montserrat-Regular',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#0CC0DF',
      backgroundColor: 'transparent',
    },
    textAlign: 'left', 
  },
  selected: {
    color: '#0CC0DF',
  },
  listItem: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center', 
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingBottom: 20, 
  },
  logout: {
    width: '100%',
    borderTop: '1px solid lightgrey',
    padding: '10px 0',
  }
});

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleButtonClick = (index: number): void => {
    setSelectedIndex(index);
  };

  return (
    <Box className={classes.sidebar}>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon /> },
          { text: 'CarRent', icon: <CarRentIcon /> },
          { text: 'Reimburse', icon: <ReimburseIcon /> },
          { text: 'Inbox', icon: <InboxIcon /> },
          { text: 'Calendar', icon: <CalendarIcon /> },
          { text: 'Settings', icon: <SettingsIcon /> },
          { text: 'Help & Center', icon: <HelpIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disableGutters className={classes.listItem}>
            <Button
              startIcon={item.icon}
              className={`${classes.button} ${selectedIndex === index ? classes.selected : ''}`}
              onClick={() => handleButtonClick(index)}
            >
              {item.text}
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box className={classes.logoutContainer}>
        <ListItem disableGutters className={classes.logout}>
          <Button
            startIcon={<LogoutIcon />}
            className={classes.button}
            onClick={() => handleButtonClick(-1)}
          >
            Logout
          </Button>
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
