import FormBlock from "../../core/Form";
import { Button } from "../button";
import { Input } from "../input";

type Props = {
    buttonText: string;
}

export default class ChatAddItemForm extends FormBlock<Props> {
    init() {
        this.children = {
            ...this.children,
            Name: new Input({
                name: "name",
                type: "text",
                label: "Имя чата",
                placeholder: "Имя чата",
            }),
            SubmitButton: new Button({
                label: this.props.buttonText,
                type: "primary",
            }),
        };
    }

    onCheck() {
        return true;
    }

    render() {
        return `
            <div>
                {{{ Name }}}
                {{{ SubmitButton }}}
            </div>
        `;
    }
}
