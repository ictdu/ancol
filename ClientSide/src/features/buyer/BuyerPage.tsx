import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Container } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { BuyerNavbar } from './BuyerNavbar'
import CheckoutPage from './CheckoutPage'
import ProductListings from './ProductListings'

const BuyerPage = () => {

    const rootStore = useContext(RootStoreContext);
    const { product } = rootStore.productStore;

    return (

        <Container style={{ paddingTop: '1em' }}>
            <BuyerNavbar />
            {!product ?
                <ProductListings /> :
                <CheckoutPage />}
        </Container>
    )
}

export default observer(BuyerPage);
