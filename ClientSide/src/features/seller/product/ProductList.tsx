import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { ProductCard } from './ProductCard'

const ProductList = () => {

    const rootStore = useContext(RootStoreContext);
    const { loading, productsList, getProducts } = rootStore.productStore;

    useEffect(() => {
        getProducts();
    }, [getProducts])

    if (loading) return <Loader active inline='centered' />

    return (
        <Grid>
            {productsList.map(item => {
                return (
                    <Grid.Column computer='4' mobile='8'>
                        <ProductCard product={item} key={item.id} />
                    </Grid.Column>
                )
            })}
        </Grid>
    )
}

export default observer(ProductList);