import ChatApi from "../api/chat";
import UserApi from "../api/user";
import {
    CreateChat,
    ChatId,
    ChatDTO,
    Login,
    UserDTO,
} from "../types";
import { formateUsersList, formateUsersTitle } from "../utils/common";

const chatApi = new ChatApi();
const userApi = new UserApi();

const SOCKET_URL = `wss://ya-praktikum.tech/ws/chats/`;

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
        await getChatsList();
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
        window.store.set({ chatsList, activeChat: null });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const setActiveChat = async (model: ChatDTO, id: ChatId, userData: UserDTO, socket?: WebSocket) => {
    window.store.set({ isLoading: true });

    try {
        if (socket) {
            socket.close();
        }

        const users = await chatApi.users(id);
        const token = await chatApi.token(id);
        const usersTitle = formateUsersTitle(users);

        const socketEvent = new WebSocket(`${SOCKET_URL}${userData.id}/${id.chatId}/${token.token}`);
        socketEvent.addEventListener('open', () => {
            socketEvent.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        });
        const usersList = formateUsersList(users);

        window.store.set({
            activeChat: model,
            usersTitle,
            token: token.token,
            socket: socketEvent,
            usersList,
        });
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const addNewUser = async (login: Login, chatId: number) => {
    window.store.set({ isLoading: true });

    try {
        const users = await userApi.search(login);
        const usersList = await chatApi.users({ chatId: String(chatId) });
        const usersTitle = formateUsersTitle([...usersList, users[0]]);

        const usersListToStore = formateUsersList(users);

        if (users) {
            await chatApi.addUsers({ chatId, users: [users?.[0].id] });
            window.store.set({ usersTitle, usersList: usersListToStore });
        }
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const removeUser = async (login: Login, chatId: number) => {
    window.store.set({ isLoading: true });

    try {
        const users = await userApi.search(login);

        if (users) {
            await chatApi.removerUsers({ chatId, users: [users?.[0].id] });

            const usersList = await chatApi.users({ chatId: String(chatId) });
            const usersTitle = formateUsersTitle([...usersList]);

            const usersListToStore = formateUsersList(users);

            window.store.set({ usersTitle, usersList: usersListToStore });
        }
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const updateAvatar = async (data: FormData) => {
    window.store.set({ isLoading: true });

    try {
        const avatar = await chatApi.avatar(data);
        const { activeChat } = window.store;
        window.store.set({
            activeChat: {
                ...activeChat,
                avatar: avatar.avatar,
            },
        });
        getChatsList();
    } catch (error) {
        window.store.set({ loginError: 'error' });
    } finally {
        window.store.set({ isLoading: false });
    }
};
