import Block from "../../core/Block";

export default class Input extends Block {
    constructor(props) {
        super(props);
    }

    render() {
        return `
            <div class="input {{style}}">
                {{#if errorMessage}}
                    <div class="error">{{errorMessage}}</div>
                {{/if}}
                <input
                    tabindex=0
                    value="{{value}}"
                    type="{{type}}"
                    name="{{name}}"
                    id="{{name}}"
                    placeholder="{{placeholder}}"
                    autocomplete="off"
                    {{#if isDisabled}}disabled="true"{{/if}}
                >
                <label class="description" for="{{name}}">{{label}}
            </div>
        `;
    }
}
