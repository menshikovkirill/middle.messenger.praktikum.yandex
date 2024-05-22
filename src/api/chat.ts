import {
    CreateChat,
    ChatId,
    UserDTO,
    NewUsers,
    Token,
    ChatDTO,
} from "../types";
import { HTTPTransport } from "../utils/fetch";

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat) {
        return chatApi.post('', { data });
    }

    async chatsList() : Promise<Array<ChatDTO>> {
        return chatApi.get('');
    }

    async remove(data: ChatId) {
        return chatApi.delete('', { data });
    }

    async users(id: ChatId) : Promise<Array<UserDTO>> {
        return chatApi.get(`/${id.chatId}/users`);
    }

    async addUsers(data: NewUsers): Promise<UserDTO> {
        return chatApi.put(`/users`, { data });
    }

    async removerUsers(data: NewUsers): Promise<UserDTO> {
        return chatApi.delete(`/users`, { data });
    }

    async token(data: ChatId): Promise<Token> {
        return chatApi.post(`/token/${data.chatId}`, { data });
    }

    async avatar(data: FormData): Promise<ChatDTO> {
        return chatApi.put('/avatar', { data, asFile: true });
    }
}
