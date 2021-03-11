import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Product, ProductFormValues } from "../../models/product";
import { User } from "../../models/user";

export const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = API_URL + '/api';
const SLEEP_DURATION = 500;

axios.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('jwt_ancol');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    },
    (error) =>
        Promise.reject(error)
)

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

const Users = {
    login: (email: string, password: string): Promise<User> =>
        requests.post('/users/login', { email, password }),
    currentUser: (): Promise<User> =>
        requests.get('/users/current'),
};

const Products = {
    list: (): Promise<Product[]> =>
        requests.get('/products'),
    listAll: (): Promise<Product[]> =>
        requests.get('/products/all'),
    add: (formValues: ProductFormValues): Promise<void> =>
        requests.post('/products', formValues),
    edit: (formValues: ProductFormValues): Promise<void> =>
        requests.put(`/products/${formValues.id}`, formValues),
}

const agent = {
    Users, Products
};

export default agent;