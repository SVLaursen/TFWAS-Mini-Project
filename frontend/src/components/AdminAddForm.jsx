import React from 'react';
import axios from 'axios';
import {FormControl, TextField, makeStyles, Button} from '@material-ui/core';
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
            image: ''
        }
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
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({name: '', price: '', category:'', image:''});
    }

    render(){

        return(
            <div className={useStyles.root}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="name"
                        type='string'
                        label="Name"
                        variant="outlined"
                        color="secondary"
                        onChange={this.onNameChange}
                        value={this.state.name}
                    />
                    <TextField
                        name="price"
                        type='string'
                        label="Price"
                        variant="outlined"
                        color="secondary"
                        onChange={this.onPriceChange}
                        value={this.state.price}
                    />
                    <TextField
                        name="category"
                        type='string'
                        label="Category"
                        variant="outlined"
                        color="secondary"
                        onChange={this.onCategoryChange}
                        value={this.state.category}
                    />
                    <TextField
                        name="image"
                        type='string'
                        label="Image URL"
                        variant="outlined"
                        color="secondary"
                        onChange={this.onImageChange}
                        value={this.state.image}
                    />
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