import { configure } from "mobx";
import { createContext } from "react";
import { BuyerStore } from "./buyerStore";
import { ProductStore } from "./productStore";
import { UserStore } from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {

    userStore: UserStore;
    productStore: ProductStore;
    buyerStore: BuyerStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.buyerStore = new BuyerStore(this);
    }

}

export const RootStoreContext = createContext(new RootStore());