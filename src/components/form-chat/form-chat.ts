import FormBlock from "../../core/Form";
import { Button } from "../button";
import { Input } from "../input";

export default class FormChat extends FormBlock {
    init() {
        this.children = {
            ...this.children,
            Login: new Input({
                value: "",
                type: "text",
                name: "message",
                placeholder: "Введите сообщение",
            }),
            SubmitButton: new Button({
                label: ">",
                type: "primary",
            }),
        };
    }

    onCheck() {
        return Boolean(this.children.Login.getContent()?.querySelector('input')?.value);
    }

    render() {
        return `
            <div class="form-chat">
                <form class="messages-form-content">
                    <div class="input-content">{{{ Login }}}</div>
                    {{{ SubmitButton }}}
                </form>
            </div>
        `;
    }
}
