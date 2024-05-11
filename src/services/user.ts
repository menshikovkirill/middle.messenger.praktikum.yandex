import UserApi from "../api/user";
import { UserPassword, UserProfile } from "../types";

const userApi = new UserApi();

export const updateAvatars = async (model: FormData) => {
    window.store.set({ isLoading: true });

    try {
        const user = await userApi.avatar(model);
        window.store.set({ userData: user });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const updateUserData = async (model: UserProfile) => {
    window.store.set({ isLoading: true });

    try {
        const user = await userApi.profile(model);
        window.store.set({ userData: user });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const updateUserPassword = async (model: UserPassword) => {
    window.store.set({ isLoading: true });

    try {
        await userApi.password(model);
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};
