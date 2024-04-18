import { PageError } from "../../components";
import Block from "../../core/Block";

interface Props {
    PageError: PageError
}

export default class ServerError extends Block<Props> {
    constructor(props: Props) {
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
