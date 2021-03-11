import React, { useContext } from 'react'
import { Menu, Label, Icon } from 'semantic-ui-react';
import { Buyer } from '../../models/user';
import { RootStoreContext } from '../../stores/rootStore';

export const BuyerNavbar = () => {

    const rootStore = useContext(RootStoreContext);
    const { logout, user } = rootStore.userStore;

    const buyer = user!.user as Buyer;

    return (
        <Menu stackable secondary inverted color='orange'>

            <Menu.Item header>
                <Icon name='industry' />Ancol</Menu.Item>
            <Menu.Item
                name='Buy'
                active={true}
            />
            <Menu.Item
                name='Auction'
            />
            <Menu.Menu position='right'>
                <Menu.Item><Label content='Buyer' style={{ marginRight: '1em' }} />
                    <Icon name='user circle' />
            Welcome, {`${buyer.firstname} ${buyer.lastname}`}
                </Menu.Item>
                <Menu.Item
                    name='logout'
                    icon='sign-out'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    )
}
