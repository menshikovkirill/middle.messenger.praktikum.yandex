import Block from "../../core/Block";

export default class ChatMessage extends Block {
    render() {
        return `
            <div class="chat-messages">
                {{#each data}}
                    {{#with this}}
                        <div class="{{#if my}} my{{/if}} chat-message">{{message}}</div>
                    {{/with}}
                {{/each}}
            </div>
        `;
    }
}
