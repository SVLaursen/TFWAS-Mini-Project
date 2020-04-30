import React from 'react';
import axios from 'axios';
import {Grid, makeStyles, Button} from '@material-ui/core';
import { List, ListItem, ListItemAvatar, IconButton, ListItemSecondaryAction, ListItemText, Avatar } from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
  }));

export default class AdminDeleteList extends React.Component{
    state = {
        products: [],
        id: '',
        dialog: false
    }

    componentDidMount(){
        axios.get('http://localhost:3600/api/products')
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({dialog: false});
        const id = this.state.id;

        axios.delete('http://localhost:3600/api/products/' + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch( err => {
                console.log(err);
            });
            
        window.location.reload(false);
    }

    render(){
        const handleDialogOpen = (objId) =>{
            console.log(objId);
            this.setState({id: objId});
            this.setState({dialog: true})
        }

        const handleDialogClose = () =>{
            this.setState({dialog:false});
        }

        return(
            <div>
                <Dialog
                    open={this.state.dialog}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete entry?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this object will remove it from the database and the website. Are you sure that this is what you want to do?
                    </DialogContentText>
                    
                    </DialogContent>
                    <DialogActions>
                    <Button
                        variant="contained"
                        color="default"
                        className={useStyles.button}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={handleDialogClose}>
                        Go Back
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={useStyles.button}
                        startIcon={<DeleteIcon />}
                        onClick={this.handleSubmit}>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
                <Grid container flexGrow='1' spacing='3'>
                    <Grid item xs='12'>
                        {/*<Grid container justify='center' spacing='3' justify="flex-start" alignItems="flex-start">
                        {this.state.products.map(function (object, index){
                            return(
                                <Grid item key={index} xs={11} sm={3}>
                                    <Card>
                                        <CardActionArea onClick={() => handleDialogOpen(object._id)}>
                                            <CardMedia src={object.image} component='img' title={object.name} height='230vh' /> 
                                            <CardHeader title={object.name} subheader={object.category} />
                                            <CardContent>
                                                <Typography variant='h6' noWrap >
                                                    {object.price}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>*/}
                    <div className={useStyles.demo}>
                        <List>
                        {this.state.products.map(function (object, index){
                            return(
                                <div>
                                <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>
                                    <FastfoodIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={object.name}
                                    secondary={object.category}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDialogOpen(object._id)}>
                                    <DeleteIcon style={{color:'#dc143c'}}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                </div>
                            )})}
                        </List>
                    </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}