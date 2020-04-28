import React from 'react';
import axios from 'axios';
import {Card, CardHeader, CardMedia, CardContent, Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core';

const classes = makeStyles((theme) =>({
    root:{
        maxWidth: 345
    }
}));

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
                    <Grid container justify='center' spacing='3'>
                    {this.state.products.map(function (object, index){
                        return(
                            <Grid item key={index}>
                                <Card className={classes.root}>
                                    <CardMedia src={object.image} component='img' title={object.name} height={240} />
                                    <CardHeader title={object.name} subheader={object.category} />
                                    <CardContent>

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