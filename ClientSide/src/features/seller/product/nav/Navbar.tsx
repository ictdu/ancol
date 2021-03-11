import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Menu, Label, Icon } from 'semantic-ui-react'
import { Seller } from '../../../../models/user'
import { RootStoreContext } from '../../../../stores/rootStore'

const Navbar = () => {

    const rootStore = useContext(RootStoreContext);
    const { logout, user } = rootStore.userStore;

    const seller = user!.user as Seller;

    return (

        <Menu stackable secondary inverted color='orange'>

            <Menu.Item header>
                <Icon name='industry' />
                Ancol</Menu.Item>
            <Menu.Item
                name='Products'
                active={true}
            />
            <Menu.Item
                name='Auction'
            />
            <Menu.Menu position='right'>
                <Menu.Item><Label content='Seller' style={{ marginRight: '1em' }} />
                    <Icon name='user circle' />
                Welcome, {`${seller.firstname} ${seller.lastname}`}
                </Menu.Item>
                <Menu.Item
                    icon='sign-out'
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    )
}

export default observer(Navbar);