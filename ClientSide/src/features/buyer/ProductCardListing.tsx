import React, { useContext } from 'react'
import { Button, Icon, Item, Label } from 'semantic-ui-react'
import { Product } from '../../models/product'
import { formatToLocalPH } from '../../shared/utils/util'
import { RootStoreContext } from '../../stores/rootStore'

export const ProductCardListing: React.FC<{
    product: Product
}> = ({ product }) => {

    const rootStore = useContext(RootStoreContext);
    const { setProduct } = rootStore.productStore;

    return (
        <Item>
            <Item.Image size='medium' src='https://i.stack.imgur.com/y9DpT.jpg' />
            <Item.Content>
                <Item.Header as='a'>{product.name}</Item.Header>
                <Item.Meta>{product.sellerName}

                </Item.Meta>
                <Item.Description>
                    <Label as='a' color='teal' tag>
                        {formatToLocalPH(product.price)}
                    </Label>
                </Item.Description>
                <Item.Description>
                    {product.description}
                </Item.Description>
                <Item.Extra>
                    <Label>
                        Stocks
                    <Label.Detail>{product.stocks}</Label.Detail>
                    </Label>
                    <br />
                </Item.Extra>
                <Button primary floated='right' size='tiny' content='Buy Item' onClick={() => {
                    setProduct(product);
                }}>
                </Button>
            </Item.Content>
        </Item>
    )
}
