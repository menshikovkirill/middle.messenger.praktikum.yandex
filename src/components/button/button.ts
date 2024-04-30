import Block from "../../core/Block";

export default class Button extends Block {
    render() {
        return `
            <button class="button {{type}}" {{#if asLink}} type="button" {{/if}}>
                {{label}}
            </button>
        `;
    }
}
