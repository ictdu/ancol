import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../shared/http/agent";
import { RootStore } from "./rootStore";

export class BuyerStore {

    rootStore: RootStore;

    @observable loading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action buy = async (productId: string, qty: number) => {
        this.loading = true;
        try {
            const result = await agent.Buyers.buy(productId, qty);
            return result;
        } catch (error) {
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}