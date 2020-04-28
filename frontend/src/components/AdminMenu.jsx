import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect} from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Drawer, useTheme, ListItem, ListItemIcon, Divider, ListItemText, List, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import ProductList from '../components/ProductCards';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'secondary',
      backgroundColor: '#303030',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      backgroundColor:'#DCDCDC',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    links: {
      textDecoration:'none',
      color:'#303030'
    }
  }));

export default function AdminMenu() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Administration
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to='/admin/preview' className={classes.links}>
            <ListItem button>
                <ListItemIcon><AppsIcon /></ListItemIcon><ListItemText primary='Preview' />
            </ListItem>
          </Link>
          <Link to='/admin/add' className={classes.links}>
            <ListItem button>
                <ListItemIcon><AddIcon /></ListItemIcon><ListItemText primary='Add' />
            </ListItem>
          </Link>
          <Link to='/admin/update' className={classes.links}>
            <ListItem button>
                <ListItemIcon><UpdateIcon /></ListItemIcon><ListItemText primary='Update' />
            </ListItem>
          </Link>
          <Link to='/admin/delete' className={classes.links}>
            <ListItem button>
                <ListItemIcon><DeleteForeverIcon /></ListItemIcon><ListItemText primary='Remove' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        {/* Add the different page routes here */}
        <Switch>
            <Route exact path='/admin'>
              {/* This is a redirect upon entering the admin page */}
              <Redirect to='/admin/preview' />
            </Route>
            <Route path='/admin/preview'>
              {/* This is the preview page */}
              <Container maxWidth='auto' style={{paddingTop:'4rem'}}>
                <ProductList />
              </Container>
            </Route>
            <Route path='/admin/add'>
              {/* This is the add product page */}
            </Route>
            <Route path='/admin/update'>
              {/* This is the update product page */}
            </Route>
            <Route path='/admin/delete'>
              {/* This is the delete product page */}
            </Route>
          </Switch>
      </main>
    </div>
    );
}