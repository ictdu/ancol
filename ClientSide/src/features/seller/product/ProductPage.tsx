import React, { useContext, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Product } from '../../../models/product'
import { RootStoreContext } from '../../../stores/rootStore'
import AddProduct from './AddProduct'
import { ControlSection } from './control/ControlSection'
import EditProduct from './EditProduct'
import Navbar from './nav/Navbar'
import ProductList from './ProductList'

export const ProductPage = () => {

    const rootStore = useContext(RootStoreContext);
    const { product, setProduct } = rootStore.productStore;

    const [page, setPage] = useState<'add' | 'edit' | 'products'>('products');

    return (

        <Container style={{ paddingTop: '1em' }}>

            <Navbar />

            <ControlSection setPage={setPage} page={page} />

            {
                page === 'products' &&
                <ProductList onSelectProductEdit={prod => {
                    setProduct(prod);
                    setPage('edit');
                }} />
            }

            {
                page === 'add' &&
                <AddProduct onAdded={() => setPage('products')} />
            }

            {
                page === 'edit' &&
                <EditProduct product={product!} onEdit={() => setPage('products')} />
            }

        </Container>
    )
}
