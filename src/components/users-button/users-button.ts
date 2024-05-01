import Block from "../../core/Block";

export default class UsersButton extends Block {
    render() {
        return `
            <button class="users-button">{{text}}</button>
        `;
    }
}
