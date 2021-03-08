import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ProductCard } from './ProductCard'

export const ProductList = () => {
    return (
        <Grid>
            <Grid.Column computer='4' mobile='8'>
                <ProductCard />
            </Grid.Column>
            <Grid.Column computer='4' mobile='8'>
                <ProductCard />
            </Grid.Column>
            <Grid.Column computer='4' mobile='8'>
                <ProductCard />
            </Grid.Column>
            <Grid.Column computer='4' mobile='8'>
                <ProductCard />
            </Grid.Column>
            <Grid.Column computer='4' mobile='8'>
                <ProductCard />
            </Grid.Column>
            <Grid.Column computer='4' mobile='8'>
                <ProductCard />
            </Grid.Column>
        </Grid>
    )
}
