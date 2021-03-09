import { action, makeObservable, observable, runInAction } from "mobx";
import { history } from "..";
import { User } from "../models/user";
import agent from "../shared/http/agent";
import { RootStore } from "./rootStore";

export class UserStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @observable user: User | null = null;

    @observable loading = false;

    @action login = async (email: string, password: string) => {
        this.loading = true;

        try {
            const result = await agent.Users.login(email, password);
            runInAction(() => {
                this.user = result;
            });
            window.localStorage.setItem("jwt_ancol", result.user.token);
            history.push('/');
        } catch (error) {
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}