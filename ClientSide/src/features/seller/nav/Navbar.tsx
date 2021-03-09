import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Container, Menu, Segment, Button, Grid, Label } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { ProductCard } from '../product/ProductCard'
import ProductList from '../product/ProductList'

const Navbar = () => {

    const rootStore = useContext(RootStoreContext);
    const { logout } = rootStore.userStore;

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
                    <Menu.Item><Label content='Seller' style={{ marginRight: '1em' }} /> Welcome, Phillip Rose</Menu.Item>
                    <Menu.Item
                        name='logout'
                        onClick={logout}
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

export default observer(Navbar);