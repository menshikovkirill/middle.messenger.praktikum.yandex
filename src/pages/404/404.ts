import { PageError } from "../../components";
import Block from "../../core/Block";

interface Props {
    PageError: PageError
}

export default class NotFound extends Block<Props> {
    constructor(props: Props) {
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
