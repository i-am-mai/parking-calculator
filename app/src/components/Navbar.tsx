import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {ReactComponent as Logo} from '../static/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';
import { Box, IconButton, Menu, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { GitHub } from '@mui/icons-material'


export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    


    return (
        <AppBar position="static" sx={{backgroundColor: "#2d2f37"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography      
                        fontSize={'1.5rem'}
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        ":hover": {color: 'white'}
                    }}>
                        <SvgIcon component={Logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, fontSize: '2rem'}}/>
                        Parking Calculator
                    </Typography>

                    <Typography      
                        fontSize={"1.5rem"}     
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        height: '100%',
                        display: { xs: 'flex', md: 'none' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        <SvgIcon component={Logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '2rem'}}/>
                        Parking Calculator
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                        <Button
                            key={1}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 'auto', color: 'white', display: 'block', ":hover": {color: "gray"}, ml: 'auto'}}
                            href="/about"
                        >
                            About
                        </Button>
                        <IconButton 
                            href="https://github.com/i-am-mai/parking-calculator"
                            onClick={handleCloseNavMenu}
                            sx={{color: 'white', ":hover": {color: "gray"}, transition: '0.4s'}}
                            >
                            <GitHub></GitHub>
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{
                                ml: "auto",
                            }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        <MenuItem key={1} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" component="a" href="/about">About</Typography>
                        </MenuItem>
                        <MenuItem key={2} onClick={handleCloseNavMenu}>
                            <IconButton href="https://github.com/i-am-mai/parking-calculator">
                                <GitHub></GitHub>
                            </IconButton>
                        </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}