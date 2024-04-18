import Block from "../../core/Block";

export default class Button extends Block {
    constructor(props) {
        // const inputComponents = props.inputs.reduce((acc, data) => {
        //     const component = new Input({});
        //     acc[component._id] = component;
        //     return acc;
        // }, {});

        super({
            ...props,
        });
    }

    render() {
        return `
            <button class="button {{type}}" {{#if asLink}} type="button" {{/if}}>
                {{label}}
            </button>
        `;
    }
}
