import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

const NavBar: FunctionComponent = () => {

  const navigateSocial = (url: string) => {
    window.open(url)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} style={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <EnergySavingsLeafIcon />
            </IconButton>
            ENERGY
          </Typography>
          <Typography variant="h6" component="div">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => navigateSocial('https://www.instagram.com/juanvi1017/')}
              sx={{ mr: 2 }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => navigateSocial('https://github.com/juanvi1017')}
              sx={{ mr: 2 }}
            >
              <GitHubIcon />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
