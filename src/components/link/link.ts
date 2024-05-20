import Block from "../../core/Block";
import { Button } from "../button";

type Props = {
    text: string;
    go: string;
}

export default class Link extends Block<Props> {
    init() {
        const onClickBind = this.click.bind(this);

        this.children = {
            ...this.children,
            Button: new Button({
                label: this.props.text,
                asLink: true,
                events: {
                    click: onClickBind,
                },
            }),
        };
    }

    click() {
        window.router.go(this.props.go);
    }

    render() {
        return `
            <span>{{{ Button }}}</span>
        `;
    }
}
