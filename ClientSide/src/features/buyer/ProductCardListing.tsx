import React from 'react'
import { Button, Icon, Item, Label } from 'semantic-ui-react'
import { Product } from '../../models/product'
import { formatToLocalPH } from '../../shared/utils/util'

export const ProductCardListing: React.FC<{
    product: Product
}> = ({ product }) => {
    return (

        <Item>
            <Item.Image size='medium' src='https://i.stack.imgur.com/y9DpT.jpg' />

            <Item.Content>
                <Item.Header as='a'>{product.name}</Item.Header>
                <Item.Meta>{formatToLocalPH(product.price)}</Item.Meta>
                <Item.Description>
                    {product.description}
                </Item.Description>
                <Item.Extra>
                    <Icon name='box' /> {product.stocks}
                    <br />
                    <Label content={product.sellerName} />
                </Item.Extra>
                <Button primary floated='right' size='tiny' content='Buy Item'>
                </Button>
            </Item.Content>
        </Item>
    )
}
