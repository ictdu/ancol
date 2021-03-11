import React, { Fragment, useContext, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { ProductPage } from './features/seller/product/ProductPage';
import { RootStoreContext } from './stores/rootStore';
import { Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import 'react-toastify/dist/ReactToastify.css';
import { BuyerPage } from './features/buyer/BuyerPage';


const App = () => {

  const rootStore = useContext(RootStoreContext);
  const { loadingCurrentUser, getCurrentUser, user } = rootStore.userStore;

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  return (
    <Fragment>
      {loadingCurrentUser ?
        <Loader content='Loading...' active />
        :
        <Fragment>
          {user?.type === 'seller' &&
            <ProductPage />}
          {user?.type === 'buyer' &&
            <BuyerPage />}
        </Fragment>
      }
    </Fragment>
  );
}

export default observer(App);
