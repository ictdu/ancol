import React from 'react'
import { Container } from 'semantic-ui-react'
import { BuyerNavbar } from './BuyerNavbar'
import ProductListings from './ProductListings'

export const BuyerPage = () => {
    return (

        <Container style={{ paddingTop: '1em' }}>
            <BuyerNavbar />
            <ProductListings />
        </Container>
    )
}
