import FormBlock from "../../core/Form";
import { Button } from "../button";
import { Input } from "../input";

type Props = {
    buttonText: string;
}

export default class ChatAddLoginForm extends FormBlock<Props> {
    init() {
        this.children = {
            ...this.children,
            Login: new Input({
                name: "login",
                type: "text",
                label: "Login",
                placeholder: "Логин",
            }),
            SubmitButton: new Button({
                label: this.props.buttonText,
                type: "primary",
            }),
        };
    }

    onCheck() {
        return this.onLogin();
    }

    render() {
        return `
            <div>
                {{{ Login }}}
                {{{ SubmitButton }}}
            </div>
        `;
    }
}
