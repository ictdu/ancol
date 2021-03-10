import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { ProductCard } from './ProductCard'

const ProductList = () => {

    const rootStore = useContext(RootStoreContext);
    const { loading, productsList, getProducts } = rootStore.productStore;

    useEffect(() => {
        if (productsList.length === 0)
            getProducts();
    }, [getProducts, productsList.length])

    if (loading) return <Loader active inline='centered' />

    return (
        <Grid>
            {productsList.map(item => {
                return (
                    <Grid.Column computer='4' mobile='16' key={item.id} >
                        <ProductCard product={item} />
                    </Grid.Column>
                )
            })}
        </Grid>
    )
}

export default observer(ProductList);