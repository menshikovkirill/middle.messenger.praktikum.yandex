import Block from "../../core/Block";

import defaultImg from "../../assets/empty-img.svg";

export default class Message extends Block {
    render() {
        return `
            <div class="message {{#if active}}active{{/if}}">
                <img src="{{#if avatar}}
                    https://ya-praktikum.tech/api/v2/resources/{{avatar}}
                    {{else}}${defaultImg}{{/if}}" class="{{active}}" />
                <div>
                    <p class="name">{{name}}</p>
                    <p class="text">{{message}}</p>
                </div>
            </div>

        `;
    }
}
