import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Item, Loader } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { ProductCardListing } from './ProductCardListing'

const ProductListings = () => {

    const rootStore = useContext(RootStoreContext);
    const { getAllProducts, loading, productsList } = rootStore.productStore;

    useEffect(() => {
        if (productsList.length === 0) getAllProducts();
    }, [productsList.length, getAllProducts])

    if (loading) return <Loader active inline />

    return (
        <Item.Group divided style={{ paddingBottom: '3em' }}>
            {productsList.map(prod =>
                <ProductCardListing product={prod} />
            )}
        </Item.Group>
    )
}

export default observer(ProductListings);


