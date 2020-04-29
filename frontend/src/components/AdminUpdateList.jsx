import React from 'react';
import axios from 'axios';

export default class AdminUpdateList extends React.Component{
    state = {
        id: '',
        name: '',
        price: '',
        category: '',
        image: ''
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
        this.setState({price: event.target.value});
    }

    onImageChange = event =>{
        this.setState({image: event.target.value});
    }

    handleSubmit = event =>{
        event.preventDefault();

        const data = {
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
            image: this.state.image
        };

        const id = this.state.id;

        axios.post('http://localhost:3600/api/product/' + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err =>{
                console.log(err);
            });
    }

    render(){

        return(
            <div>

            </div>
        )
    }
}