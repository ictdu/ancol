import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Product, ProductFormValues } from "../models/product";
import agent from "../shared/http/agent";
import { RootStore } from "./rootStore";

export class ProductStore {

    rootStore: RootStore;

    @observable productRegistry: Map<string, Product> = new Map();
    @observable loading = false;

    @observable product: Product | null = null;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @computed get productsList() {
        return Array.from(this.productRegistry.values()).sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }

    @action setProduct = (prod: Product | null) => {
        this.product = prod;
    }

    @action getProducts = async () => {
        this.loading = true;
        try {
            const result = await agent.Products.list();
            runInAction(() => {
                result.forEach(item => {
                    item.createdAt = new Date(item.createdAt);
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

    @action getAllProducts = async () => {
        this.loading = true;
        try {
            const result = await agent.Products.listAll();
            runInAction(() => {
                result.forEach(item => {
                    item.createdAt = new Date(item.createdAt);
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

    @action addProduct = async (formValues: ProductFormValues) => {
        this.loading = true;
        try {
            await agent.Products.add(formValues);
            const newProduct: Product = {
                ...formValues,
                imagePath: '',
                id: formValues.id!,
                createdAt: new Date()
            };
            runInAction(() => {
                this.productRegistry.set(newProduct.id, newProduct);
            });
        } catch (error) {
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    @action editProduct = async (formValues: ProductFormValues) => {
        this.loading = true;
        try {
            await agent.Products.edit(formValues);
            let product = this.productRegistry.get(formValues.id!)!;
            runInAction(() => {
                product = { ...product, ...formValues };
                this.productRegistry.set(formValues.id!, product);
            })
        } catch (error) {
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}