import { PageError } from "../../components";
import Block from "../../core/Block";

export default class ServerError extends Block {
    constructor(props) {
        super({
            ...props,
            PageError: new PageError({
                code: '500',
                description: 'Мы уже фиксим',
            }),
        });
    }

    render() {
        return `<div>{{{ PageError }}}</div>`;
    }
}
