export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type ProfileResponse = UserDTO & SignUpResponse;

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
    password: string
}

export type UserProfile = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export type UserPassword = {
    oldPassword: string;
    newPassword: string;
}

export type CreateChat = {
    title: string
}

export type LoginRequestData = {
    login: string,
    password: string
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatId = {
    chatId: string;
}

export type Login = {
    login: string;
}

export type NewUsers = {
    users: Array<number>,
    chatId: number;
}

export type Token = {
    token: string;
}

export type SocketsById = {
    [key: number] : WebSocket;
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
}

export type WebSocketData = {
    content: "string";
    id: number;
    time: string;
    type: string;
    user_id: string;
}

export type UsersList = {
    [key: number]: string;
}

export type StoreType = {
    isLoading?: boolean,
    loginError?: boolean | null,
    userData?: UserDTO | null;
    chatsList?: Array<ChatDTO>;
    activeChat: ChatDTO;
    usersTitle: string;
    token: string;
    socket: WebSocket;
    usersList: UsersList;
};
