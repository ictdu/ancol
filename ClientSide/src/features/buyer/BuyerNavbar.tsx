import React, { useContext } from 'react'
import { Menu, Label } from 'semantic-ui-react';
import { Buyer } from '../../models/user';
import { RootStoreContext } from '../../stores/rootStore';

export const BuyerNavbar = () => {

    const rootStore = useContext(RootStoreContext);
    const { logout, user } = rootStore.userStore;

    const buyer = user!.user as Buyer;

    return (
        <Menu stackable color='orange'>
            <Menu.Item
                name='Buy'
                active={true}
            />
            <Menu.Item
                name='Auction'
            />
            <Menu.Menu position='right'>
                <Menu.Item><Label content='Buyer' style={{ marginRight: '1em' }} />
            Welcome, {`${buyer.firstname} ${buyer.lastname}`}
                </Menu.Item>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    )
}
