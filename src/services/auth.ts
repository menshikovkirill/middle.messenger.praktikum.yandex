import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData } from "../types";

const authApi = new AuthApi();

export const createUser = async (model: CreateUser) => {
    window.store.set({ isLoading: true });

    try {
        await authApi.create(model);
        window.router.go('/chat');
    } catch (error) {
        window.store.set({ loginError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const login = async (model: LoginRequestData) => {
    window.store.set({ isLoading: true });

    try {
        await authApi.login(model);
        window.router.go('/chat');
    } catch (error) {
        window.store.set({ loginError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};
