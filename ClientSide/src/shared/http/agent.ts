import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

export const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = API_URL + '/api';
const SLEEP_DURATION = 500;

axios.interceptors.response.use(undefined, error => {

    if (error.message === "Network Error" && !error.response) {
        toast.error("Network Error occured");
        return;
    }

    const { status, config, data } = error.response;
    if (status === 404) {
        history.push("/notfound");
    }

    if (
        status === 400 &&
        config.method === "get" &&
        data.errors.hasOwnProperty("id")
    ) {
        history.push("/notfound");
        toast.error("You have sent an invalid request.");
    }
    if (status === 500) {
        toast.error("We could not process your request at the moment.");
        return;
    }
    throw error.response;

})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
    );

const requests = {
    get: (url: string) => axios.get(url).then(sleep(SLEEP_DURATION)).then(responseBody),
    post: (url: string, body: {}) =>
        axios.post(url, body).then(sleep(SLEEP_DURATION)).then(responseBody),
    put: (url: string, body: {}) =>
        axios.put(url, body).then(sleep(SLEEP_DURATION)).then(responseBody),
    delete: (url: string) =>
        axios.delete(url).then(sleep(SLEEP_DURATION)).then(responseBody),
};

const User = {
    login: (email: string, password: string): Promise<void> =>
        requests.post('/user/login', { email, password }),
};

const agent = {
    User
};

export default agent;