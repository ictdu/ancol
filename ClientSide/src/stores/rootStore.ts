import { configure } from "mobx";
import { createContext } from "react";
import { ProductStore } from "./productStore";
import { UserStore } from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {

    userStore: UserStore;
    productStore: ProductStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
    }

}

export const RootStoreContext = createContext(new RootStore());