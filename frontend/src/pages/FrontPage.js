import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core';
import ProductList from '../components/ProductCards';

const FrontPage = () => {
    return (
        <div style={{backgroundColor: "#F0F0E0"}}>
            <div class="header-img"></div>
            <div class="header-text">
              <h1>Ristorante Jénerîc</h1>
              <p>A truly generic experience</p>
            </div>
            <ScrollableTabsButtonPrevent/>
        </div>
    );
}
export default FrontPage;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }
  
  const tabsStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appbar: {
      backgroundColor: '#303030',
    },
  }));
  
  function ScrollableTabsButtonPrevent() {
    const classes = tabsStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="off"
          >
            <Tab icon={<InfoIcon />} aria-label="About" {...a11yProps(0)} />
            <Tab icon={<RestaurantMenuIcon />} aria-label="Menu" {...a11yProps(1)} />
            <Tab icon={<PhoneIcon />} aria-label="Reservations" {...a11yProps(2)} />
            </Tabs>       
             
            </AppBar>
        <TabPanel value={value} index={0}>
            <AboutCard/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <MenuCard/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ReservationsCard/>
        </TabPanel>
      </div>
    );
  }

  const cardStyle = makeStyles({
    root: {
      minWidth: 275,
      marginLeft: '5rem',
      marginRight: '5rem',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function MenuCard() {
  const classes = cardStyle();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        <center><h1>Our Menu</h1></center>
        </Typography>
        <Container>
          <ProductList/>
        </Container>
      </CardContent>
    </Card>
  );
}

function AboutCard() {
  const classes = cardStyle();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        <center><h1>About Ristorante Jénerîc</h1></center>
        </Typography>
        <Typography variant="body2" component="p">
          <center>
                
                <div>Ristorante Jénerîcs goal is to be the most basic restaurant imaginable.</div>
                <div>Jénerîc serves only dishes that are microwaved and all dishes are assured to contain at least 5% spit.</div>

                <h2>Where to find us?</h2>
                <p>Ristorante Jénerîc is located on Roadname 1A, 9000 Aalborg.</p>
                <p>Visit our beautiful restaurant to enjoy a meal, or pick up take away ordered in advance to enjoy at home.</p>

                <h2>Contact:</h2>
                <p><b>Please visit our reservations tab for reservations or ordering.</b></p>
                <p><b>This contact info is for complaints and inquiries.</b></p>
                <p>E-Mail: <a href = "mailto:contact@jeneric.com">contact@jeneric.com</a></p>
                <p>Phone: (+12) 34 56 67 90</p>
          </center>
        </Typography>
      </CardContent>
    </Card>
  );
}

function ReservationsCard() {
  const classes = cardStyle();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        <center><h1>Reservations</h1></center>
        </Typography>
        <Typography variant="body2" component="p">
          <center>
                <div>To make a reservation or order a meal for take-away, please call the number below.</div>
                <div>If you are calling outside of our opening hours (5pm - 11pm) or on a national holiday, we may not respond.</div>
                <b><p>Phone: (+09) 87 65 43 21</p></b>
                <div>If you are not able to reach us by phone, please follow the instructions below.</div>
          </center>
        </Typography>
        <Typography variant="h5">
                <center><h3>Reserve by e-mail</h3></center>
        </Typography>
        <Typography variant="body2" component="p">
            <center>
                <div>Please send your desired time and date of reservation to:</div>
                <b><p>E-Mail: <a href = "mailto:reservations@jeneric.com">reservations@jeneric.com</a></p></b>
                <p>An employee will respond to you as soon as possible, create your reservation and confirm with you.</p>
                <div>We hope to see you at Ristorante Jénerîc soon, where our friendly staff will ensure a luxurious dining experience.</div>
            </center>
        </Typography>
      </CardContent>
    </Card>
  );
}