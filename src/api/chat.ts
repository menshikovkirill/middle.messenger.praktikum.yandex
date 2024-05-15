import {
    CreateChat,
} from "../types";
import { HTTPTransport } from "../utils/fetch";

const authApi = new HTTPTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat) {
        return authApi.post('', { data });
    }

    async chatsList() {
        return authApi.get('');
    }
}
