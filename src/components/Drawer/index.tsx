import React, { useMemo, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Lights from '../Lights';
import Settings from '../Settings';
import Channels from '../Channels';
import useStore from '../../store';
import { createPortal } from 'react-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Frame from 'react-frame-component';


const drawerWidth = 180;

const Main = styled( 'main', { shouldForwardProp: ( prop ) => prop !== 'open' } )<{
  open?: boolean;
}>( ( { theme } ) => ( {
  flexGrow: 1,
  padding: theme.spacing( 3 ),
  transition: theme.transitions.create( 'margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  } ),
  marginLeft: `-${ drawerWidth }px`,
  variants: [
    {
      // @ts-ignore
      props: ( { open } ) => open,
      style: {
        transition: theme.transitions.create( 'margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        } ),
        marginLeft: 0
      }
    }
  ]
} ) );

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled( MuiAppBar, { shouldForwardProp: ( prop ) => prop !== 'open' } )<AppBarProps>( ( { theme } ) => ( {
  transition: theme.transitions.create( ['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  } ),
  variants: [
    {
      props: ( { open } ) => open,
      style: {
        width: `calc(100% - ${ drawerWidth }px)`,
        marginLeft: `${ drawerWidth }px`,
        transition: theme.transitions.create( ['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        } )
      }
    }
  ]
} ) );

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing( 0, 1 ),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
} ) );

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState( false );
  // @ts-ignore
  const activeTab = useStore( ( state ) => state.activeTab );
  // @ts-ignore
  const setActiveTab = useStore( ( state ) => state.setActiveTab );

  const handleDrawerOpen = () => {
    setOpen( true );
  };

  const handleDrawerClose = () => {
    setOpen( false );
    setActiveTab( '' );
  };

  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>( null );

  const mountNode = contentRef?.contentWindow?.document?.body;
  const children = useMemo( () => <Box sx={ { display: 'flex' } }>
    <CssBaseline />
    <AppBar position='fixed' open={ open }>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={ handleDrawerOpen }
          edge='start'
          sx={ [{ mr: 2 }, open && { display: 'none' }] }
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Smart TV menu
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      sx={ {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      } }
      variant='persistent'
      anchor='left'
      open={ open }
    >
      <DrawerHeader>
        <IconButton onClick={ handleDrawerClose }>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          'Channels',
          'Settings',
          'Lights'
        ].map( ( text, index ) => (
          <ListItem key={ text } disablePadding>
            <ListItemButton onClick={ () => setActiveTab( text ) }>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={ text } />
            </ListItemButton>
          </ListItem>
        ) )}
      </List>
    </Drawer>
    <Main open={ open }>
      <DrawerHeader />
      <Box sx={ { background: 'transparent', position: 'fixed', width: '100vw', height: '100vh' } }>
        {/* <div style={{display: 'flex', flexDirection: 'column'}}> */}
        {( activeTab === 'Lights' ) && <Lights/>}
        {( activeTab === 'Settings' ) && <Settings/>}
        {( activeTab === 'Channels' ) && <Channels/>}
        {/* </div> */}
      </Box>
    </Main>
  </Box>, [
    open,
    activeTab,
    handleDrawerClose,
    setActiveTab,
    theme.direction
  ] );

  const cache = createCache( {
    key: 'css',
    container: contentRef?.contentWindow?.document?.head,
    prepend: true
  } );

  return (
    <div style={ { width: '100%', height: '100%', clipPath: 'inset(0 0 0 0)' } }>
      {children}
    </div>
  );

  // return (
  //   <CacheProvider value={ cache }>
  //     {/* <iframe ref = { setContentRef } style={ { width: '100%', height: '100%', display: 'fixed' } } title='test'> */}
  //     {mountNode && createPortal( children, mountNode )}
  //     {/* {children} */}
  //     {/* </iframe> */}
  //   </CacheProvider>
  // );
}
