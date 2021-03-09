import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Container, Menu, Label } from 'semantic-ui-react'
import { Seller } from '../../../models/user'
import { RootStoreContext } from '../../../stores/rootStore'
import { ControlSection } from '../control/ControlSection'
import ProductList from '../product/ProductList'

const Navbar = () => {

    const rootStore = useContext(RootStoreContext);
    const { logout, user } = rootStore.userStore;

    const seller = user!.user as Seller;

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
                    <Menu.Item><Label content='Seller' style={{ marginRight: '1em' }} />
                        Welcome, {`${seller.firstname} ${seller.lastname}`}
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        onClick={logout}
                    />
                </Menu.Menu>
            </Menu>

            <ControlSection />

            <ProductList />

        </Container>
    )
}

export default observer(Navbar);