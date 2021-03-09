import React, { Fragment, useContext, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { ProductPage } from './features/seller/product/ProductPage';
import { RootStoreContext } from './stores/rootStore';
import { Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        <ProductPage />
      }
    </Fragment>
  );
}

export default observer(App);
