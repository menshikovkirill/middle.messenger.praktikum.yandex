import Block from "../../core/Block";

type Props = {
    title: string;
}
export default class UsersList extends Block<Props> {
    render() {
        return `
            <div class="users-list">{{title}}</div>
        `;
    }
}
