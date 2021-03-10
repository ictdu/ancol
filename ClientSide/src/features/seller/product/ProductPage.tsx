import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import { AddProduct } from './AddProduct'
import { ControlSection } from './control/ControlSection'
import Navbar from './nav/Navbar'
import ProductList from './ProductList'

export const ProductPage = () => {

    const [page, setPage] = useState<'add' | 'edit' | 'products'>('products');

    return (

        <Container style={{ paddingTop: '1em' }}>

            <Navbar />

            <ControlSection setPage={setPage} page={page} />

            {page === 'products' &&
                <ProductList />
            }

            {page === 'add' &&
                <AddProduct />
            }

        </Container>
    )
}
