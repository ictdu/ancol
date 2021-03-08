import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

export const ProductCard = () => {
    return (
        <Card>
            <Image src='https://i.stack.imgur.com/y9DpT.jpg' wrapped ui={false} />
            <Card.Content>
                <Card.Header>Gtx 1050 ti</Card.Header>
                <Card.Meta>
                    Stocks: 120
                </Card.Meta>
                <Card.Description>
                    This is a video graphics card for computer.
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Button size="mini" content="View" icon='eye' />
                </a>
            </Card.Content>
        </Card>
    )
}
