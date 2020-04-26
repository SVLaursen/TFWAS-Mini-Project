import React from 'react';
import axios from 'axios';

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
            <div className='ProductList'>
                <ul>
                    {this.state.products.map(products => <li>{products.name}</li>)}
                </ul>
            </div>
        )
    }
}