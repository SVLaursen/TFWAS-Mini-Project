import React from 'react';
import axios from 'axios';
import {Card, CardHeader, CardMedia, CardContent, Grid, Typography} from '@material-ui/core';

export default class ProductList extends React.Component{
    state = {
        products: []
    }

    componentDidMount(){
        axios.get('http://localhost:3600/api/products')
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }

    render(){
        return(
            <Grid container flexGrow='1' spacing='3'>
                <Grid item xs='12'>
                    <Grid container justify='center' spacing='3' justify="flex-start" alignItems="flex-start">
                    {this.state.products.map(function (object, index){
                        return(
                            <Grid item key={index} xs={11} sm={3}>
                                <Card >
                                    <CardMedia src={object.image} component='img' title={object.name} height='230vh' /> 
                                    <CardHeader title={object.name} subheader={object.category} />
                                    <CardContent>
                                        <Typography variant='h6' noWrap >
                                            {object.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}