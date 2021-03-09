import React, { Fragment, useContext, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { SellerPage } from './features/seller/SellerPage';
import { RootStoreContext } from './stores/rootStore';
import { Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

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
        <SellerPage />
      }
    </Fragment>
  );
}

export default observer(App);
