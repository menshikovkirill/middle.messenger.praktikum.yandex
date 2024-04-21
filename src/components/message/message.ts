import Block from "../../core/Block";

import defaultImg from "../../assets/empty-img.svg";

export default class Message extends Block {
    render() {
        return `
            <div class="message {{#if active}}active{{/if}}">
                <img src="${defaultImg}" class="{{active}}" />
                <div>
                    <p class="name">{{name}}</p>
                    <p class="text">{{message}}</p>
                </div>
            </div>

        `;
    }
}
