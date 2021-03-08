import React from 'react'
import { Container, Menu, Segment, Button, Grid } from 'semantic-ui-react'
import { ProductCard } from '../product/ProductCard'
import { ProductList } from '../product/ProductList'

export const Navbar = () => {
    return (
        <Container style={{ paddingTop: '1em' }}>
            <Menu pointing secondary>
                <Menu.Item
                    name='Products'
                    active={true}
                />
                <Menu.Item
                    name='Auction'
                />
                <Menu.Menu position='right'>
                    <Menu.Item>Welcome, Phillip Rose</Menu.Item>
                    <Menu.Item
                        name='logout'
                    />
                </Menu.Menu>
            </Menu>

            <Segment>
                <Button content="Add product" primary size="tiny" />
            </Segment>

            <ProductList />

        </Container>
    )
}
