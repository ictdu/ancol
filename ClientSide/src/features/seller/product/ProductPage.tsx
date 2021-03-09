import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Container, Menu, Label } from 'semantic-ui-react'
import { ControlSection } from './control/ControlSection'
import Navbar from './nav/Navbar'
import ProductList from './ProductList'

export const ProductPage = () => {

    const [page, setPage] = useState<'add' | 'edit' | 'products'>('products');

    return (

        <Container style={{ paddingTop: '1em' }}>

            <Navbar />

            <ControlSection />

            <ProductList />

        </Container>
    )
}
