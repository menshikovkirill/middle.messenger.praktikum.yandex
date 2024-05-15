import ChatApi from "../api/chat";
import { CreateChat } from "../types";

const chatApi = new ChatApi();

export const getChatsList = async () => {
    window.store.set({ isLoading: true });

    try {
        const chatsList = await chatApi.chatsList();
        window.store.set({ chatsList });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const createChat = async (model: CreateChat) => {
    window.store.set({ isLoading: true });

    try {
        await chatApi.create(model);
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const removeChat = async (model: CreateChat) => {
    window.store.set({ isLoading: true });

    try {
        await chatApi.create(model);
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};
