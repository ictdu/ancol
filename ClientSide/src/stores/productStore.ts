import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../shared/http/agent";
import { RootStore } from "./rootStore";

export class ProductStore {

    rootStore: RootStore;

    @observable productRegistry: Map<string, Product> = new Map();
    @observable loading = false;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @computed get productsList() {
        return Array.from(this.productRegistry.values());
    }

    @action getProducts = async () => {
        this.loading = true;
        try {
            const result = await agent.Products.list();
            runInAction(() => {
                result.forEach(item => {
                    this.productRegistry.set(item.id, item);
                })
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    };

}