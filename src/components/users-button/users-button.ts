import Block from "../../core/Block";

export default class UsersButton extends Block {
    render() {
        return `
            <button class="users-button {{#if asText}}user-button-as-text{{/if}}">{{text}}</button>
        `;
    }
}
