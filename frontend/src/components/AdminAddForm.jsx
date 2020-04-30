import React from 'react';
import axios from 'axios';
import {TextField, makeStyles, Button, Snackbar, Grid} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
        margin: theme.spacing(1),
      }
  }));

const Alert = (props) =>{
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class AdminAddForm extends React.Component{

    constructor(props){
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            price: '',
            category: '',
            image: '',
            snackOpen: false,
            snackReason: '',
            snackMessage: ''
        }
    }

    onSnackOpen = (sev, text) => {
        this.setState({snackOpen: true});
        this.setState({snackReason: sev});
        this.setState({snackMessage: text});
    }

    onSnackClose= (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }

        this.setState({snackOpen: false});
        this.setState({snackReason: ''});
        this.setState({snackMessage: ''});
    }

    onNameChange = event =>{
        this.setState({name: event.target.value});
    }

    onPriceChange = event => {
        this.setState({price: event.target.value});
    }

    onCategoryChange = event => {
        this.setState({category: event.target.value});
    }

    onImageChange = event => {
        this.setState({image: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
          };

        const data = {
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
            image: this.state.image
        };

        axios.post('http://localhost:3600/api/product', JSON.stringify(data), { headers: headers})
            .then((res) => {
                console.log(res);
                console.log(res.data);

                if(res.data.msg === 'Product was succesfully added.'){
                    this.onSnackOpen('success', res.data.msg);
                }else{
                    this.onSnackOpen('error', 'Validation error');
                }
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({name: '', price: '', category:'', image:''});
    }

    render(){

        return(
            <div className={useStyles.root}>
                <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.onSnackClose}>
                    <Alert onClose={this.handleClose} severity={this.state.snackReason}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar>
                <form onSubmit={this.handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <div style={{paddingBottom:'1rem'}}>
                            <TextField
                            name="name"
                            type='string'
                            label="Name"
                            variant="outlined"
                            color="secondary"
                            onChange={this.onNameChange}
                            value={this.state.name}
                        />
                        </div>
                        <div style={{paddingBottom:'1rem'}}>
                            <TextField
                            name="price"
                            type='string'
                            label="Price"
                            variant="outlined"
                            color="secondary"
                            onChange={this.onPriceChange}
                            value={this.state.price}
                        />
                        </div>
                        <div style={{paddingBottom:'1rem'}}>
                            <TextField
                            name="category"
                            type='string'
                            label="Category"
                            variant="outlined"
                            color="secondary"
                            onChange={this.onCategoryChange}
                            value={this.state.category}
                        />
                        </div>
                        <div style={{paddingBottom:'1rem'}}>
                            <TextField
                            name="image"
                            type='string'
                            label="Image URL"
                            variant="outlined"
                            color="secondary"
                            onChange={this.onImageChange}
                            value={this.state.image}
                        />
                        </div>
                    </Grid>
                </Grid>
                    <Button
                        type='submit'
                        variant="contained"
                        color="default"
                        className={useStyles.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        Add Product
                    </Button>
                </form>
            </div>
        )
    }
}