import ChatApi from "../api/chat";
import { CreateChat, ChatId, ChatDTO } from "../types";

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

export const removeChat = async (model: ChatId) => {
    window.store.set({ isLoading: true });

    try {
        await chatApi.remove(model);
        const chatsList = await chatApi.chatsList();
        window.store.set({ chatsList });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const setActiveChat = async (model: ChatDTO, id: ChatId) => {
    window.store.set({ isLoading: true });

    try {
        const users = await chatApi.users(id);
        const usersTitle = users.map((user) => user.login).join('');

        window.store.set({ activeChat: model, usersTitle: `${model.title} - ${usersTitle}` });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};
