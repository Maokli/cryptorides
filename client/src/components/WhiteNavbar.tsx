import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { IoFilterOutline, IoCarSport } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { AiFillHeart } from 'react-icons/ai';
import logo from '../assets/images/WhiteLogo.png';
import { handleLogout as performLogout } from '../helpers/auth.helpers';
import { CarFilters } from '../models/car-filters.model';
import CarFiltersComponent from '../components/car-filters.component';
import { useFilters } from '../components/filterContext';


export default function WhiteNavbar() {
  const props = useFilters();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    performLogout();
    navigate('/');
  };

  const handleCars = () => {
    navigate('/browse');
  };

  const onSearchInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newFilters = { ...props.filters };
    newFilters.search = (e.target as HTMLInputElement).value;
    props.setFilters(newFilters);
  };

  const handleFilterClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  // Other code remains the same...

  const iconButtonStyle = {
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: 1,
    margin: 0.5,
  };

  const avatarButtonStyle = {
    ...iconButtonStyle,
    padding: 0.5,
  };

  const searchBarStyle = {
    backgroundColor: 'rgba(211, 211, 211, 0.1)',
    borderRadius: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    width: '492px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    border: 'none', 
    position: 'absolute',
    left: '500px',
    top: '10px',
  };

  const searchIconStyle = {
    fontSize: '1.2rem',
    color: 'gray',
    marginRight: '5px',
  };

  const filterIconStyle = {
    fontSize: '1.2rem',
    color: 'gray',
    marginLeft: 'auto',
    cursor: 'pointer',
  };

  const textFieldStyle = {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent', 
      },
      '&:hover fieldset': {
        borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
    },
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchInput(e);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const newFilters = { ...props.filters, search: e.target.value };
    props.setFilters(newFilters);
    console.log(props) ; 
  };

  return (
    <>
      <AppBar position="static" elevation={1} sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="CryptoRides Logo" style={{ height: 60 }} />
          </Box>
          <Box display="flex" alignItems="center" marginLeft="auto" marginRight="auto" sx={searchBarStyle}>
            <CiSearch style={searchIconStyle} />
            <TextField
              placeholder="Search Something here..."
              variant="outlined"
              size="small"
              sx={textFieldStyle}
              value={searchTerm}
              onKeyDown={handleKeyDown}
              onChange={handleSearchInputChange}
              InputProps={{
                endAdornment: (
                  <IoFilterOutline
                    style={filterIconStyle}
                    onClick={handleFilterClick}
                  />
                ),
              }}
            />
          </Box>
          <Box display="flex" alignItems="center" marginLeft="auto">
            <IconButton sx={iconButtonStyle} color="inherit" onClick={handleCars}>
              <IoCarSport />
            </IconButton>
            <IconButton sx={iconButtonStyle} color="inherit">
              <Badge badgeContent={0} color="primary">
                <IoIosNotifications />
              </Badge>
            </IconButton>
            <IconButton sx={iconButtonStyle} color="inherit">
              <AiFillHeart />
            </IconButton>
            <IconButton sx={avatarButtonStyle} color="inherit" onClick={handleMenuOpen}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/profile">
                My Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/publishedcars">
                My Cars
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/publishedrequest">
                My Requests
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Filter Cars</DialogTitle>
        <DialogContent>
          <CarFiltersComponent filters={props.filters} setFilters={props.setFilters} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
          <Button onClick={handleDialogClose} color="primary">Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

