import { PageError } from "../../components";
import Block from "../../core/Block";

export default class NotFound extends Block {
    constructor(props) {
        super({
            ...props,
            PageError: new PageError({
                code: '404',
                description: 'Не туда попали',
            }),
        });
    }

    render() {
        return `<div>{{{ PageError }}}</div>`;
    }
}
