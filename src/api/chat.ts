import {
    CreateChat,
    ChatId,
    UserDTO,
} from "../types";
import { HTTPTransport } from "../utils/fetch";

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat) {
        return chatApi.post('', { data });
    }

    async chatsList() {
        return chatApi.get('');
    }

    async remove(data: ChatId) {
        return chatApi.delete('', { data });
    }

    async users(id: ChatId) : Promise<Array<UserDTO>> {
        return chatApi.get(`/${id.chatId}/users`);
    }
}
