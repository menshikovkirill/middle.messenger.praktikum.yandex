import { UserDTO, UsersList } from "../types";

export const formateUsersTitle = (users: Array<UserDTO>) => users.map((user) => user.display_name
    || user.login).join(',');

export const formateUsersList = (users: Array<UserDTO>) => users.reduce((acc: UsersList, item) => {
        acc[item.id] = `${item.display_name || item.login}`;
        return acc;
    }, {});
