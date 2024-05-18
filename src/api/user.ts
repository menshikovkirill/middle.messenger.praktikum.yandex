import {
    Login,
    ProfileResponse,
    UserDTO,
    UserPassword,
    UserProfile,
} from "../types";
import { HTTPTransport } from "../utils/fetch";

const authApi = new HTTPTransport('/user');

export default class UserApi {
    async profile(data: UserProfile): Promise<ProfileResponse> {
        return authApi.put('/profile', { data });
    }

    async avatar(data: FormData): Promise<ProfileResponse> {
        return authApi.put('/profile/avatar', { data, asFile: true });
    }

    async password(data: UserPassword) {
        return authApi.put('/password', { data });
    }

    async search(data: Login) : Promise<Array<UserDTO>> {
        return authApi.post('/search', { data });
    }
}
