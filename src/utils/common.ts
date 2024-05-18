import { UserDTO, UsersList } from "../types";

export const formateUsersTitle = (users: Array<UserDTO>) => users.map((user) => user.login).join(',');

export const formateUsersList = (users: Array<UserDTO>) => users.reduce((acc: UsersList, item) => {
        acc[item.id] = `${item.first_name} ${item.second_name}`;
        return acc;
    }, {});
