import React from 'react'
import { Card, Button, Image, Label } from 'semantic-ui-react'
import { Product } from '../../../models/product'
import { formatToLocalPH } from '../../../shared/utils/util'

interface IProps {
    product: Product;
    onEditClicked?: (product: Product) => void;
}

export const ProductCard: React.FC<IProps> = ({ product, onEditClicked }) => {
    return (
        <Card fluid>
            <Image src='https://i.stack.imgur.com/y9DpT.jpg' wrapped ui={false} />
            <Card.Content>
                <Label as='a' color='orange' ribbon>
                    {formatToLocalPH(product.price)}
                </Label>
                <Card.Header style={{ marginTop: '1em' }}>{product.name}</Card.Header>
                <Card.Meta>
                    stocks: {product.stocks}
                </Card.Meta>
                <Card.Description>
                    {product.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button size="mini" content="Edit" icon='pencil' onClick={() => {
                    if (onEditClicked) onEditClicked(product);
                }} />
            </Card.Content>
        </Card>
    )
}
