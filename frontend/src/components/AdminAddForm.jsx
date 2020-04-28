import React from 'reac';
import axios from 'axios';

export default class AdminAddForm extends React.Component{
    state = {
        name: '',
        price: '',
        category: '',
        image: ''
    }

    handleChange = event => {
        this.setState({name: event.target.value});
        this.setState({price: event.target.value});
        this.setState({category: event.target.value});
        this.setState({image: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const product = {
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
            image: this.state.image
        };

        axios.post('', {product})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render(){

    }
}