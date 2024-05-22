import FormBlock from "../../core/Form";
import { Button } from "../button";
import { Input } from "../input";

export default class FormProfileImage extends FormBlock {
    init() {
        this.children = {
            ...this.children,
            File: new Input({
                name: "avatar",
                type: "file",
                label: "",
                placeholder: "Выбрать файл на компьютере",
                asLink: true,
            }),
            SubmitButton: new Button({
                label: "Поменять",
                type: "primary",
            }),
        };
    }

    onCheck() {
        return true;
    }

    render() {
        return `
            <div class="form-login">
                {{{ File }}}
                {{{ SubmitButton }}}
            </div>
        `;
    }
}
