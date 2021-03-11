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

    @observable loadingCurrentUser = true;

    @action login = async (email: string, password: string) => {
        this.loading = true;
        try {
            const result = await agent.Users.login(email, password);
            runInAction(() => {
                this.loadingCurrentUser = false;
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

    @action getCurrentUser = async () => {
        const token = window.localStorage.getItem("jwt_ancol");
        if (token) {
            try {
                const result = await agent.Users.currentUser();
                runInAction(() => {
                    this.user = result;
                })
            } catch (error) {
                window.localStorage.removeItem('jwt_ancol');
                history.push('/login');
                console.log(error);
            } finally {
                runInAction(() => {
                    this.loadingCurrentUser = false;
                })
            }
        } else {
            history.push('/login');
        }
    }

    @action logout = () => {
        this.user = null;
        window.localStorage.removeItem("jwt_ancol");
        history.push('/login');
    }

}