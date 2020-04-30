import React from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, Button } from '@material-ui/core';
import { Grid, Card, CardActionArea, CardMedia, CardHeader, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Container, TextField } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class AdminUpdateList extends React.Component{
    state = {
        loadedProduct: {},
        id: '',
        name: '',
        price: '',
        category: '',
        image: '',
        dialog: false,
        products: []
    }

    componentDidMount(){
        axios.get('http://localhost:3600/api/products')
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }

    onNameChange = event =>{
        this.setState({name: event.target.value});
    }

    onPriceChange = event =>{
        this.setState({price: event.target.value});
    }

    onCategoryChange = event =>{
        this.setState({category: event.target.value});
    }

    onImageChange = event =>{
        this.setState({image: event.target.value});
    }

    handleSubmit = event =>{
        event.preventDefault();

        const loadedProduct = this.state.loadedProduct;
        const data = {
            name: this.state.name === '' ? loadedProduct.name : this.state.name,
            price: this.state.price === '' ? loadedProduct.price : this.state.price,
            category: this.state.category === '' ? loadedProduct.category : this.state.category,
            image: this.state.image === '' ? loadedProduct.image : this.state.image
        };

        const id = this.state.id;

        axios.put('http://localhost:3600/api/products/' + id, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err =>{
                console.log(err);
            });
        
        this.setState({dialog:false});
        window.location.reload(false);
    }

    render(){
        const handleDialogOpen = (objId) =>{
            console.log(objId);
            
            const products = this.state.products;
            const length = products.length;

            for(var i = 0; i < length; i++){
                if(products[i]._id === objId)
                    this.setState({loadedProduct: products[i]});
            }

            this.setState({dialog: true})
            this.setState({id: objId});
        }

        const handleDialogClose = () =>{
            this.setState({dialog:false});
        }

        return(
            <div>
                <Dialog
                    open={this.state.dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <form onSubmit={this.handleSubmit}>
                    <DialogTitle id="alert-dialog-slide-title">{"Update Item"}</DialogTitle>
                    <DialogContent>
                        <Container maxWidth='lg'>
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
                                        style={{width:'20rem'}}
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
                                        style={{width:'20rem'}}
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
                                        style={{width:'20rem'}}
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
                                        style={{width:'20rem'}}
                                    />
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        onClick={handleDialogClose} 
                        variant="contained" 
                        color="default" 
                        className={useStyles.button} 
                        startIcon={<ArrowBackIosIcon />}>
                        Return
                    </Button>
                    <Button 
                        type='submit'
                        variant="contained"
                        style={{backgroundColor: "#FFA500" }}
                        lassName={useStyles.button} 
                        startIcon={<UpdateIcon />}>
                        Submit
                    </Button>
                    </DialogActions>
                    </form>
                </Dialog>
                <Grid container flexGrow='1' spacing='3'>
                    <Grid item xs='12'>
                        <Grid container justify="flex-start" spacing='3' alignItems="flex-start">
                            {this.state.products.map(function (object, index){
                                return(
                                    <Grid item key={index} xs={3} sm={12}>
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
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}