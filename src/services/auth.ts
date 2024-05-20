import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData } from "../types";

const authApi = new AuthApi();

export const createUser = async (model: CreateUser) => {
    window.store.set({ isLoading: true });

    try {
        await authApi.create(model);
        window.router.go('/messenger');
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const login = async (model: LoginRequestData) => {
    window.store.set({ isLoading: true });

    try {
        await authApi.login(model);
        window.router.go('/messenger');
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const getUserData = async () => {
    window.store.set({ userData: {} });
    window.store.set({ isLoading: true });

    try {
        const userData = await authApi.me();
        if (userData) {
            window.store.set({ userData });
        }
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const logOut = async () => {
    window.store.set({ isLoading: true });
    window.store.set({ userData: {} });

    try {
        await authApi.logout();
        window.router.go('/sign-up');
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const checkAuthForChat = async () => {
    try {
        const userData = await authApi.me();
        if ('reason' in userData) {
            window.router.go('/sign-up');
        } else {
            window.store.set({ userData });
        }
    } catch (error) {
        window.store.set({ loginError: 'error' });
    }
};

export const checkAuthForLogin = async () => {
    try {
        const userData = await authApi.me();
        if (!('reason' in userData)) {
            window.router.go('/messenger');
        }
    } catch (error) {
        window.store.set({ loginError: 'error' });
    }
};
