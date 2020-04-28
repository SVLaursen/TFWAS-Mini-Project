import React from 'react';
import ProductList from '../components/ProductCards';
import AdminMenu from '../components/AdminMenu';
import {Container} from '@material-ui/core';


const AdminPage = () => {
    return(
        <div>
            <AdminMenu />
            <Container>
                <ProductList />
            </Container>
        </div>
    );
}

export default AdminPage;